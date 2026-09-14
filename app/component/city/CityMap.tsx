"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { MomentumlySection } from "./MomentumlySection";
import { ProjectsSection } from "./ProjectsSection";
import { ThesisSection } from "./ThesisSection";
import { CurrentlyExploringSection } from "./CurrentlyExploringSection";
import { FooterSection } from "./FooterSection";

/* ============================================================
   TYPES
============================================================ */

type ScrollDirection = "down" | "up";

interface FootstepData {
  x: number;
  y: number;
  rotate: number;
}

/* ============================================================
   FOOTSTEP PATH
============================================================ */

/*
  Key waypoints only — the path between them is densified below
  so consecutive footprints sit closer together (a shorter, more
  natural stride) instead of the sparse waypoints themselves.
*/
const FOOTSTEP_WAYPOINTS: FootstepData[] = [
  { x: 25.8, y: 3, rotate: 0 },
  { x: 25.1, y: 6, rotate: 2 },
  { x: 23.8, y: 9, rotate: 12 },
  { x: 21.8, y: 12, rotate: 18 },
  { x: 19.5, y: 15, rotate: 20 },
  { x: 18.6, y: 18, rotate: 6 },
  { x: 18.5, y: 98, rotate: 0 },
];

/*
  Distance (in % of section height) between footprints.
  Smaller = shorter, closer-together steps.
*/
const FOOTSTEP_GAP = 2;

const densifyPath = (
  waypoints: FootstepData[],
  maxGap: number
): FootstepData[] => {
  const dense: FootstepData[] = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const segments = Math.max(1, Math.round((b.y - a.y) / maxGap));

    for (let s = 0; s < segments; s++) {
      const t = s / segments;

      dense.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        rotate: a.rotate + (b.rotate - a.rotate) * t,
      });
    }
  }

  dense.push(waypoints[waypoints.length - 1]);

  return dense;
};

const FOOTSTEPS: FootstepData[] = densifyPath(FOOTSTEP_WAYPOINTS, FOOTSTEP_GAP);

/* ============================================================
   SINGLE FOOTSTEP
============================================================ */

const Footstep = ({
  x,
  y,
  rotate,
  side,
  direction,
  distance,
}: {
  x: number;
  y: number;
  rotate: number;
  side: "left" | "right";
  direction: ScrollDirection;
  distance: number;
}) => {
  const sideOffset = side === "left" ? -0.32 : 0.32;

  /*
    distance:
    0 = current footstep
    1 = previous footstep
    2 = previous previous...
  */

  const isVisible = distance >= 0 && distance <= 4;

  const opacityLevels = [0.72, 0.52, 0.34, 0.2, 0.1];

  const targetOpacity = isVisible ? (opacityLevels[distance] ?? 0) : 0;

  const targetScale = distance === 0 ? 1.08 : 1;

  return (
    <motion.div
      animate={{
        opacity: targetOpacity,
        scale: targetScale,
        rotate: direction === "down" ? rotate + 180 : rotate,
      }}
      transition={{
        opacity: {
          duration: 0.22,
          ease: "easeOut",
        },
        scale: {
          duration: 0.22,
          ease: "easeOut",
        },
        rotate: {
          duration: 0.28,
          ease: "easeOut",
        },
      }}
      style={{
        left: `${x + sideOffset}%`,
        top: `${y}%`,
      }}
      className="
        absolute
        -translate-x-1/2
        -translate-y-1/2
        text-white
        will-change-transform
      "
    >
      <svg
        width="11"
        height="22"
        viewBox="0 0 12 24"
        fill="none"
        aria-hidden="true"
      >
        {/* front / toe */}

        <ellipse cx="6" cy="6.2" rx="3.7" ry="5.4" fill="currentColor" />

        {/* heel */}

        <ellipse cx="6" cy="17" rx="2.6" ry="4.2" fill="currentColor" />
      </svg>
    </motion.div>
  );
};

/* ============================================================
   WALKING FOOTPRINTS
============================================================ */

const WalkingFootprints = ({
  activeStep,
  direction,
}: {
  activeStep: number;
  direction: ScrollDirection;
}) => {
  return (
    <>
      {FOOTSTEPS.map((step, index) => {
        /*
          DOWN:
          current step + footsteps behind it

          UP:
          current step + footsteps below it,
          so the trail visually follows us upward.
        */

        const distance =
          direction === "down" ? activeStep - index : index - activeStep;

        const side = index % 2 === 0 ? "left" : "right";

        return (
          <Footstep
            key={index}
            {...step}
            side={side}
            direction={direction}
            distance={distance}
          />
        );
      })}
    </>
  );
};

/* ============================================================
   CITY MAP
============================================================ */

