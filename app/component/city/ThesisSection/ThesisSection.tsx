"use client";

import { useState } from "react";

export const ThesisSection = () => {
  const [hovered, setHovered] = useState(false);

  /* ============================================================
   * SVG COORDINATE SYSTEM
   * ============================================================ */

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 3876.47;

  /* ============================================================
   * THESIS FIELD
   * ============================================================ */

  const field = {
    cx: 770,
    cy: 2867,
    size: 120,
    radius: 60,
  };

  /* ============================================================
   * ROUNDED SQUARE
   * ============================================================ */

  const createRoundedSquare = (
    cx: number,
    cy: number,
    size: number,
    radius: number,
  ) => {
    const left = cx - size;
    const right = cx + size;
    const top = cy - size;
    const bottom = cy + size;

    return `
      M ${left + radius} ${top}
      H ${right - radius}

      Q ${right} ${top}
        ${right} ${top + radius}

      V ${bottom - radius}

      Q ${right} ${bottom}
        ${right - radius} ${bottom}

      H ${left + radius}

      Q ${left} ${bottom}
        ${left} ${bottom - radius}

      V ${top + radius}

      Q ${left} ${top}
        ${left + radius} ${top}

      Z
    `;
  };

  /* ============================================================
   * OUTER / INNER FIELD
   * ============================================================ */

  const outerPath = createRoundedSquare(
    field.cx,
    field.cy,
    field.size,
    field.radius,
  );

  const innerPath = createRoundedSquare(
    field.cx,
    field.cy,
    field.size - 9,
    field.radius - 5,
  );

  /* ============================================================
   * DESKTOP POSITION
   * ============================================================ */

  const fieldY = (field.cy / SVG_HEIGHT) * 100;

  return (
    <section
      id="thesis"
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-[25]
        w-full
      "
      style={{
        aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
      }}
    >
      {/* =======================================================
          DESKTOP
      ======================================================== */}

      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          hidden
          mobile:block
          h-full
          w-full
          overflow-visible
        "
      >
        <g
          pointerEvents="all"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            cursor: "pointer",
            transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          transform={
            hovered
              ? `
                translate(${field.cx} ${field.cy})
                scale(1.04)
                translate(-${field.cx} -${field.cy})
              `
              : "scale(1)"
          }
        >
          <path
            d={outerPath}
            fill="url(#thesis-gradient)"
            fillOpacity={hovered ? "1" : "0.85"}
            stroke="#e46a63"
            strokeWidth="1.5"
            strokeOpacity={hovered ? "1" : "0.8"}
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "fill-opacity 500ms ease, stroke-opacity 500ms ease",
            }}
          />

          <path
            d={innerPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <circle
            cx={field.cx + field.size - 25}
            cy={field.cy - field.size + 25}
            r="4"
            fill="#e46a63"
            opacity="0.7"
          />

          <text
            x={field.cx - field.size + 24}
            y={field.cy + field.size - 25}
            fill="#e46a63"
            fontSize="10"
            letterSpacing="2"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
          >
            VIEW THESIS →
          </text>
        </g>

        <defs>
          <linearGradient id="thesis-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7d9be8" stopOpacity="0.30" />

            <stop offset="50%" stopColor="#151515" stopOpacity="0.78" />

            <stop offset="100%" stopColor="#7fc6a4" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>

      {/* =======================================================
          DESKTOP HEADER
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          hidden
          mobile:block
          w-[70%]
          text-center
        "
        style={{
          left: "50%",
          top: `${fieldY - 10}%`,
          transform: "translateX(-50%)",
        }}
      >
        <p
          className="
            mb-[clamp(0.5rem,0.8vw,0.75rem)]
            text-[clamp(7px,0.7vw,10px)]
            uppercase
            tracking-[0.25em]
            text-white/35
          "
        >
          03 — THESIS
        </p>

        <h2
          className="
            text-[clamp(1.5rem,3.5vw,3.2rem)]
            leading-[1.15]
            tracking-[-0.025em]
            text-white/80
          "
        >
          Spatial Justice of Valiasr Street
        </h2>

        <p
          className="
            mx-auto
            mt-[clamp(0.5rem,0.8vw,0.75rem)]
            max-w-[500px]
            text-[clamp(0.65rem,1vw,1.05rem)]
            leading-[1.55]
            tracking-[0.015em]
            text-white/35
          "
        >
          Small experiments exploring how data, code and urban systems can
          generate new ways of seeing and understanding cities.
        </p>
      </div>

      {/* =======================================================
          MOBILE
      ======================================================== */}

      <div
        className="
          absolute
          left-0
          top-[132%]
          block
          mobile:hidden
          w-full
          px-[7%]
        "
      >
        {/* ====================================================
            MOBILE THESIS HEADER
        ===================================================== */}

        <div className="pt-8">
          <p
            className="
              mb-2
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-white/35
            "
          >
            03 — Thesis
          </p>

          <h2
            className="
              max-w-[340px]
              text-4xl
              font-light
              leading-[0.95]
              tracking-[-0.05em]
              text-white/75
            "
          >
            Spatial Justice
            <br />
            of Valiasr Street
          </h2>

          <p
            className="
              mt-4
              max-w-[330px]
              text-[0.7rem]
              leading-relaxed
              text-white/35
            "
          >
            Small experiments exploring how data, code and urban systems can
            generate new ways of seeing and understanding cities.
          </p>
        </div>

        {/* ====================================================
            MOBILE THESIS FIELD
            FIXED SVG SIZE / STABLE RESPONSIVE POSITION
        ===================================================== */}

        <svg
          viewBox="0 0 390 420"
          preserveAspectRatio="none"
          className="
    mt-8
    block
    h-[420px]
    w-full
    overflow-visible
  "
        >
          <defs>
            <linearGradient
              id="mobile-thesis-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#7d9be8" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#151515" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#7fc6a4" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* ==================================================
      FIXED MOBILE SQUARE
      موقعیت با مختصات SVG
  ================================================== */}

          <g
            pointerEvents="all"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* OUTER */}

            <rect
              x="37"
              y="50"
              width="250"
              height="280"
              rx="64"
              fill="url(#mobile-thesis-gradient)"
              fillOpacity={hovered ? 1 : 0.85}
              stroke="#e46a63"
              strokeWidth="1.5"
              strokeOpacity={hovered ? 1 : 0.8}
              style={{
                transition:
                  "fill-opacity 500ms ease, stroke-opacity 500ms ease",
              }}
            />


            {/* MARKER */}

            <circle cx="263" cy="109" r="4" fill="#e46a63" opacity="0.7" />

            {/* LABEL */}

            <text
              x="70"
              y="300"
              fill="#e46a63"
              fontSize="9"
              style={{
                opacity: hovered ? 1 : 0.75,
                transition: "opacity 300ms ease",
              }}
            >
              VIEW THESIS →
            </text>

            {/* CENTER CONTENT */}

            <text
              x="160"
              y="210"
              textAnchor="middle"
              fill="rgba(255,255,255,0.30)"
              fontSize="7"
              letterSpacing="2"
            >
              RESEARCH
            </text>

            <text
              x="160"
              y="235"
              textAnchor="middle"
              fill="rgba(255,255,255,0.70)"
              fontSize="10"
              letterSpacing="0.4"
            >
              Spatial Justice
            </text>

            <text
              x="160"
              y="250"
              textAnchor="middle"
              fill="rgba(255,255,255,0.70)"
              fontSize="10"
              letterSpacing="0.4"
            >
              Valiasr Street
            </text>
          </g>
        </svg>

        {/* ====================================================
            SMALL FOOTNOTE
        ===================================================== */}

        <p
          className="
            mx-auto
            text-center
            text-[12px]
            text-white/25
          "
        >
          Machine learning · street-level imagery · walkability
        </p>
      </div>
    </section>
  );
};
