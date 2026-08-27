"use client";

import Link from "next/link";
import { useState } from "react";

type Layer = "landuse" | "services" | "density" | "green" | "buildings";

export default function TenMinutesCityPage() {
  const [activeLayer, setActiveLayer] = useState<Layer>("landuse");

  return (
    <main className="min-h-screen w-full bg-[#111] text-white">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <header className="mx-auto flex w-full max-w-[1500px] items-start justify-between px-[6vw] pt-[7vh]">
        <div className="max-w-[520px]">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            02 — URBAN DATA
          </p>

          <h1 className="mt-5 text-[clamp(3rem,5vw,5rem)] font-light leading-[0.88] tracking-[-0.055em] text-white/85">
            10 Minutes City
          </h1>

          <p className="mt-6 max-w-[430px] text-sm leading-[1.8] text-white/40">
            An urban data experiment exploring how existing neighborhoods align
            with the principles of the 10-minute city.
          </p>
        </div>

        <div className="pt-1 text-right">
          <p className="text-[8px] uppercase tracking-[0.28em] text-white/25">
            ANALYSIS
          </p>

          <p className="mt-2 font-mono text-[10px] text-white/35">
            REAL-WORLD DATA
          </p>
        </div>
      </header>

      {/* =========================================================
          MAIN ANALYSIS
      ========================================================== */}

      <section className="mx-auto mt-[7vh] w-full max-w-[1500px] px-[6vw]">
        <div className="grid grid-cols-[minmax(0,1fr)_250px] gap-8">
          {/* =====================================================
              MAP
          ====================================================== */}

          <div className="relative aspect-[1.65] overflow-hidden border border-white/10 bg-[#151515]">
            {/* -----------------------------------------------------
                TEMPORARY MAP
            ------------------------------------------------------ */}

            <FakeMap activeLayer={activeLayer} />

            {/* -----------------------------------------------------
                MAP HEADER
            ------------------------------------------------------ */}

            <div className="absolute left-5 top-5 z-20">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                STUDY AREA
              </p>

              <p className="mt-2 text-xs text-white/50">Valiasr — Tehran</p>
            </div>

            {/* -----------------------------------------------------
                MAP DATA SOURCE
            ------------------------------------------------------ */}

            <div className="absolute bottom-4 left-5 z-20">
              <p className="font-mono text-[8px] tracking-[0.08em] text-white/20">
                OPENSTREETMAP · BUILDINGS · STREETS · LAND USE
              </p>
            </div>

            {/* -----------------------------------------------------
                MAP SCALE
            ------------------------------------------------------ */}

            <div className="absolute bottom-4 right-5 z-20 flex items-end gap-2">
              <div className="h-[1px] w-12 bg-white/30" />

              <span className="font-mono text-[8px] text-white/20">500 m</span>
            </div>
          </div>

          {/* =====================================================
              ANALYSIS PANEL
          ====================================================== */}

          <aside className="border-l border-white/10 pl-6">
            {/* NEIGHBORHOOD */}

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-white/25">
                NEIGHBORHOOD
              </p>

              <h2 className="mt-3 text-xl font-light tracking-[-0.02em] text-white/70">
                Valiasr
              </h2>

              <p className="mt-1 text-[10px] text-white/30">Tehran, Iran</p>
            </div>

            {/* INDEX */}

            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                10-MINUTE INDEX
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-light text-white/75">
                  63
                </span>

                <span className="font-mono text-[10px] text-white/20">
                  / 100
                </span>
              </div>

              <div className="mt-4 h-[1px] w-full bg-white/10">
                <div className="h-[1px] bg-white/45" style={{ width: "63%" }} />
              </div>

              <p className="mt-3 text-[9px] leading-[1.6] text-white/25">
                Composite score based on neighborhood structure and service
                distribution.
              </p>
            </div>

            {/* LAYER CONTROLS */}

            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                ANALYSIS LAYERS
              </p>

              <div className="mt-4 space-y-1">
                <LayerButton
                  label="Land Use"
                  active={activeLayer === "landuse"}
                  onClick={() => setActiveLayer("landuse")}
                />

                <LayerButton
                  label="Services"
                  active={activeLayer === "services"}
                  onClick={() => setActiveLayer("services")}
                />

                <LayerButton
                  label="Density"
                  active={activeLayer === "density"}
                  onClick={() => setActiveLayer("density")}
                />

                <LayerButton
                  label="Diversity"
                  active={activeLayer === "buildings"}
                  onClick={() => setActiveLayer("buildings")}
                />

                <LayerButton
                  label="Green / Public"
                  active={activeLayer === "green"}
                  onClick={() => setActiveLayer("green")}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================================
          ANALYSIS METRICS
      ========================================================== */}

      <section className="mx-auto mt-[7vh] w-full max-w-[1500px] px-[6vw] pb-[9vh]">
        <div className="border-t border-white/10 pt-6">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-white/25">
                NEIGHBORHOOD ANALYSIS
              </p>

              <p className="mt-2 text-xs text-white/30">
                Existing urban conditions
              </p>
            </div>

            <p className="font-mono text-[8px] text-white/20">DATASET — OSM</p>
          </div>

          <div className="grid grid-cols-5 gap-6">
            <AnalysisMetric
              label="ACCESSIBILITY"
              value="72"
              description="Daily services"
            />

            <AnalysisMetric
              label="DIVERSITY"
              value="64"
              description="Land-use mix"
            />

            <AnalysisMetric
              label="SERVICE DISTRIBUTION"
              value="68"
              description="Spatial distribution"
            />

            <AnalysisMetric
              label="DENSITY"
              value="58"
              description="Built intensity"
            />

            <AnalysisMetric
              label="GREEN / PUBLIC"
              value="43"
              description="Open space"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="mx-auto flex w-full max-w-[1500px] items-center justify-between border-t border-white/10 px-[6vw] py-6">
        <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
          Urban Data Experiment
        </p>

        <Link
          href="/"
          className="text-[8px] uppercase tracking-[0.25em] text-white/25 transition-colors hover:text-white/60"
        >
          Back to Map
        </Link>
      </footer>
    </main>
  );
}

