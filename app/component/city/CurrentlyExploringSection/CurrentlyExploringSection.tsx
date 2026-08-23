"use client";

import { useState } from "react";

export const CurrentlyExploringSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const explorations = [
    "Spatial Analytics",
    "AI & Cities",
    "Web App Design & Development",
  ];

  return (
    <section
      id="currently-exploring"
      className="
        pointer-events-none
        absolute
        left-0
        bottom-[-488%]
        z-[25]
        w-full
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-0
          w-[90%]
          max-w-[1100px]
          -translate-x-1/2
        "
      >
        {/* =================================================
            CENTER TITLE
        ================================================== */}

        <div className="text-center">
          <h2
            className="
              whitespace-nowrap
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
              mt-4
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            across cities, data & technology
          </p>
        </div>

        {/* =================================================
            BOTTOM ROW
        ================================================== */}

        <div
          className="
            mt-10
            flex
            justify-around
            p-10
            items-center
          "
        >
          {/* =================================================
              LEFT
          ================================================== */}

          <div className="text-left ">
            <p
              className="
                text-md
                uppercase
                tracking-[0.28em]
                text-white/35
              "
            >
              Currently
              <br/> 
              exploring
            </p>

            <div
              className="
                mt-4
                h-px
                w-16
                bg-white/15
              "
            />
          </div>

          {/* =================================================
              RIGHT
          ================================================== */}

          <div
            className="
              flex
              w-[330px]
              flex-col
              gap-32
            "
          >
            {explorations.map((item, index) => {
              const isHovered = hovered === index;

              return (
                <div
                  key={item}
                  className="
                    pointer-events-auto
                    group
                    relative
                    cursor-default
                    border-b
                    border-white/[0.06]
                    pb-3
                    transition-all
                    duration-300
                  "
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className={`
                        text-md
                        font-light
                        tracking-[0.01em]
                        transition-all
                        duration-300

                        ${
                          isHovered
                            ? index === 0
                              ? "translate-x-2 text-[#7d9be8]"
                              : index === 1
                                ? "translate-x-2 text-[#7fc6a4]"
                                : "translate-x-2 text-[#e46a63]"
                            : "text-white/45"
                        }
                      `}
                    >
                      {item}
                    </p>

                    <span
                      className={`
                        text-[10px]
                        transition-all
                        duration-300

                        ${
                          isHovered
                            ? index === 0
                              ? "translate-x-0 text-[#7d9be8]"
                              : index === 1
                                ? "translate-x-0 text-[#7fc6a4]"
                                : "translate-x-0 text-[#e46a63]"
                            : "translate-x-2 opacity-0"
                        }
                      `}
                    >
                      →
                    </span>
                  </div>

                  {/* HOVER LINE */}

                  <div
                    className={`
                      absolute
                      bottom-[-1px]
                      left-0
                      h-px
                      transition-all
                      duration-500

                      ${
                        isHovered
                          ? index === 0
                            ? "w-full bg-[#7d9be8]"
                            : index === 1
                              ? "w-full bg-[#7fc6a4]"
                              : "w-full bg-[#e46a63]"
                          : "w-0 bg-transparent"
                      }
                    `}
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
