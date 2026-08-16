"use client";

import { useEffect, useState } from "react";

export const CityMap = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#1b1b1b] text-[#f1f1ed]"
    >
      {/* =========================================================
          CITY GRAPHIC
      ========================================================== */}

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 1440 900"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Fade the city toward the edges */}
            <radialGradient id="heroCityFade" cx="47%" cy="28%" r="72%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="48%" stopColor="white" stopOpacity="0.9" />
              <stop offset="72%" stopColor="white" stopOpacity="0.38" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>

            <mask id="heroCityMask">
              <rect width="1440" height="900" fill="url(#heroCityFade)" />
            </mask>
          </defs>

          <g mask="url(#heroCityMask)" stroke="#f1f1ed" fill="none">
            {/* =====================================================
                LEFT / TOP URBAN FRAGMENT
            ====================================================== */}

            {/* Vertical road */}
            <line
              x1="353"
              y1="-30"
              x2="353"
              y2="320"
              strokeWidth="1"
              opacity="0.7"
            />

            <line
              x1="375"
              y1="-30"
              x2="375"
              y2="320"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Horizontal road */}
            <line
              x1="35"
              y1="78"
              x2="353"
              y2="78"
              strokeWidth="1"
              opacity="0.7"
            />

            <line
              x1="35"
              y1="89"
              x2="353"
              y2="89"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Left vertical street */}
            <line
              x1="34"
              y1="68"
              x2="34"
              y2="390"
              strokeWidth="1"
              opacity="0.65"
            />

            <line
              x1="43"
              y1="78"
              x2="43"
              y2="398"
              strokeWidth="1"
              opacity="0.65"
            />

            {/* Left diagonal branch */}
            <line
              x1="34"
              y1="395"
              x2="323"
              y2="510"
              strokeWidth="1"
              opacity="0.45"
            />

            <line
              x1="34"
              y1="386"
              x2="323"
              y2="501"
              strokeWidth="1"
              opacity="0.45"
            />

            {/* Diagonal from upper spine */}
            <line
              x1="353"
              y1="320"
              x2="248"
              y2="590"
              strokeWidth="1"
              opacity="0.7"
            />

            <line
              x1="375"
              y1="320"
              x2="270"
              y2="590"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* =====================================================
                TOP RIGHT NETWORK
            ====================================================== */}

            <line
              x1="375"
              y1="285"
              x2="1330"
              y2="285"
              strokeWidth="1"
              opacity="0.65"
            />

            <line
              x1="375"
              y1="297"
              x2="1330"
              y2="297"
              strokeWidth="1"
              opacity="0.65"
            />

            {/* right vertical road */}
            <line
              x1="1115"
              y1="300"
              x2="1119"
              y2="565"
              strokeWidth="1"
              opacity="0.62"
            />

            <line
              x1="1128"
              y1="300"
              x2="1132"
              y2="565"
              strokeWidth="1"
              opacity="0.62"
            />

            {/* top-right vertical */}
            <line
              x1="822"
              y1="285"
              x2="816"
              y2="35"
              strokeWidth="1"
              opacity="0.48"
            />

            {/* upper horizontal */}
            <line
              x1="822"
              y1="110"
              x2="1180"
              y2="110"
              strokeWidth="1"
              opacity="0.48"
            />

            <line
              x1="620"
              y1="300"
              x2="620"
              y2="534"
              strokeWidth="1"
              opacity="0.44"
            />

            {/* =====================================================
                RIGHT DIAGONAL / CONTINUATION
            ====================================================== */}

            <line
              x1="1100"
              y1="640"
              x2="843"
              y2="902"
              strokeWidth="1"
              opacity="0.52"
            />

            <line
              x1="1118"
              y1="639"
              x2="861"
              y2="902"
              strokeWidth="1"
              opacity="0.52"
            />

            {/* Lower-left continuation */}
            <line
              x1="615"
              y1="735"
              x2="615"
              y2="900"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Lower diagonal continuation */}
            <line
              x1="843"
              y1="903"
              x2="660"
              y2="1080"
              strokeWidth="1"
              opacity="0.42"
            />

            <line
              x1="861"
              y1="903"
              x2="678"
              y2="1080"
              strokeWidth="1"
              opacity="0.42"
            />

            {/* =====================================================
                EXTRA LIGHT CONTEXT STREETS
            ====================================================== */}

            <g opacity="0.18">
              <line x1="690" y1="40" x2="690" y2="230" />
              <line x1="705" y1="50" x2="705" y2="240" />

              <line x1="930" y1="60" x2="930" y2="265" />
              <line x1="942" y1="60" x2="942" y2="265" />

              <line x1="500" y1="330" x2="500" y2="530" />
              <line x1="512" y1="330" x2="512" y2="530" />

              <line x1="760" y1="330" x2="760" y2="560" />
              <line x1="773" y1="330" x2="773" y2="560" />
            </g>
          </g>
        </svg>
      </div>

      {/* =========================================================
          TOP LEFT IDENTITY BLOCK
      ========================================================== */}

      <div
        className={`absolute left-5 top-4 z-20 w-[190px] transition-all duration-1000 md:left-8 md:top-5 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        {/* Name */}
        <div className="border-b border-white/60 pb-2">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/75">
            Niki Abedzadeh
          </p>
        </div>

        {/* Identity block */}
        <div className="mt-3 border-l border-white/60 pl-3">
          <p className="max-w-[150px] text-[20px] font-light leading-[1.05] tracking-[-0.04em] text-white md:text-[22px]">
            Urban Designer,
            <br />
            Researcher,
            <br />
            Developer
          </p>
        </div>

        {/* Continuation of the plot */}
        <div className="mt-3 h-5 border-l border-b border-white/30" />
      </div>

      {/* =========================================================
          MAIN HERO COPY
      ========================================================== */}

      <div
        className={`absolute left-[50%] top-[34%] z-20 w-[min(620px,calc(100%-48px))] -translate-x-[10%] transition-all delay-150 duration-1000 sm:left-[52%] md:top-[37%] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2.25rem,4.4vw,4.2rem)] font-light leading-[0.95] tracking-[-0.055em] text-white">
          Designing beyond disciplines
        </h1>

        <p className="mt-5 max-w-[310px] text-[10px] leading-5 tracking-[0.01em] text-white/55 sm:text-[11px]">
          Exploring cities through design, data &amp; technology.
        </p>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <div
        className={`absolute bottom-7 left-1/2 z-20 -translate-x-1/2 transition-all delay-500 duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
            Scroll to explore
          </span>

          <div className="h-7 w-px bg-white/35">
            <div className="h-2 w-px animate-pulse bg-white/80" />
          </div>
        </div>
      </div>

      {/* =========================================================
          SMALL NAV / STATUS
      ========================================================== */}

      <div className="absolute right-6 top-5 z-20 md:right-8">
        <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
          01 — Entrance
        </p>
      </div>
    </section>
  );
};
