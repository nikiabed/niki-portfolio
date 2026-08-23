"use client";

import { useState } from "react";

export const ThesisSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="thesis"
      className="
        pointer-events-none
        absolute
        left-[5%]
        bottom-[-398%]
        z-[25]
        w-full
      "
    >
      {/* =====================================================
          TEXT — ABOVE FIELD
      ====================================================== */}

      <div
        className="
          absolute
          left-[50%]
          top-[-230px]
          -translate-x-1/2
          text-center
        "
      >
        {/* LABEL */}

        <p
          className="
            mb-3
            text-[9px]
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
            text-5xl
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
            mt-3
            max-w-[500px]
            text-md
            leading-[1.55]
            tracking-[0.015em]
            text-white/35
          "
        >
          Small experiments exploring how data, code and urban systems can
          generate new ways of seeing and understanding cities.
        </p>
      </div>

      {/* =====================================================
          THESIS FIELD
      ====================================================== */}

      <div
        className={`
          pointer-events-auto
          absolute
          left-[50%]
          top-0
          -translate-x-1/2

          h-[260px]
          w-[260px]

          rounded-[28px]

          border
          border-[#e46a63]

          bg-gradient-to-br
          from-[#7d9be8]/25
          via-[#151515]/70
          to-[#7fc6a4]/30

          transition-all
          duration-500
          ease-out

          ${
            hovered
              ? `
                -translate-y-3
                scale-[1.04]
                border-[#e46a63]
                bg-gradient-to-br
                from-[#7d9be8]/40
                via-[#151515]/55
                to-[#7fc6a4]/45
                shadow-[0_0_45px_rgba(228,106,99,0.18)]
              `
              : `
                translate-y-0
                scale-100
                shadow-[0_0_25px_rgba(228,106,99,0.06)]
              `
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* INNER BORDER */}

        <div
          className="
            absolute
            inset-[8px]
            rounded-[21px]
            border
            border-white/[0.06]
            transition-all
            duration-500
          "
        />

        {/* HOVER LABEL */}

        <span
          className={`
            absolute
            bottom-5
            left-6

            text-[8px]
            uppercase
            tracking-[0.2em]

            text-[#e46a63]

            transition-all
            duration-300

            ${
              hovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            }
          `}
        >
          View thesis →
        </span>

        {/* SMALL FIELD MARKER */}

        <span
          className="
            absolute
            right-6
            top-6
            h-1.5
            w-1.5
            rounded-full
            bg-[#e46a63]
            opacity-70
          "
        />
      </div>
    </section>
  );
};
