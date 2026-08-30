"use client";

import { useState } from "react";

export const MomentumlySection = () => {
  const [active, setActive] = useState(false);

  /* ============================================================
   * SVG COORDINATE SYSTEM
   * ============================================================ */

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 3876.47;

  /* ============================================================
   * MOMENTUMLY POSITION
   * ============================================================ */

  const diamond = {
    cx: 760,
    cy: 1199,
    half: 200,
    radius: 60,
  };
  const mobileDiamond = {
    cx: 570,
    cy: 2520,
    half: 400,
    radius: 100,
  };

  /* ============================================================
   * ROUNDED DIAMOND
   * ============================================================ */

  const createRoundedDiamond = (
    cx: number,
    cy: number,
    half: number,
    radius: number,
  ) => {
    const top = {
      x: cx,
      y: cy - half,
    };

    const right = {
      x: cx + half,
      y: cy,
    };

    const bottom = {
      x: cx,
      y: cy + half,
    };

    const left = {
      x: cx - half,
      y: cy,
    };

    return `
      M ${top.x + radius} ${top.y + radius}
      L ${right.x - radius} ${right.y - radius}
      Q ${right.x} ${right.y}
        ${right.x - radius} ${right.y + radius}
      L ${bottom.x + radius} ${bottom.y - radius}
      Q ${bottom.x} ${bottom.y}
        ${bottom.x - radius} ${bottom.y - radius}
      L ${left.x + radius} ${left.y + radius}
      Q ${left.x} ${left.y}
        ${left.x + radius} ${left.y - radius}
      L ${top.x - radius} ${top.y + radius}
      Q ${top.x} ${top.y}
        ${top.x + radius} ${top.y + radius}

      Z
    `;
  };

  /* ============================================================
   * OUTER / INNER DIAMOND
   * ============================================================ */

  const outerPath = createRoundedDiamond(
    diamond.cx,
    diamond.cy,
    diamond.half,
    diamond.radius,
  );

  const innerPath = createRoundedDiamond(diamond.cx, diamond.cy, 72, 14);

  /* ============================================================
   * SVG → HTML POSITION
   * ============================================================ */

  const diamondY = (diamond.cy / SVG_HEIGHT) * 100;
  const mobileDiamondY = (mobileDiamond.cy / SVG_HEIGHT) * 100;
  return (
    <section
      id="momentumly"
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-[20]
        w-full
      "
      style={{
        aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
      }}
    >
      {/* =======================================================
          SVG
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
            DESKTOP DIAMOND
            Hover فقط بالای 850px
        ====================================================== */}

        <g
          pointerEvents="all"
          className="hidden mobile:block"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          style={{
            cursor: "pointer",
          }}
        >
          {/* OUTER */}

          <path
            d={outerPath}
            fill="#7d9be8"
            fillOpacity={active ? "0.22" : "0.12"}
            stroke="#e46a63"
            strokeWidth="1.5"
            strokeOpacity={active ? "1" : "0.7"}
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "fill-opacity 500ms ease, stroke-opacity 500ms ease",
            }}
          />

          {/* INNER */}

          <path
            d={innerPath}
            fill="#7d9be8"
            fillOpacity={active ? "0.15" : "0.08"}
            stroke="#e46a63"
            strokeWidth="1"
            strokeOpacity={active ? "0.5" : "0.2"}
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "fill-opacity 500ms ease, stroke-opacity 500ms ease",
            }}
          />

          {/* CENTER */}

          <circle cx={diamond.cx} cy={diamond.cy} r="4" fill="#e46a63" />
        </g>

        {/* =====================================================
            MOBILE DIAMOND
            بدون Hover
        ====================================================== */}

       <g
  pointerEvents="none"
  className="block mobile:hidden"
>
  <path
    d={createRoundedDiamond(
      mobileDiamond.cx,
      mobileDiamond.cy,
      mobileDiamond.half,
      mobileDiamond.radius,
    )}
    fill="#7d9be8"
    fillOpacity="0.12"
    stroke="#e46a63"
    strokeWidth="1.5"
    strokeOpacity="0.7"
    vectorEffect="non-scaling-stroke"
  />

  <path
    d={createRoundedDiamond(
      mobileDiamond.cx,
      mobileDiamond.cy,
      82,
      16,
    )}
    fill="#7d9be8"
    fillOpacity="0.08"
    stroke="#e46a63"
    strokeWidth="1"
    strokeOpacity="0.2"
    vectorEffect="non-scaling-stroke"
  />

  <circle
    cx={mobileDiamond.cx}
    cy={mobileDiamond.cy}
    r="4"
    fill="#e46a63"
  />
