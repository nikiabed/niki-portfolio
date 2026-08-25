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
   * DESKTOP THESIS FIELD
   * ============================================================ */

  const field = {
    cx: 770,
    cy: 2867,
    size: 120,
    radius: 60,
  };

  /* ============================================================
   * MOBILE THESIS FIELD
   *
   * EXACTLY LIKE MOMENTUMLY:
   * position + size are defined directly in SVG coordinates.
   * ============================================================ */

  const mobileField = {
    cx: 580,
    cy: 6010,
    width: 500,
    height: 520,
    radius: 100,
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
   * DESKTOP OUTER / INNER
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
          MAIN SVG
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
            DESKTOP THESIS
            DON'T TOUCH
        ====================================================== */}

        <g
          pointerEvents="all"
          className="hidden mobile:block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            cursor: "pointer",
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
          {/* OUTER */}

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

          {/* INNER */}

          <path
            d={innerPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* MARKER */}

          <circle
            cx={field.cx + field.size - 25}
            cy={field.cy - field.size + 25}
            r="4"
            fill="#e46a63"
            opacity="0.7"
          />

          {/* LABEL */}

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
            MOBILE THESIS
            FIXED DIRECTLY INSIDE SVG
            SAME SYSTEM AS MOMENTUMLY
        ====================================================== */}

        <g pointerEvents="none" className="block mobile:hidden">
          {/* ==================================================
              OUTER FIELD
          ================================================== */}

          <rect
            x={mobileField.cx - mobileField.width / 2}
            y={mobileField.cy - mobileField.height / 2}
            width={mobileField.width}
            height={mobileField.height}
            rx={mobileField.radius}
            fill="url(#mobile-thesis-gradient)"
            fillOpacity="0.12"
            stroke="#e46a63"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            vectorEffect="non-scaling-stroke"
          />

          {/* ==================================================
              INNER BORDER
          ================================================== */}

          <rect
            x={mobileField.cx - mobileField.width / 2 + 12}
            y={mobileField.cy - mobileField.height / 2 + 12}
            width={mobileField.width - 24}
            height={mobileField.height - 24}
            rx={mobileField.radius - 8}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* ==================================================
              MARKER
          ================================================== */}

          <circle
            cx={mobileField.cx + mobileField.width / 2 - 27}
            cy={mobileField.cy - mobileField.height / 2 + 27}
            r="4"
            fill="#e46a63"
          />

          {/* ==================================================
              LABEL
          ================================================== */}

          <text
            x={mobileField.cx - mobileField.width / 2 + 32}
            y={mobileField.cy + mobileField.height / 2 - 30}
            fill="#e46a63"
            fontSize="25"
          >
            VIEW THESIS →
          </text>
        </g>

        {/* =====================================================
            GRADIENTS
        ====================================================== */}

        <defs>
          {/* DESKTOP */}

          <linearGradient id="thesis-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7d9be8" stopOpacity="0.30" />

            <stop offset="50%" stopColor="#151515" stopOpacity="0.78" />

            <stop offset="100%" stopColor="#7fc6a4" stopOpacity="0.35" />
          </linearGradient>

          {/* MOBILE */}

          <linearGradient
            id="mobile-thesis-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7d9be8" />

            <stop offset="50%" stopColor="#151515" />

            <stop offset="100%" stopColor="#7fc6a4" />
          </linearGradient>
        </defs>
      </svg>

      {/* =======================================================
          DESKTOP HEADER
          UNCHANGED
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
          MOBILE HEADER
          POSITIONED IN SAME SVG-BASED COORDINATE SYSTEM
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          block
          mobile:hidden
          w-full
          px-[7%]
        "
        style={{
          left: "10%",
          top: `${(mobileField.cy / SVG_HEIGHT) * 100 - 5}%`,
          transform: "translateY(-100%)",
        }}
      >
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
            text-2xl
            font-light
            text-white/75
          "
        >
          Spatial Justice
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

      {/* =======================================================
          MOBILE FOOTNOTE
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          block
          mobile:hidden
          w-full
          px-[7%]
          text-center
        "
        style={{
          left: "0",
          top: `${(mobileField.cy / SVG_HEIGHT) * 100 + 11}%`,
        }}
      >
        <p
          className="
            text-[13px]
            text-white/25
          "
        >
          Machine learning · street-level imagery · walkability
        </p>
      </div>
    </section>
  );
};
