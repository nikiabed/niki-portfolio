import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");

  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ir");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "NikiWalkabilityExplorer/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Geocoding failed" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding error:", error);

    return NextResponse.json(
      { error: "Geocoding request failed" },
      { status: 500 },
    );
  }
}
