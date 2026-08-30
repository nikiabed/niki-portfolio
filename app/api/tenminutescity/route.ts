import { NextResponse } from "next/server";

const OVERPASS_URL = "https://turbo.overpass.kumi.systems/api/interpreter";
export async function GET() {
  try {
    const south = 35.705;
    const west = 51.395;
    const north = 35.725;
    const east = 51.415;

    const query = `
[out:json][timeout:25];

(
  way["building"](${south},${west},${north},${east});
);

out geom;
`;

    console.log("=================================");
    console.log("TEN MINUTES CITY → OVERPASS");
    console.log("=================================");
    console.log("URL:", OVERPASS_URL);
    console.log("BBOX:", {
      south,
      west,
      north,
      east,
    });

    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `data=${encodeURIComponent(query)}`,
      cache: "no-store",
    });

    console.log("OVERPASS STATUS:", response.status);

    const text = await response.text();

    console.log("OVERPASS RESPONSE:", text.slice(0, 1000));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Overpass API failed",
          status: response.status,
          response: text.slice(0, 2000),
        },
        { status: 502 },
      );
    }

    const data = JSON.parse(text);

    const elements = data.elements ?? [];

    const buildings = elements
      .filter((item: any) => item.tags?.building)
      .map((item: any) => ({
        id: item.id,
        type: "building",
        lat: item.center?.lat ?? item.lat,
        lon: item.center?.lon ?? item.lon,
        tags: item.tags ?? {},
      }))
      .filter((item: any) => item.lat && item.lon);

    const streets = elements
      .filter((item: any) => item.tags?.highway)
      .map((item: any) => ({
        id: item.id,
        type: "street",
        lat: item.center?.lat ?? item.lat,
        lon: item.center?.lon ?? item.lon,
        highway: item.tags?.highway,
        name: item.tags?.name ?? null,
      }))
      .filter((item: any) => item.lat && item.lon);

    const green = elements
      .filter(
        (item: any) =>
          item.tags?.leisure === "park" || item.tags?.leisure === "garden",
      )
      .map((item: any) => ({
        id: item.id,
        type: "green",
        lat: item.center?.lat ?? item.lat,
        lon: item.center?.lon ?? item.lon,
        name: item.tags?.name ?? null,
      }))
      .filter((item: any) => item.lat && item.lon);

    const services = elements
      .filter(
        (item: any) =>
          item.tags?.amenity || item.tags?.shop || item.tags?.public_transport,
      )
      .map((item: any) => ({
        id: item.id,
        type: "service",
        lat: item.center?.lat ?? item.lat,
        lon: item.center?.lon ?? item.lon,
        category:
          item.tags?.amenity ??
          item.tags?.shop ??
          item.tags?.public_transport ??
          "other",
        name: item.tags?.name ?? null,
        tags: item.tags ?? {},
      }))
      .filter((item: any) => item.lat && item.lon);

    console.log("=================================");
    console.log("OSM DATA LOADED");
    console.log("Buildings:", buildings.length);
    console.log("Streets:", streets.length);
    console.log("Green:", green.length);
    console.log("Services:", services.length);
    console.log("=================================");

    return NextResponse.json({
      studyArea: {
        south,
        west,
        north,
        east,
      },

      counts: {
        buildings: buildings.length,
        streets: streets.length,
        green: green.length,
        services: services.length,
      },

      buildings,
      streets,
      green,
      services,

      source: "OpenStreetMap / Overpass API",
    });
  } catch (error) {
    console.error("=================================");
    console.error("TEN MINUTES CITY API ERROR");
    console.error(error);
    console.error("=================================");

    return NextResponse.json(
      {
        error: "Failed to load OpenStreetMap data.",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