</g>
      </svg>

      {/* =======================================================
          DESKTOP PROJECT PREVIEW
          شناور کنار Diamond
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          hidden
          mobile:block
          w-[43%]
          max-w-[600px]
        "
        style={{
          left: "5%",
          top: `${diamondY}%`,
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="
            w-full
            rounded-2xl
            border
            border-white/20
            bg-[#111111]
            p-2
            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            transition-all
            duration-700
          "
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0.97)",
          }}
        >
          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-[#e46a63]/30
              bg-[#181818]
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-video
                w-full
                overflow-hidden
                bg-[#202020]
              "
            >
              <img
                src="/projects/momentumly.png"
                alt="Momentumly project preview"
                className="
                  block
                  h-full
                  w-full
                  object-contain
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* PROJECT INFO */}

            <div
              className="
                px-[clamp(0.75rem,1.5vw,1.25rem)]
                py-[clamp(0.65rem,1.2vw,1rem)]
              "
            >
              <div className="flex items-center justify-between">
                <p
                  className="
                    text-[clamp(7px,0.65vw,9px)]
                    uppercase
                    tracking-[0.22em]
                    text-[#e46a63]
                  "
                >
                  Product / Frontend
                </p>

                <span
                  className="
                    text-[clamp(9px,0.8vw,12px)]
                    text-white/30
                  "
                >
                  ↗
                </span>
              </div>

              <h3
                className="
                  mt-[clamp(0.35rem,0.6vw,0.5rem)]
                  text-[clamp(0.85rem,1.5vw,1.25rem)]
                  font-medium
                  tracking-[-0.03em]
                  text-white
                "
              >
                Momentumly
              </h3>

              <p
                className="
                  mt-[clamp(0.3rem,0.5vw,0.5rem)]
                  max-w-[380px]
                  text-[clamp(7px,0.75vw,12px)]
                  leading-relaxed
                  text-white/45
                "
              >
                A task management experience designed to make starting easier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          MOBILE PROJECT PREVIEW
          زیر Diamond / بدون Hover
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          block
          mobile:hidden
          w-full
          px-[5%]
        "
        style={{
          left: "12%",
          top: `calc(${mobileDiamondY}% + 12%)`,
        }}
      >
        <div
          className="
            w-[70%]
            rounded-2xl
            border
            border-white/20
            bg-[#111111]
            p-2
            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
          "
        >
          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-[#e46a63]/30
              bg-[#181818]
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-video
                w-full
                overflow-hidden
                bg-[#202020]
              "
            >
              <img
                src="/projects/momentumly.png"
                alt="Momentumly project preview"
                className="
                  block
                  h-full
                  w-full
                  object-contain
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* PROJECT INFO */}

            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.22em]
                    text-[#e46a63]
                  "
                >
                  Product / Frontend
                </p>

                <span className="text-[10px] text-white/30">↗</span>
              </div>

              <h3
                className="
                  mt-2
                  text-lg
                  font-medium
                  tracking-[-0.03em]
                  text-white
                "
              >
                Momentumly
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-relaxed
                  text-white/45
                "
              >
                A task management experience designed to make starting easier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          DESKTOP SMALL NOTE
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          hidden
          mobile:block
          w-[43%]
          max-w-[600px]
        "
        style={{
          left: "6%",
          top: `calc(${diamondY}% + 8%)`,
        }}
      >
        <p
          className="
            border-l
            border-[#e46a63]/30
            pl-[clamp(0.5rem,1vw,1rem)]
            text-[clamp(6px,0.65vw,10px)]
            uppercase
            leading-[1.7]
            tracking-[0.18em]
            text-white/25
          "
        >
          Designing digital tools around behavior, friction and momentum.
        </p>
      </div>

      {/* =======================================================
          MOBILE SMALL NOTE
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          block
          mobile:hidden
          w-full
          px-[5%]
        "
        style={{
          left: "5%",
          top: `calc(${mobileDiamondY}% + 35%)`,
        }}
      >
        <p
          className="
            border-l
            border-[#e46a63]/30
            pl-3
            text-sm
            uppercase
            text-white/25
          "
        >
          Designing digital tools around behavior, friction and momentum.
        </p>
      </div>

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
          w-[27%]
        "
        style={{
          left: "68%",
          top: "24%",
        }}
      >
        <p
          className="
            text-[clamp(7px,0.7vw,10px)]
            uppercase
            tracking-[0.25em]
            text-[#e46a63]/70
          "
        >
          01 — PRODUCT / FRONTEND
        </p>

        <h2
          className="
            mt-[clamp(0.4rem,0.8vw,0.75rem)]
            text-[clamp(2rem,4vw,4.5rem)]
            font-medium
            leading-[0.9]
            tracking-[-0.05em]
            text-white
          "
        >
          Momentumly
        </h2>

        <p
          className="
            mt-[clamp(0.75rem,1.5vw,1.25rem)]
            max-w-[320px]
            text-[clamp(0.65rem,1vw,1.05rem)]
            leading-relaxed
            text-white/45
          "
        >
          A task management experience designed to make starting easier.
        </p>
      </div>

      {/* =======================================================
          MOBILE HEADER
          بعد از کارت و Note
      ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          z-10
          block
          mobile:hidden
          w-full
          px-[5%]
        "
        style={{
          left: "30%",
          top: `calc(${diamondY}% + 10%)`,
        }}
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#e46a63]/70
          "
        >
          01 — PRODUCT / FRONTEND
        </p>

        <h2
          className="
            mt-2
            text-[clamp(2rem,10vw,3rem)]
            font-medium
            leading-[0.9]
            tracking-[-0.05em]
            text-white
          "
        >
          Momentumly
        </h2>

        <p
          className="
            mt-3
            max-w-[340px]
            text-md
            leading-relaxed
            text-white/45
          "
        >
          A task management experience designed to make starting easier.
        </p>
      </div>
    </section>
  );
};
