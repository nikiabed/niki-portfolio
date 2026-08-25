"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { POI_CONFIG } from "./poiIcons";
import { ArrowLeft, Search } from "lucide-react";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[100vh] w-full items-center justify-center bg-neutral-100">
        Loading map...
      </div>
    ),
  },
);

export type WalkingTime = 5 | 10 | 15 | 20;

export type POICategory =
  | "park"
  | "cafe"
  | "restaurant"
  | "pharmacy"
  | "school"
  | "grocery";

const POI_OPTIONS: POICategory[] = [
  "park",
  "cafe",
  "restaurant",
  "pharmacy",
  "school",
  "grocery",
];

export const WalkabilityMapClient = () => {
  const [walkingTime, setWalkingTime] = useState<WalkingTime>(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  const [selectedCategories, setSelectedCategories] = useState<POICategory[]>([
    "park",
    "cafe",
    "restaurant",
    "pharmacy",
    "school",
    "grocery",
  ]);

  const handleSearch = async () => {
    const query = searchQuery.trim();

    if (!query || searching) return;

    try {
      setSearching(true);

      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const results = await response.json();

      if (!results.length) {
        alert("Location not found");
        return;
      }

      const result = results[0];

      const location: [number, number] = [
        Number(result.lat),
        Number(result.lon),
      ];

      setSelectedLocation(location);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const toggleCategory = (category: POICategory) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className="
          sticky
          top-6
          h-fit
          max-h-[calc(100vh-3rem)]
          overflow-y-auto
          rounded-2xl
          bg-white
          p-5
          shadow-sm
        "
      >
        {/* =================================================
            BACK
        ================================================== */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            mb-5
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-neutral-500
            transition-colors
            hover:text-neutral-900
          "
        >
          <ArrowLeft size={15} strokeWidth={1.8} />

          <span>Back</span>
        </button>

        {/* =================================================
            SEARCH
        ================================================== */}

        <div className="relative">
          <Search
            size={17}
            strokeWidth={1.8}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-neutral-400
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search street or place"
            className="
              h-11
              w-full
              rounded-xl
              border
              border-neutral-200
              bg-white
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              placeholder:text-neutral-400
              focus:border-neutral-400
            "
          />
        </div>

        {/* =================================================
            WALKING TIME
        ================================================== */}

        <div className="mt-6">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-neutral-400
            "
          >
            Walking time
          </p>

          <h2 className="mt-1 text-lg font-medium">How far can you walk?</h2>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {[5, 10, 15, 20].map((time) => (
              <button
                key={time}
                onClick={() => setWalkingTime(time as WalkingTime)}
                className={`
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  transition
                  ${
                    walkingTime === time
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }
                `}
              >
                {time} min
              </button>
            ))}
          </div>
        </div>

        <div className="my-6 h-px bg-neutral-100" />

        {/* =================================================
            EXPLORE
        ================================================== */}

        <div>
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-neutral-400
            "
          >
            Explore
          </p>

          <div className="mt-3 space-y-2">
            {POI_OPTIONS.map((category) => {
              const option = POI_CONFIG[category];
              const checked = selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    transition
                    ${checked ? "bg-neutral-100" : "hover:bg-neutral-50"}
                  `}
                >
                  {/* ICON */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition
                      ${
                        checked
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                      }
                    `}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{
                        __html: option.svg,
                      }}
                    />
                  </span>

                  {/* LABEL */}

                  <span
                    className={`
                      text-sm
                      ${
                        checked
                          ? "font-medium text-neutral-900"
                          : "text-neutral-600"
                      }
                    `}
                  >
                    {option.label}
                  </span>

                  {/* CHECK */}

                  <span className="ml-auto">
                    <span
                      className={`
                        flex
                        h-4
                        w-4
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition
                        ${
                          checked
                            ? "border-neutral-900 bg-neutral-900"
                            : "border-neutral-300"
                        }
                      `}
                    >
                      {checked && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="my-6 h-px bg-neutral-100" />

        {/* =================================================
            LOCATION
        ================================================== */}

        <div>
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-neutral-400
            "
          >
            Location
          </p>

          <p className="mt-2 break-words text-sm text-neutral-600">
            {selectedLocation
              ? `${selectedLocation[0].toFixed(
                  4,
                )}, ${selectedLocation[1].toFixed(4)}`
              : "Click on the map"}
          </p>
        </div>
      </aside>

      {/* =====================================================
          MAP
      ====================================================== */}

      <div
        className="
          min-w-0
          w-full
          overflow-hidden
          rounded-2xl
        "
      >
        <LeafletMap
          walkingTime={walkingTime}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
};
