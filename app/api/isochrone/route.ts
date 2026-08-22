import { NextRequest, NextResponse } from "next/server";

const ORS_URL = "https://api.openrouteservice.org/v2/isochrones/foot-walking";

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, minutes } = await request.json();

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      ![5, 10, 15, 20].includes(minutes)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENROUTESERVICE_API_KEY;
    console.log(
      "ORS API KEY EXISTS:",
      Boolean(process.env.OPENROUTESERVICE_API_KEY),
    );

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouteService API key is missing" },
        { status: 500 },
      );
    }

    const response = await fetch(ORS_URL, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locations: [[longitude, latitude]],
        range: [minutes * 60],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouteService error:", data);

      return NextResponse.json(
        { error: "OpenRouteService request failed", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Isochrone API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