/* ===============================================================
   LAYER BUTTON
================================================================ */

function LayerButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        justify-between
        border-b
        border-white/5
        py-2.5
        text-left
        transition-all
        duration-200
        ${active ? "text-white/70" : "text-white/25 hover:text-white/50"}
      `}
    >
      <span className="text-[9px] uppercase tracking-[0.12em]">{label}</span>

      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          transition-all
          ${active ? "bg-white/60" : "bg-white/10"}
        `}
      />
    </button>
  );
}

/* ===============================================================
   ANALYSIS METRIC
================================================================ */

function AnalysisMetric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[150px] text-[8px] uppercase tracking-[0.16em] text-white/25">
          {label}
        </p>

        <span className="font-mono text-[10px] text-white/40">{value}</span>
      </div>

      <div className="mt-3 h-[1px] w-full bg-white/10">
        <div className="h-[1px] bg-white/35" style={{ width: `${value}%` }} />
      </div>

      <p className="mt-2 text-[9px] text-white/20">{description}</p>
    </div>
  );
}

/* ===============================================================
   TEMPORARY MAP
   Replace this with MapLibre / Leaflet + OSM data later.
================================================================ */

function FakeMap({ activeLayer }: { activeLayer: Layer }) {
  const buildings = [
    [8, 12, 12, 10],
    [23, 9, 8, 16],
    [37, 13, 15, 8],
    [57, 8, 12, 12],
    [75, 13, 10, 17],

    [12, 34, 18, 9],
    [36, 32, 9, 15],
    [52, 34, 17, 9],
    [76, 35, 13, 11],

    [7, 56, 10, 17],
    [24, 54, 15, 10],
    [44, 55, 10, 18],
    [61, 54, 17, 10],
    [83, 57, 9, 17],

    [11, 79, 16, 9],
    [34, 76, 13, 14],
    [55, 78, 18, 8],
    [80, 77, 12, 12],
  ];

  const services = [
    [18, 28],
    [43, 25],
    [68, 29],
    [31, 62],
    [72, 68],
    [50, 86],
  ];

  return (
    <div className="absolute inset-0">
      {/* GRID / STREET FABRIC */}

      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Streets */}

        <g stroke="rgba(255,255,255,0.09)" strokeWidth="1">
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="240" x2="1000" y2="240" />
          <line x1="0" y1="360" x2="1000" y2="360" />
          <line x1="0" y1="480" x2="1000" y2="480" />

          <line x1="140" y1="0" x2="140" y2="600" />
          <line x1="330" y1="0" x2="330" y2="600" />
          <line x1="510" y1="0" x2="510" y2="600" />
          <line x1="700" y1="0" x2="700" y2="600" />
          <line x1="870" y1="0" x2="870" y2="600" />
        </g>

        {/* BUILDINGS */}

        <g>
          {buildings.map((building, index) => {
            const [x, y, width, height] = building;

            return (
              <rect
                key={index}
                x={x * 10}
                y={y * 6}
                width={width * 10}
                height={height * 6}
                fill={
                  activeLayer === "density"
                    ? "rgba(255,255,255,0.38)"
                    : "rgba(255,255,255,0.16)"
                }
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* GREEN */}

        {(activeLayer === "green" || activeLayer === "landuse") && (
          <g fill="rgba(127,198,164,0.22)">
            <rect x="55" y="405" width="135" height="70" />
            <rect x="690" y="80" width="110" height="65" />
            <rect x="390" y="440" width="85" height="55" />
          </g>
        )}

        {/* SERVICES */}

        {activeLayer === "services" && (
          <g>
            {services.map(([x, y], index) => (
              <circle
                key={index}
                cx={x * 10}
                cy={y * 6}
                r="6"
                fill="rgba(255,255,255,0.65)"
              />
            ))}
          </g>
        )}

        {/* DIVERSITY */}

        {activeLayer === "buildings" && (
          <g>
            <rect
              x="0"
              y="0"
              width="1000"
              height="600"
              fill="rgba(125,155,232,0.035)"
            />

            <text
              x="40"
              y="560"
              fill="rgba(255,255,255,0.25)"
              fontSize="10"
              letterSpacing="2"
            >
              LAND-USE DIVERSITY
            </text>
          </g>
        )}
      </svg>

      {/* MAP VIGNETTE */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
    </div>
  );
}
