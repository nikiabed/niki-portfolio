"use client";

import { useState } from "react";
import { generateUrbanBlock } from "../lib/urbanGenerator";

export default function RandomUrbanBlockPage() {
  const [hover, setHover] = useState<number | null>(null);
  const [seed, setSeed] = useState(42);

  const blocks = generateUrbanBlock(seed);

  const sitePoints = `
    150,80
    720,80
    780,150
    780,420
    120,420
    80,330
  `;

  return (
    <main
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#111]
        text-white
      "
    >
      {/* TITLE */}

      <div
        className="
          absolute
          left-[8%]
          top-[18%]
          z-10
          max-w-sm
        "
      >
        <p className="text-xs tracking-[0.3em] text-white/30">
          01 — URBAN DESIGN
        </p>

        <h1
          className="
            mt-6
            text-6xl
            font-light
            leading-[0.9]
            text-white/85
          "
        >
          Random
          <br />
          Urban Block
        </h1>

        <p
          className="
            mt-6
            text-sm
            leading-relaxed
            text-white/40
          "
        >
          An experiment exploring how random spatial configurations can generate
          new urban relationships.
        </p>
      </div>

      {/* GENERATE */}

      <button
        onClick={() => setSeed(Math.floor(Math.random() * 10000))}
        className="
          absolute
          right-[8%]
          top-[10%]
          z-20
          rounded-full
          border
          border-white/20
          px-5
          py-2
          text-xs
          tracking-[0.25em]
          text-white/60
          transition
          hover:bg-white/10
        "
      >
        GENERATE NEW CITY
      </button>

      {/* SVG */}

      <svg
        viewBox="0 0 900 520"
        className="
          absolute
          left-1/2
          top-1/2
          h-[70vh]
          w-[70vw]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <defs>
          <clipPath id="siteClip">
            <polygon points={sitePoints} />
          </clipPath>
        </defs>

        {/* SITE BASE */}

        <polygon
          points={sitePoints}
          fill="#151515"
          stroke="rgba(255,255,255,.35)"
          strokeWidth="2"
        />

        {/* PARCEL PUZZLE */}

        <g clipPath="url(#siteClip)">
          {blocks.map((block) => {
            const color =
              block.type === "building"
                ? "#e46a63"
                : block.type === "green"
                  ? "#7fc6a4"
                  : "#7d9be8";

            return (
              <polygon
                key={block.id}
                points={block.points}
                fill={color}
                fillOpacity={hover === block.id ? "0.65" : "0.35"}
                stroke="rgba(255,255,255,.45)"
                strokeWidth="1"
                onMouseEnter={() => setHover(block.id)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer"
              />
            );
          })}
        </g>

        {/* BORDER */}

        <polygon
          points={sitePoints}
          fill="none"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="2"
        />
      </svg>

      {/* INFO */}

      <div
        className="
          absolute
          bottom-[10%]
          right-[8%]
          text-right
        "
      >
        <p
          className="
            text-xs
            tracking-[0.25em]
            text-white/30
          "
        >
          RANDOM GENERATION
        </p>

        <p
          className="
            mt-3
            text-sm
            text-white/50
          "
        >
          Density · Morphology · Interaction
        </p>
      </div>
    </main>
  );
}
