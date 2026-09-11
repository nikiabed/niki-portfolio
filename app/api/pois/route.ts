import { NextRequest, NextResponse } from "next/server";

const OVERPASS_URL =
  "https://overpass-api.de/api/interpreter";

const CATEGORY_FILTERS = {
  park: `nwr["leisure"="park"]`,
  cafe: `nwr["amenity"="cafe"]`,
  restaurant: `nwr["amenity"="restaurant"]`,
  pharmacy: `nwr["amenity"="pharmacy"]`,
  school: `nwr["amenity"="school"]`,
  grocery: `nwr["shop"="supermarket"]`,
} as const;

type Category = keyof typeof CATEGORY_FILTERS;

/* ============================================================
   GET CENTER OF OSM ELEMENT
============================================================ */

function getCenter(
  element: any,
): [number, number] | null {
  if (
    typeof element.lat === "number" &&
    typeof element.lon === "number"
  ) {
    return [
      element.lat,
      element.lon,
    ];
  }

  if (
    element.center &&
    typeof element.center.lat === "number" &&
    typeof element.center.lon === "number"
  ) {
    return [
      element.center.lat,
      element.center.lon,
    ];
  }

  return null;
}

/* ============================================================
   POINT IN POLYGON

   polygon coordinates:
   [longitude, latitude]

   point:
   [latitude, longitude]
============================================================ */

function pointInPolygon(
  latitude: number,
  longitude: number,
  coordinates: number[][],
) {
  let inside = false;

  const x = longitude;
  const y = latitude;

  for (
    let i = 0, j = coordinates.length - 1;
    i < coordinates.length;
    j = i++
  ) {
    const xi = coordinates[i][0];
    const yi = coordinates[i][1];

    const xj = coordinates[j][0];
    const yj = coordinates[j][1];

    const intersects =
      yi > y !== yj > y &&
      x <
        ((xj - xi) * (y - yi)) /
          (yj - yi || Number.EPSILON) +
          xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

/* ============================================================
   CATEGORY
============================================================ */

function getCategory(
  element: any,
): Category | null {
  const tags = element.tags ?? {};

  if (tags.leisure === "park") {
    return "park";
  }

  if (tags.amenity === "cafe") {
    return "cafe";
  }

  if (tags.amenity === "restaurant") {
    return "restaurant";
  }

  if (tags.amenity === "pharmacy") {
    return "pharmacy";
  }

  if (tags.amenity === "school") {
    return "school";
  }

  if (tags.shop === "supermarket") {
    return "grocery";
  }

  return null;
}

/* ============================================================
   POST
============================================================ */

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const {
      polygon,
      latitude,
      longitude,
      minutes,
      categories,
    }: {
      polygon: GeoJSON.Polygon;
      latitude: number;
      longitude: number;
      minutes: number;
      categories: Category[];
    } = body;

    /* ========================================================
       VALIDATE
    ======================================================== */

    if (
      !polygon ||
      polygon.type !== "Polygon" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      typeof minutes !== "number" ||
      !Array.isArray(categories)
    ) {
      return NextResponse.json(
        {
          error: "Invalid request",
        },
        {
          status: 400,
        },
      );
    }

    const selectedCategories =
      categories.filter(
        (
          category,
        ): category is Category =>
          category in CATEGORY_FILTERS,
      );

    if (
      selectedCategories.length === 0
    ) {
      return NextResponse.json({
        features: [],
      });
    }

    /* ========================================================
       SEARCH RADIUS

       Approx walking speed:
       ~80 metres/minute

       We deliberately make it slightly larger
       and then filter by the REAL isochrone.
    ======================================================== */

    const radius = Math.ceil(
      minutes * 90,
    );

    /* ========================================================
       BUILD SMALL OVERPASS QUERY

       IMPORTANT:
       We use around instead of poly.

       This is MUCH lighter for Overpass.
    ======================================================== */

    const queryParts =
      selectedCategories.map(
        (category) => {
          const filter =
            CATEGORY_FILTERS[category];

          return `${filter}(around:${radius},${latitude},${longitude});`;
        },
      );

    const query = `
      [out:json][timeout:20];

      (
        ${queryParts.join("\n")}
      );

      out center tags;
    `;

    console.log(
      "POI SEARCH:",
      {
        latitude,
        longitude,
        minutes,
        radius,
        categories:
          selectedCategories,
      },
    );

    /* ========================================================
       FETCH
    ======================================================== */

    const response = await fetch(
      OVERPASS_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",

          Accept:
            "application/json",

          "User-Agent":
            "NikiWalkabilityExplorer/1.0",
        },

        body: new URLSearchParams({
          data: query,
        }),

        cache: "no-store",
      },
    );

    const responseText =
      await response.text();

    if (!response.ok) {
      console.error(
        "Overpass error:",
        response.status,
        responseText.slice(0, 1000),
      );

      return NextResponse.json(
        {
          error:
            "Overpass request failed",

          status:
            response.status,

          details:
            responseText.slice(
              0,
              1000,
            ),
        },
        {
          status: 502,
        },
      );
    }

    let data: any;

    try {
      data =
        JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid Overpass response",
        },
        {
          status: 502,
        },
      );
    }

    /* ========================================================
       REAL ISOCHRONE POLYGON
    ======================================================== */

    const ring =
      polygon.coordinates[0];

    /* ========================================================
       CONVERT + FILTER

       First Overpass gives us everything
       near the point.

       THEN we check if it is actually inside
       the ORS walking polygon.
    ======================================================== */

    const features = (
      data.elements ?? []
    )
      .map((element: any) => {
        const center =
          getCenter(element);

        if (!center) {
          return null;
        }

        const [
          elementLat,
          elementLon,
        ] = center;

        const inside =
          pointInPolygon(
            elementLat,
            elementLon,
            ring,
          );

        if (!inside) {
          return null;
        }

        const category =
          getCategory(element);

        if (
          !category ||
          !selectedCategories.includes(
            category,
          )
        ) {
          return null;
        }

        return {
          id: `${element.type}-${element.id}`,

          category,

          name:
            element.tags?.name ||
            POI_FALLBACK_NAMES[
              category
            ],

          position: center,
        };
      })
      .filter(Boolean);

    console.log(
      "POIs returned:",
      features.length,
    );

    return NextResponse.json({
      features,

      meta: {
        raw:
          data.elements?.length ?? 0,

        inside:
          features.length,

        radius,
      },
    });
  } catch (error) {
    console.error(
      "POI API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Internal server error",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      },
    );
  }
}

/* ============================================================
   FALLBACK NAMES
============================================================ */

const POI_FALLBACK_NAMES: Record<
  Category,
  string
> = {
  park: "Park",
  cafe: "Café",
  restaurant: "Restaurant",
  pharmacy: "Pharmacy",
  school: "School",
  grocery: "Grocery",
};
