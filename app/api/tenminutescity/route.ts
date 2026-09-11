import { NextRequest, NextResponse } from "next/server";
import snapshot from "../../../data/tenminutescity.json";
import { parseOSM, studyArea, type OSMElement } from "../../tenminutescity/osm";
import { areaAround, osmBounds, type CityData, type StudyArea } from "../../tenminutescity/data";

const cache = new Map<string, { data: CityData; at: number }>();
const pending = new Map<string, Promise<CityData>>();
const cacheLifetime = 60 * 60 * 1000;

async function fetchBounds(bounds: StudyArea, signal: AbortSignal, depth = 0): Promise<OSMElement[]> {
  const bbox = `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`;
  const response = await fetch(`https://api.openstreetmap.org/api/0.6/map.json?bbox=${bbox}`, {
    headers: { "User-Agent": "NikiPortfolio/1.0 (neighborhood research)", Accept: "application/json" },
    signal,
    cache: "no-store",
  });
  if (!response.ok) {
    const message = await response.text();
    // Dense cities can exceed OSM's per-request node limit. Fetch smaller tiles
    // and merge by OSM ID so buildings crossing tile edges are counted once.
    if (response.status === 400 && message.includes("too many nodes") && depth < 2) {
      const lat = (bounds.south + bounds.north) / 2;
      const lon = (bounds.west + bounds.east) / 2;
      const parts = [
        { ...bounds, north: lat, east: lon }, { ...bounds, north: lat, west: lon },
        { ...bounds, south: lat, east: lon }, { ...bounds, south: lat, west: lon },
      ];
      return (await Promise.all(parts.map(part => fetchBounds(part, signal, depth + 1)))).flat();
    }
    throw new Error(`OSM returned ${response.status}`);
  }
  const result = await response.json() as { elements?: OSMElement[] };
  if (!Array.isArray(result.elements)) throw new Error("Invalid OSM response");
  return result.elements;
}

async function loadArea(area: StudyArea): Promise<CityData> {
  const signal = AbortSignal.timeout(30000);
  const results = await Promise.all(osmBounds(area).map(bounds => fetchBounds(bounds, signal)));
  const elements = [...new Map(results.flat().map(item => [`${item.type}-${item.id}`, item])).values()];
  return parseOSM({ elements }, new Date().toISOString(), area);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const hasLocation = params.has("lat") || params.has("lon");
  let area = studyArea;
  if (hasLocation) {
    const lat = Number(params.get("lat"));
    const lon = Number(params.get("lon"));
    if (!params.get("lat")?.trim() || !params.get("lon")?.trim() || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 85 || Math.abs(lon) > 180) {
      return NextResponse.json({ error: "Choose a valid map location." }, { status: 400 });
    }
    area = areaAround([lat, lon]);
  }
  const key = JSON.stringify(area);
  const cached = cache.get(key);
  const force = params.get("refresh") === "1";
  if (!force && cached && Date.now() - cached.at < cacheLifetime) return NextResponse.json(cached.data);
  if (!force && !hasLocation) return NextResponse.json(snapshot);
  try {
    let work = pending.get(key);
    if (!work) {
      work = loadArea(area).then(data => {
        cache.delete(key);
        cache.set(key, { data, at: Date.now() });
        if (cache.size > 24) cache.delete(cache.keys().next().value!);
        return data;
      }).finally(() => pending.delete(key));
      pending.set(key, work);
    }
    return NextResponse.json(await work);
  } catch {
    // Never show Tehran's snapshot as if it belongs to a different selected location.
    if (cached || !hasLocation) return NextResponse.json({ ...(cached?.data ?? snapshot), refreshUnavailable: true });
    return NextResponse.json({ error: "Could not load this location. Try again or choose another point." }, { status: 502 });
  }
}
