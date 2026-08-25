"use client";

import { useEffect, useState } from "react";
import { MomentumlySection } from "./MomentumlySection";
import { ProjectsSection } from "./ProjectsSection";
import { ThesisSection } from "./ThesisSection";
import { CurrentlyExploringSection } from "./CurrentlyExploringSection";
import { FooterSection } from "./FooterSection";

export const CityMap = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="w-full bg-[#1b1b1b] text-[#f1f1ed]">
      <section className="relative min-h-[5000px] w-full overflow-hidden bg-[#1e1e1e]">
        {/* =====================================================
            BACKGROUND MAP
        ====================================================== */}

        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/maps/Asset 33.svg"
            alt=""
            className="
              absolute
              top-0
              left-1/2
              h-auto
              w-full
              max-w-none
              -translate-x-1/2
              max-sm:left-[32%]
              max-sm:w-[210%]
            "
          />
        </div>

        {/* =====================================================
            HEADER CONTENT
        ====================================================== */}

        <div className="relative z-10 w-full">
          <div className="mx-auto w-[90%] max-w-[1400px]">
            {/* =================================================
                NAME
            ================================================== */}

            <div className="pt-[2vw]">
              <p
                className={`
                  text-[clamp(0.65rem,1.2vw,1rem)]
                  uppercase
                  tracking-[0.28em]
                  text-white/50
                  transition-all
                  duration-[1200ms]
                  ease-out
                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }
                `}
              >
                Niki Abedzadeh
              </p>
            </div>

            {/* =================================================
                DESKTOP SVG HEADER
            ================================================== */}

            <div className="hidden sm:block">
              <svg
                viewBox="0 0 1400 400"
                className="mt-[0.5vw] h-auto w-full overflow-visible"
                preserveAspectRatio="xMidYMin meet"
              >
                {/* =================================================
                    TITLES
                ================================================== */}

                <text
                  x="0"
                  y="180"
                  fill="var(--design)"
                  fontSize="72"
                  fontWeight="600"
                  letterSpacing="-4"
                >
                  Design
                </text>

                <text
                  x="0"
                  y="250"
                  fill="var(--research)"
                  fontSize="72"
                  fontWeight="600"
                  letterSpacing="-4"
                >
                  Research
                </text>

                <text
                  x="0"
                  y="320"
                  fill="var(--develop)"
                  fontSize="72"
                  fontWeight="600"
                  letterSpacing="-4"
                >
                  Develop
                </text>

                {/* =================================================
                    FIRST GROUP
                    DESIGN → RESEARCH
                ================================================== */}

                <a href="#design">
                  <g className="group cursor-pointer">
                    <rect
                      x="400"
                      y="80"
                      width="105"
                      height="75"
                      fill="#e46a63"
                      fillOpacity="0.04"
                      stroke="#e46a63"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="412"
                      y="143"
                      fill="#e46a63"
                      fontSize="11"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Design →
                    </text>
                  </g>
                </a>

                {/* EMPTY */}

                <rect
                  x="520"
                  y="55"
                  width="75"
                  height="105"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* EMPTY */}

                <rect
                  x="610"
                  y="80"
                  width="100"
                  height="75"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* RESEARCH */}

                <a href="#research">
                  <g className="group cursor-pointer">
                    <rect
                      x="730"
                      y="50"
                      width="75"
                      height="110"
                      fill="#7fc6a4"
                      fillOpacity="0.04"
                      stroke="#7fc6a4"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-[#7fc6a4]/[0.12]
                        group-hover:stroke-[#7fc6a4]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="740"
                      y="145"
                      fill="#7fc6a4"
                      fontSize="11"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Research →
                    </text>
                  </g>
                </a>

                {/* =================================================
                    STREET / GAP
                ================================================== */}

                {/* intentionally empty space */}

                {/* =================================================
                    SECOND GROUP
                    EMPTY → EMPTY → DEVELOP
                ================================================== */}

                <rect
                  x="930"
                  y="55"
                  width="75"
                  height="100"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="1025"
                  y="55"
                  width="90"
                  height="100"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* DEVELOP */}

                <a href="#develop">
                  <g className="group cursor-pointer">
                    <rect
                      x="1135"
                      y="55"
                      width="90"
                      height="110"
                      fill="#7d9be8"
                      fillOpacity="0.04"
                      stroke="#7d9be8"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-[#7d9be8]/[0.12]
                        group-hover:stroke-[#7d9be8]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="1147"
                      y="150"
                      fill="#7d9be8"
                      fontSize="11"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Develop →
                    </text>
                  </g>
                </a>

                {/* =================================================
                    LOWER BLOCKS
                ================================================== */}

                <rect
                  x="650"
                  y="250"
                  width="105"
                  height="75"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="770"
                  y="240"
                  width="80"
                  height="90"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* CONTACT */}

                <a href="#contact">
                  <g className="group cursor-pointer">
                    <rect
                      x="865"
                      y="250"
                      width="90"
                      height="90"
                      fill="white"
                      fillOpacity="0.025"
                      stroke="white"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-white/[0.07]
                        group-hover:stroke-white/60
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="877"
                      y="330"
                      fill="white"
                      fontSize="10"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-70
                      "
                    >
                      Contact →
                    </text>
                  </g>
                </a>

                {/* ABOUT */}

                <a href="#about">
                  <g className="group cursor-pointer">
                    <rect
                      x="970"
                      y="250"
                      width="90"
                      height="90"
                      fill="white"
                      fillOpacity="0.025"
                      stroke="white"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-white/[0.07]
                        group-hover:stroke-white/60
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="982"
                      y="330"
                      fill="white"
                      fontSize="10"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-70
                      "
                    >
                      About →
                    </text>
                  </g>
                </a>
              </svg>
            </div>

            {/* =================================================
                MOBILE SVG HEADER
            ================================================== */}

            <div className="block sm:hidden">
              <svg
                viewBox="0 0 390 330"
                className="mt-4 h-auto w-full overflow-visible"
                preserveAspectRatio="xMidYMin meet"
              >
                {/* =================================================
                    TITLES
                ================================================== */}

                <text
                  x="15"
                  y="100"
                  fill="var(--design)"
                  fontSize="48"
                  fontWeight="600"
                  letterSpacing="-3"
                >
                  Design
                </text>

                <text
                  x="15"
                  y="150"
                  fill="var(--research)"
                  fontSize="48"
                  fontWeight="600"
                  letterSpacing="-3"
                >
                  Research
                </text>

                <text
                  x="15"
                  y="200"
                  fill="var(--develop)"
                  fontSize="48"
                  fontWeight="600"
                  letterSpacing="-3"
                >
                  Develop
                </text>

                {/* DESIGN */}

                <a href="#design">
                  <g className="group cursor-pointer">
                    <rect
                      x="135"
                      y="55"
                      width="70"
                      height="55"
                      fill="#e46a63"
                      fillOpacity="0.04"
                      stroke="#e46a63"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-[#e46a63]/[0.12]
                        group-hover:stroke-[#e46a63]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="143"
                      y="102"
                      fill="#e46a63"
                      fontSize="8"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Design →
                    </text>
                  </g>
                </a>

                {/* EMPTY */}

                <rect
                  x="215"
                  y="45"
                  width="50"
                  height="70"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="275"
                  y="55"
                  width="75"
                  height="55"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* RESEARCH */}

                <a href="#research">
                  <g className="group cursor-pointer">
                    <rect
                      x="365"
                      y="45"
                      width="55"
                      height="80"
                      fill="#7fc6a4"
                      fillOpacity="0.04"
                      stroke="#7fc6a4"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-[#7fc6a4]/[0.12]
                        group-hover:stroke-[#7fc6a4]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="370"
                      y="115"
                      fill="#7fc6a4"
                      fontSize="8"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Research →
                    </text>
                  </g>
                </a>

                {/* SECOND GROUP */}

                <rect
                  x="455"
                  y="45"
                  width="55"
                  height="70"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="525"
                  y="45"
                  width="55"
                  height="70"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* DEVELOP */}

                <a href="#develop">
                  <g className="group cursor-pointer">
                    <rect
                      x="595"
                      y="40"
                      width="65"
                      height="80"
                      fill="#7d9be8"
                      fillOpacity="0.04"
                      stroke="#7d9be8"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-[#7d9be8]/[0.12]
                        group-hover:stroke-[#7d9be8]
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="602"
                      y="110"
                      fill="#7d9be8"
                      fontSize="8"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Develop →
                    </text>
                  </g>
                </a>

                {/* LOWER BLOCKS */}

                <rect
                  x="130"
                  y="250"
                  width="70"
                  height="55"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="210"
                  y="240"
                  width="60"
                  height="70"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* CONTACT */}

                <a href="#contact">
                  <g className="group cursor-pointer">
                    <rect
                      x="280"
                      y="250"
                      width="65"
                      height="65"
                      fill="white"
                      fillOpacity="0.025"
                      stroke="white"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-white/[0.07]
                        group-hover:stroke-white/60
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="286"
                      y="302"
                      fill="white"
                      fontSize="8"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      Contact →
                    </text>
                  </g>
                </a>

                {/* ABOUT */}

                <a href="#about">
                  <g className="group cursor-pointer">
                    <rect
                      x="355"
                      y="250"
                      width="65"
                      height="65"
                      fill="white"
                      fillOpacity="0.025"
                      stroke="white"
                      strokeOpacity="0.3"
                      className="
                        transition-all
                        duration-300
                        group-hover:-translate-y-2
                        group-hover:scale-[1.04]
                        group-hover:fill-white/[0.07]
                        group-hover:stroke-white/60
                      "
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                    />

                    <text
                      x="361"
                      y="302"
                      fill="white"
                      fontSize="8"
                      opacity="0"
                      className="
                        pointer-events-none
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      About →
                    </text>
                  </g>
                </a>
              </svg>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <div className="pb-[clamp(4rem,6vw,6rem)]">
              <h2
                className={`
                  ml-auto
                  mt-[clamp(0.5rem,1.5vw,1.5rem)]
                  max-w-[750px]
                  text-[clamp(1.5rem,3.5vw,3.5rem)]
                  font-light
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-white/70
                  transition-all
                  duration-[1400ms]
                  ease-out
                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
              >
                Exploring cities through design, data & technology.
              </h2>
            </div>
          </div>
        </div>

        {/* =====================================================
            SECTIONS
        ====================================================== */}

        <MomentumlySection />
        <ProjectsSection />
        <ThesisSection />
        <CurrentlyExploringSection />
        <FooterSection />
      </section>
    </main>
  );
};