export const CityMap = () => {
  const [visible, setVisible] = useState(false);

  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");

  const [activeStep, setActiveStep] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  /* =========================================================
     INITIAL ENTRANCE
  ========================================================== */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  /* =========================================================
     SCROLL DIRECTION
  ========================================================== */

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY + 1) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY - 1) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     SCROLL PROGRESS
  ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
    Faster spring so footprints stay close
    to the actual scroll position.
  */

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.18,
  });

  /* =========================================================
     ACTIVE FOOTSTEP
  ========================================================== */

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.round(latest * (FOOTSTEPS.length - 1));

    setActiveStep((previous) => (previous === index ? previous : index));
  });

  /* =========================================================
     LEFT PROGRESS DOT
  ========================================================== */

  const walkerTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="w-full bg-[#1b1b1b] text-[#f1f1ed]">
      <section
        ref={sectionRef}
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
            FOOTSTEPS
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[4]
            hidden
            mobile:block
          "
        >
          <WalkingFootprints
            activeStep={activeStep}
            direction={scrollDirection}
          />
        </div>

        {/* =====================================================
            DESKTOP SCROLL INDICATOR
        ====================================================== */}

        <div
          className="
            pointer-events-none
            fixed
            left-[2rem]
            top-[8vh]
            z-[50]
            hidden
            h-[84vh]
            w-[20px]
            mobile:block
          "
        >
          {/* base line */}

          <div
            className="
              absolute
              left-1/2
              top-0
              h-full
              w-px
              -translate-x-1/2
              bg-white/10
            "
          />

          {/* completed progress */}

          <motion.div
            style={{
              scaleY: smoothProgress,
              transformOrigin: "top",
            }}
            className="
              absolute
              left-1/2
              top-0
              h-full
              w-px
              -translate-x-1/2
              bg-white/45
            "
          />

          {/* nodes */}

          <div
            className="
              absolute
              left-1/2
              top-0
              h-full
              -translate-x-1/2
            "
          >
            {[0, 20, 40, 60, 80, 100].map((value) => (
              <div
                key={value}
                style={{
                  top: `${value}%`,
                }}
                className="
                    absolute
                    left-1/2
                    h-[5px]
                    w-[5px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/20
                    bg-[#1e1e1e]
                  "
              />
            ))}
          </div>

          {/* moving location */}

          <motion.div
            style={{
              top: walkerTop,
            }}
            className="
              absolute
              left-1/2
              h-[8px]
              w-[8px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/90
              shadow-[0_0_14px_rgba(255,255,255,0.28)]
            "
          />
        </div>

        {/* =====================================================
            MOBILE PROGRESS
        ====================================================== */}

        <div
          className="
            pointer-events-none
            fixed
            bottom-0
            left-0
            z-[50]
            block
            h-[2px]
            w-full
            bg-white/10
            mobile:hidden
          "
        >
          <motion.div
            style={{
              scaleX: smoothProgress,
              transformOrigin: "left",
            }}
            className="
              h-full
              w-full
              bg-white/60
            "
          />
        </div>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative z-10 w-full">
          <div className="mx-auto w-[90%] max-w-[1400px]">
            {/* DESKTOP NAME */}

            <div className="hidden pt-[2vw] mobile:block">
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

            {/* MOBILE NAME + TITLES */}

            <div className="block pt-5 mobile:hidden">
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

                {/* DESIGN */}

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

                {/* RESEARCH */}

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

                {/* EMPTY */}

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

                {/* DEVELOP */}

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

                {/* LOWER BLOCKS */}

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

                <a
                  href="/Niki-Abedzadeh-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
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
                      x="895"
                      y="315"
                      fill="white"
                      fontSize="13"
                      opacity="0"
                      className="
        transition-opacity
        duration-300
        group-hover:opacity-70
      "
                    >
                      CV ↗
                    </text>
                  </g>
                </a>

                {/* ABOUT */}

                <a href="about" className="group">
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
                MOBILE SVG
            ================================================== */}

            <div className="block mobile:hidden">
              <svg
                viewBox="0 0 390 160"
                className="mt-5 h-auto w-full overflow-visible"
                preserveAspectRatio="xMidYMin meet"
              >
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

                <a
                  href="/Niki-Abedzadeh-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
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

                  <text x="288" y="77" fill="white" fontSize="10">
                    CV ↗
                  </text>
                </a>

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
                  mt-[-1rem]
                  max-w-[750px]
                  text-[clamp(1.5rem,3.5vw,3.5rem)]
                  font-light
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-white/70
                  transition-all
                  duration-[1400ms]
                  ease-out
                  mobile:mt-[clamp(0.8rem,2vw,2rem)]
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
