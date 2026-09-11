import type { CityData, MapFeature } from "./data";

export type OSMElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  nodes?: number[];
  tags?: Record<string, string>;
};
export const studyArea = { south: 35.705, west: 51.395, north: 35.725, east: 51.415 };

// The OSM map API returns node coordinates and ways referencing those nodes.
// Relation members are already included as ways; do not count them twice.
export function parseOSM(input: { elements?: OSMElement[] }, retrievedAt: string, area: CityData["studyArea"] = studyArea): CityData {
  if (!Array.isArray(input.elements)) throw new Error("Empty OSM response");
  const nodes = new Map<number, [number, number]>();
  for (const element of input.elements) {
    if (element.type === "node" && Number.isFinite(element.lat) && Number.isFinite(element.lon)) {
      let lon = element.lon!;
      const middle = (area.west + area.east) / 2;
      while (lon - middle > 180) lon -= 360;
      while (lon - middle < -180) lon += 360;
      nodes.set(element.id, [element.lat!, lon]);
    }
  }
  const data: CityData = { studyArea: area, buildings: [], streets: [], green: [], services: [], retrievedAt, source: "OpenStreetMap", mode: "live" };
  for (const element of input.elements) {
    const tags = element.tags;
    if (!tags || element.type === "relation") continue;
    const geometry = element.type === "way" ? (element.nodes ?? []).map(id => nodes.get(id)).filter((p): p is [number, number] => !!p) : [];
    let point = nodes.get(element.id);
    if (element.type === "way") {
      if (geometry.length < 2) continue;
      point = [(Math.min(...geometry.map(p => p[0])) + Math.max(...geometry.map(p => p[0]))) / 2,
        (Math.min(...geometry.map(p => p[1])) + Math.max(...geometry.map(p => p[1]))) / 2];
    }
    if (!point) continue;
    const [lat, lon] = point;
    if (lat < area.south || lat > area.north || lon < area.west || lon > area.east) continue;
    const feature: MapFeature = {
      id: `${element.type}-${element.id}`, lat, lon,
      name: tags["name:en"] ?? tags.name ?? "Unnamed feature",
      category: tags.amenity ?? tags.shop ?? tags.public_transport ?? tags.leisure ?? tags.highway ?? tags.building ?? "other",
      geometry,
    };
    if (tags.building && tags.building !== "no") data.buildings.push(feature);
    if (tags.highway && element.type === "way") data.streets.push(feature);
    if (["park", "garden", "playground"].includes(tags.leisure)) data.green.push(feature);
    if (tags.amenity || tags.shop || tags.public_transport) data.services.push(feature);
  }
  return data;
}
