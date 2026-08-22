import { NextRequest, NextResponse } from "next/server";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const CATEGORY_QUERIES = {
  park: `
    nwr["leisure"="park"](poly:"POLYGON");
  `,
  cafe: `
    nwr["amenity"="cafe"](poly:"POLYGON");
  `,
  restaurant: `
    nwr["amenity"="restaurant"](poly:"POLYGON");
  `,
  pharmacy: `
    nwr["amenity"="pharmacy"](poly:"POLYGON");
  `,
  school: `
    nwr["amenity"="school"](poly:"POLYGON");
  `,
  grocery: `
    nwr["shop"="supermarket"](poly:"POLYGON");
  `,
} as const;

type Category = keyof typeof CATEGORY_QUERIES;

function polygonToOverpass(geometry: GeoJSON.Polygon["coordinates"]): string {
  const ring = geometry[0];

  return ring
    .map(([longitude, latitude]) => `${latitude} ${longitude}`)
    .join(" ");
}

function getCenter(element: any): [number, number] | null {
  if (element.lat !== undefined && element.lon !== undefined) {
    return [element.lat, element.lon];
  }

  if (element.center) {
    return [element.center.lat, element.center.lon];
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      polygon,
      categories,
    }: {
      polygon: GeoJSON.Polygon;
      categories: Category[];
    } = body;

    if (!polygon || !Array.isArray(categories)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const polygonString = polygonToOverpass(polygon.coordinates);

    const selectedCategories = categories.filter(
      (category) => category in CATEGORY_QUERIES,
    );

    if (selectedCategories.length === 0) {
      return NextResponse.json({
        features: [],
      });
    }

    const queries = selectedCategories
      .map((category) =>
        CATEGORY_QUERIES[category].replace("POLYGON", polygonString),
      )
      .join("\n");

    const query = `
      [out:json][timeout:25];

      (
        ${queries}
      );

      out center tags;
    `;

    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": "NikiWalkabilityExplorer/1.0",
      },
      body: new URLSearchParams({
        data: query,
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      console.error("Overpass error:", error);

      return NextResponse.json(
        {
          error: "Overpass request failed",
          details: error,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    const features = data.elements
      .map((element: any) => {
        const center = getCenter(element);

        if (!center) return null;

        const category =
          element.tags?.leisure === "park"
            ? "park"
            : element.tags?.amenity === "cafe"
              ? "cafe"
              : element.tags?.amenity === "restaurant"
                ? "restaurant"
                : element.tags?.amenity === "pharmacy"
                  ? "pharmacy"
                  : element.tags?.amenity === "school"
                    ? "school"
                    : element.tags?.shop === "supermarket"
                      ? "grocery"
                      : null;

        if (!category) return null;

        return {
          id: `${element.type}-${element.id}`,
          category,
          name: element.tags?.name || "Unnamed",
          position: center,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      features,
    });
  } catch (error) {
    console.error("POI API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
