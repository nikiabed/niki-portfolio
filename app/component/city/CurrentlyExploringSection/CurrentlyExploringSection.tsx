"use client";

import { useState } from "react";

export const CurrentlyExploringSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 5476.47;

  const explorations = [
    "Spatial Analytics",
    "AI & Cities",
    "Web App Design & Development",
  ];

  const colors = ["#7d9be8", "#7fc6a4", "#e46a63"];

  return (
    <section
      id="currently-exploring"
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
      {/* =================================================
          CONTENT POSITION
      ================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[60%]
          w-[90%]
          max-w-[1100px]
          -translate-x-1/2
        "
      >
        {/* =================================================
            TITLE
        ================================================== */}

        <div className="text-center">
          <h2
            className="
              text-[clamp(28px,4vw,54px)]
              font-light
              leading-none
              tracking-[-0.055em]
              text-white/75
            "
          >
            Design · Research · Develop
          </h2>

          <p
            className="
              mt-[clamp(0.75rem,1.2vw,1rem)]
              text-[clamp(7px,0.6vw,9px)]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            across cities, data & technology
          </p>
        </div>

        {/* =================================================
            CONTENT ROW
        ================================================== */}

        <div
          className="
            mt-[clamp(0.5rem,2vw,2rem)]
            flex
            w-full
            items-start
            justify-between
            gap-[clamp(3rem,10vw,10rem)]
            px-[clamp(5rem,15vw,15rem)]
          "
        >
          {/* =================================================
              LEFT
          ================================================== */}

          <div className="shrink-0 pt-[clamp(3rem,10vw,10rem)]">
            <p
              className="
                text-[clamp(10px,0.9vw,14px)]
                uppercase
                leading-[1.45]
                tracking-[0.28em]
                text-white/35
              "
            >
              Currently
              <br />
              exploring
            </p>

            <div
              className="
                mt-[clamp(1rem,1.5vw,1.5rem)]
                h-px
                w-[clamp(40px,4vw,64px)]
                bg-white/15
              "
            />
          </div>

          {/* =================================================
              RIGHT
          ================================================== */}

          <div
            className="
            pointer-events-auto
    flex
    w-full
    max-w-[420px]
    shrink-0
    flex-col
    gap-[clamp(2rem,6vw,6rem)]
            "
          >
            {explorations.map((item, index) => {
              const isHovered = hovered === index;

              return (
                <div
                  key={item}
                  className="
                    relative
                    cursor-default
                    border-b
                    border-white/[0.06]
                    py-[clamp(0.7rem,1vw,1rem)]
                  "
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className="
                        text-[clamp(12px,1.1vw,16px)]
                        font-light
                        tracking-[0.01em]
                        transition-all
                        duration-300
                      "
                      style={{
                        color: isHovered
                          ? colors[index]
                          : "rgba(255,255,255,0.45)",
                        transform: isHovered
                          ? "translateX(8px)"
                          : "translateX(0)",
                      }}
                    >
                      {item}
                    </p>

                    <span
                      className="
                        text-[clamp(9px,0.7vw,11px)]
                        transition-all
                        duration-300
                      "
                      style={{
                        color: colors[index],
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateX(0)"
                          : "translateX(6px)",
                      }}
                    >
                      →
                    </span>
                  </div>

                  {/* HOVER LINE */}

                  <div
                    className="
                      absolute
                      bottom-[-1px]
                      left-0
                      h-px
                      transition-all
                      duration-500
                    "
                    style={{
                      width: isHovered ? "100%" : "0%",
                      backgroundColor: colors[index],
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
