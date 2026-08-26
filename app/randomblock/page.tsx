"use client";

import { useState } from "react";
import { generateUrbanBlock } from "../lib/urbanGenerator";
import { GeneratorControls } from "../component";

export default function RandomUrbanBlockPage() {
  const [hover, setHover] = useState<number | null>(null);
  const [seed, setSeed] = useState(42);

  const [density, setDensity] = useState(60);
  const [openSpace, setOpenSpace] = useState(15);
  const [parcelCount, setParcelCount] = useState(12);

  const { parcels, streets } = generateUrbanBlock({
    seed,
    density,
    openSpace,
    parcelCount,
  });

  const sitePoints = `
    150,80
    720,80
    780,150
    780,420
    120,420
    80,330
  `;

  const generateNewCity = () => {
    setSeed(Math.floor(Math.random() * 10000));
  };

  return (
    <main
      className="
        flex
        h-screen
        w-full
        flex-col
        overflow-hidden
        bg-[#111]
        text-white
      "
    >
      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          items-center
          justify-center
          px-[6vw]
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1500px]
            items-center
            justify-between
            gap-[5vw]
          "
        >
          {/* =====================================================
              LEFT — PROJECT INTRO
          ====================================================== */}

          <section className="w-[280px] shrink-0">
            <p className="text-[10px] tracking-[0.3em] text-white/30">
              01 — URBAN DESIGN
            </p>

            <h1
              className="
                mt-6
                text-6xl
                font-light
                leading-[0.88]
                tracking-[-0.045em]
                text-white/85
              "
            >
              Random
              <br />
              Urban Block
            </h1>

            <p
              className="
                mt-7
                max-w-[280px]
                text-sm
                leading-[1.8]
                text-white/40
              "
            >
              An experiment exploring how random spatial configurations can
              generate new urban relationships.
            </p>
          </section>

          {/* =====================================================
              CENTER — URBAN BLOCK
          ====================================================== */}

          <section
            className="
              flex
              min-w-0
              flex-1
              items-center
              justify-center
            "
          >
            <svg
              viewBox="0 0 900 520"
              preserveAspectRatio="xMidYMid meet"
              className="
                h-auto
                max-h-[100vh]
                w-full
                max-w-[820px]
              "
            >
              <defs>
                <clipPath id="siteClip">
                  <polygon points={sitePoints} />
                </clipPath>
              </defs>

              {/* =================================================
                  SITE BASE
              ================================================== */}

              <polygon points={sitePoints} fill="#151515" />

              {/* =================================================
                  SITE CONTENT
              ================================================== */}

              <g clipPath="url(#siteClip)">
                {/* =================================================
                    STREETS
                ================================================== */}

                {streets.map((street) => {
                  if (street.direction === "vertical") {
                    return (
                      <rect
                        key={street.id}
                        x={(street.x ?? 0) - street.width / 2}
                        y="0"
                        width={street.width}
                        height="520"
                        fill="#242424"
                      />
                    );
                  }

                  return (
                    <rect
                      key={street.id}
                      x="0"
                      y={(street.y ?? 0) - street.width / 2}
                      width="900"
                      height={street.width}
                      fill="#242424"
                    />
                  );
                })}

                {/* =================================================
                    PARCEL PUZZLE
                ================================================== */}

                {parcels.map((parcel) => {
                  const isHovered = hover === parcel.id;

                  const color =
                    parcel.type === "building"
                      ? "#b8b5ae"
                      : parcel.type === "green"
                        ? "#7fc6a4"
                        : "#8d9bb5";

                  return (
                    <g
                      key={parcel.id}
                      onMouseEnter={() => setHover(parcel.id)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-pointer"
                    >
                      <polygon
                        points={parcel.points}
                        fill={color}
                        fillOpacity={isHovered ? 0.68 : 0.38}
                        stroke="rgba(255,255,255,0.38)"
                        strokeWidth="1"
                        strokeLinejoin="round"
                        style={{
                          transition:
                            "fill-opacity 180ms ease, stroke 180ms ease",
                        }}
                      />

                      {isHovered && (
                        <polygon
                          points={parcel.points}
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.8"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          pointerEvents="none"
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* =================================================
                  SITE BORDER
              ================================================== */}

              <polygon
                points={sitePoints}
                fill="none"
                stroke="rgba(255,255,255,.5)"
                strokeWidth="2"
                strokeLinejoin="round"
                pointerEvents="none"
              />
            </svg>
          </section>

          {/* =====================================================
              RIGHT — GENERATOR
          ====================================================== */}

          <section className="w-[260px] shrink-0">
            <GeneratorControls
              density={density}
              openSpace={openSpace}
              parcelCount={parcelCount}
              onDensityChange={setDensity}
              onOpenSpaceChange={setOpenSpace}
              onParcelCountChange={setParcelCount}
              onGenerate={generateNewCity}
            />
          </section>
        </div>
      </div>

      {/* =========================================================
          BOTTOM META
      ========================================================== */}

      <footer
        className="
          flex
          w-full
          shrink-0
          items-end
          justify-between
          px-[8%]
          pb-[7%]
        "
      >
        {/* LEFT */}

        <div>
          <p className="text-[9px] tracking-[0.28em] text-white/20">
            RANDOM GENERATION
          </p>

          <p className="mt-3 text-xs text-white/35">
            Density · Morphology · Interaction
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex gap-10">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-white/20">DENSITY</p>

            <p className="mt-2 font-mono text-xs text-white/40">{density}%</p>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.2em] text-white/20">
              OPEN SPACE
            </p>

            <p className="mt-2 font-mono text-xs text-white/40">{openSpace}%</p>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.2em] text-white/20">PARCELS</p>

            <p className="mt-2 font-mono text-xs text-white/40">
              {parcels.length}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
