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
      <section
        className="
    relative
    h-[315.3vw]
    max-mobile:h-[700.6vw]
    w-full
    overflow-hidden
    bg-[#1e1e1e]
  "
      >
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

              max-mobile:left-[32%]
              max-mobile:w-[210%]
            "
          />
        </div>

        {/* =====================================================
            HEADER CONTENT
        ====================================================== */}

        <div className="relative z-10 w-full">
          <div className="mx-auto w-[90%] max-w-[1400px]">
            {/* =================================================
                DESKTOP NAME
            ================================================== */}

            <div className="hidden mobile:block pt-[2vw]">
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
                MOBILE NAME + TITLES
            ================================================== */}

            <div className="block mobile:hidden pt-5">
              <div
                className={`
                  flex
                  items-center
                  justify-between
                  gap-3
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
                {/* NAME */}

                <p
                  className="
                    shrink-0
                    text-[0.62rem]
                    uppercase
                    tracking-[0.18em]
                    text-white/50
                  "
                >
                  Niki Abedzadeh
                </p>

                {/* TITLES */}

                <div className="flex items-center gap-[0.55rem] text-[0.58rem] uppercase tracking-[0.08em]">
                  <span className="text-[var(--design)]">Design</span>
                  <span className="text-[var(--research)]">Research</span>
                  <span className="text-[var(--develop)]">Develop</span>
                </div>
              </div>
            </div>

            {/* =================================================
                DESKTOP SVG
            ================================================== */}

            <div className="hidden mobile:block">
              <svg
                viewBox="0 0 1400 400"
                className="
                   mt-[2vw]
  h-[160px]
  w-full
  overflow-visible
mobile:h-[350px]
                "
                preserveAspectRatio="xMidYMin meet"
              >
                {/* TITLES */}

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
                    DESIGN
                ================================================== */}

                <a href="#design" className="group">
                  <g
                    className="
                      origin-center
                      transition-transform
                      duration-300
                      group-hover:-translate-y-3
                      group-hover:scale-[1.04]
                    "
                  >
                    <rect
                      x="390"
                      y="80"
                      width="105"
                      height="75"
                      fill="#e46a63"
                      fillOpacity="0.04"
                      stroke="#e46a63"
                      strokeOpacity="0.45"
                      className="
                        transition-all
                        duration-300
                        group-hover:fill-[#e46a63]
                        group-hover:fill-opacity-[0.15]
                        group-hover:stroke-opacity-100
                      "
                    />

                    <text
                      x="402"
                      y="125"
                      fill="#e46a63"
                      fontSize="11"
                      opacity="0"
                      className="
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
                  x="510"
                  y="55"
                  width="75"
                  height="105"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="600"
                  y="80"
                  width="100"
                  height="75"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* =================================================
                    RESEARCH
                ================================================== */}

                <a href="#research" className="group">
                  <g
                    className="
                      origin-center
                      transition-transform
                      duration-300
                      group-hover:-translate-y-3
                      group-hover:scale-[1.04]
                    "
                  >
                    <rect
                      x="720"
                      y="50"
                      width="75"
                      height="110"
                      fill="#7fc6a4"
                      fillOpacity="0.04"
                      stroke="#7fc6a4"
                      strokeOpacity="0.45"
                      className="
                        transition-all
                        duration-300
                        group-hover:fill-[#7fc6a4]
                        group-hover:fill-opacity-[0.15]
                        group-hover:stroke-opacity-100
                      "
                    />

                    <text
                      x="730"
                      y="115"
                      fill="#7fc6a4"
                      fontSize="11"
                      opacity="0"
                      className="
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

                {/* intentional street */}

                {/* =================================================
                    DEVELOP GROUP
                ================================================== */}

                <rect
                  x="890"
                  y="55"
                  width="75"
                  height="100"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <rect
                  x="985"
                  y="55"
                  width="90"
                  height="100"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                <a href="#develop" className="group">
                  <g
                    className="
                      origin-center
                      transition-transform
                      duration-300
                      group-hover:-translate-y-3
                      group-hover:scale-[1.04]
                    "
                  >
                    <rect
                      x="1095"
                      y="55"
                      width="90"
                      height="110"
                      fill="#7d9be8"
                      fillOpacity="0.04"
                      stroke="#7d9be8"
                      strokeOpacity="0.45"
                      className="
                        transition-all
                        duration-300
                        group-hover:fill-[#7d9be8]
                        group-hover:fill-opacity-[0.15]
                        group-hover:stroke-opacity-100
                      "
                    />

                    <text
                      x="1107"
                      y="120"
                      fill="#7d9be8"
                      fontSize="11"
                      opacity="0"
                      className="
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
                  y="250"
                  width="80"
                  height="90"
                  fill="white"
                  fillOpacity="0.02"
                  stroke="white"
                  strokeOpacity="0.1"
                />

                {/* CONTACT */}

                <a href="#contact" className="group">
                  <g
                    className="
                      origin-center
                      transition-transform
                      duration-300
                      group-hover:-translate-y-3
                      group-hover:scale-[1.04]
                    "
                  >
                    <rect
                      x="865"
                      y="250"
                      width="120"
                      height="120"
                      fill="white"
                      fillOpacity="0.02"
                      stroke="white"
                      strokeOpacity="0.45"
                      className="
                        transition-all
                        duration-300
                        group-hover:fill-white
                        group-hover:fill-opacity-[0.08]
                        group-hover:stroke-opacity-80
                      "
                    />

                    <text
                      x="875"
                      y="300"
                      fill="white"
                      fontSize="13"
                      opacity="0"
                      className="
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

                <a href="#about" className="group">
                  <g
                    className="
                      origin-center
                      transition-transform
                      duration-300
                      group-hover:-translate-y-3
                      group-hover:scale-[1.04]
                    "
                  >
                    <rect
                      x="1000"
                      y="250"
                      width="120"
                      height="120"
                      fill="white"
                      fillOpacity="0.02"
                      stroke="white"
                      strokeOpacity="0.45"
                      className="
                        transition-all
                        duration-300
                        group-hover:fill-white
                        group-hover:fill-opacity-[0.08]
                        group-hover:stroke-opacity-80
                      "
                    />

                    <text
                      x="1020"
                      y="300"
                      fill="white"
                      fontSize="13"
                      opacity="0"
                      className="
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
                MOBILE
                NO HOVER
            ================================================== */}

            <div className="block mobile:hidden">
              <svg
                viewBox="0 0 390 160"
                className="mt-5 h-auto w-full overflow-visible"
                preserveAspectRatio="xMidYMin meet"
              >
                {/* =================================================
                    DESIGN BLOCK
                ================================================== */}

                <a href="#design">
                  <rect
                    x="15"
                    y="35"
                    width="70"
                    height="70"
                    fill="#e46a63"
                    fillOpacity="0.10"
                    stroke="#e46a63"
                    strokeOpacity="0.65"
                  />

                  <text x="28" y="77" fill="#e46a63" fontSize="11">
                    Design →
                  </text>
                </a>

                {/* =================================================
                    RESEARCH
                ================================================== */}

                <a href="#research">
                  <rect
                    x="100"
                    y="35"
                    width="70"
                    height="75"
                    fill="#7fc6a4"
                    fillOpacity="0.10"
                    stroke="#7fc6a4"
                    strokeOpacity="0.65"
                  />

                  <text x="102" y="77" fill="#7fc6a4" fontSize="11">
                    Research →
                  </text>
                </a>

                {/* =================================================
                    DEVELOP
                ================================================== */}

                <a href="#develop">
                  <rect
                    x="200"
                    y="35"
                    width="60"
                    height="75"
                    fill="#7d9be8"
                    fillOpacity="0.10"
                    stroke="#7d9be8"
                    strokeOpacity="0.65"
                  />

                  <text x="200" y="77" fill="#7d9be8" fontSize="11">
                    Develop →
                  </text>
                </a>

                {/* =================================================
                    LOWER
                ================================================== */}

                {/* CONTACT */}

                <a href="#contact">
                  <rect
                    x="270"
                    y="35"
                    width="60"
                    height="70"
                    fill="white"
                    fillOpacity="0.06"
                    stroke="white"
                    strokeOpacity="0.5"
                  />

                  <text x="273" y="77" fill="white" fontSize="10">
                    Contact →
                  </text>
                </a>

                {/* ABOUT */}

                <a href="#about">
                  <rect
                    x="337"
                    y="35"
                    width="60"
                    height="80"
                    fill="white"
                    fillOpacity="0.06"
                    stroke="white"
                    strokeOpacity="0.5"
                  />

                  <text x="355" y="77" fill="white" fontSize="8">
                    About →
                  </text>
                </a>
              </svg>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <div className="pb-[clamp(2rem,4vw,4rem)]">
              <h2
                className={`
                  ml-auto
                  mt-[-1rem] mobile:mt-[clamp(0.8rem,2vw,2rem)]
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
