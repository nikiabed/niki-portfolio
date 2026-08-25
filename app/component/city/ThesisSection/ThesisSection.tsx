"use client";

import { useState } from "react";

export const ThesisSection = () => {
  const [hovered, setHovered] = useState(false);

  /* ============================================================
   * SVG COORDINATE SYSTEM
   * دقیقاً همان سیستم Projects / Momentumly
   * ============================================================ */

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 3876.47;

  /* ============================================================
   * THESIS FIELD POSITION
   * ============================================================
   *
   * فقط این قسمت را برای جابه‌جایی شکل تغییر بده.
   *
   * cx → چپ / راست
   * cy → بالا / پایین
   * size → اندازه
   */

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
   * HTML POSITION HELPERS
   * ============================================================ */

  const fieldX = (field.cx / SVG_WIDTH) * 100;
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
          SVG
          فقط SHAPE
      ======================================================== */}

      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
          overflow-visible
        "
      >
        {/* =====================================================
            THESIS FIELD
        ====================================================== */}

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
          {/* =================================================
              OUTER FIELD
          ================================================== */}

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

          {/* =================================================
              INNER BORDER
          ================================================== */}

          <path
            d={innerPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* =================================================
              SMALL FIELD MARKER
          ================================================== */}

          <circle
            cx={field.cx + field.size - 25}
            cy={field.cy - field.size + 25}
            r="4"
            fill="#e46a63"
            opacity="0.7"
          />

          {/* =================================================
              HOVER LABEL
          ================================================== */}

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

        {/* =====================================================
            GRADIENT
        ====================================================== */}

        <defs>
          <linearGradient id="thesis-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7d9be8" stopOpacity="0.30" />

            <stop offset="50%" stopColor="#151515" stopOpacity="0.78" />

            <stop offset="100%" stopColor="#7fc6a4" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>

      {/* =======================================================
          THESIS HEADER
          HTML
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          w-[70%]
          text-center
        "
        style={{
          left: "50%",
          top: `${fieldY - 10}%`,
          transform: "translateX(-50%)",
        }}
      >
        {/* LABEL */}

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

        {/* TITLE */}

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

        {/* DESCRIPTION */}

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
    </section>
  );
};
