"use client";

import Link from "next/link";
import { useState } from "react";

type ProjectId = 1 | 2 | 3;

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 3876.47;

  /* ============================================================
     MAIN FIELD
  ============================================================ */

  const field = `
    768,1902.47
    1032.63,1902.47
    1121.68,2022.47
    1121.52,2227.47
    1013.02,2329.15
    779.40,2329.15
    679.52,2209.47
    679.43,2027.75
  `;

  /* ============================================================
     PROJECTS
  ============================================================ */

  const projects = [
    {
      id: 1 as ProjectId,
      color: "#e46a63",
      hatch: "projects-design-hatch",

      number: "01",
      title: ["RANDOM", "URBAN BLOCK"],
      description: ["Urban design", "experiment"],

      // ✅ فایل واقعی
      image: "/projects/randomblock.png",

      centerX: 753,

      cellPath: `
        M 768 1902.47
        L 827 1902.47
        L 827 2322
        L 779.40 2329.15
        L 679.52 2209.47
        L 679.43 2027.75
        Z
      `,

      contentX: 692,
      imageX: 690,
      imageY: 2024,
      imageWidth: 130,
      imageHeight: 112,
    },

    {
      id: 2 as ProjectId,
      color: "#7d9be8",
      hatch: "projects-research-hatch",

      number: "02",
      title: ["10 MINUTES", "CITY"],
      description: ["Urban data", "research"],

      image: "/projects/10MinutesCity.jpg",

      centerX: 899.5,

      cellPath: `
        M 827 1902.47
        L 972 1902.47
        L 972 2329.15
        L 827 2329.15
        Z
      `,

      contentX: 840,
      imageX: 838,
      imageY: 2024,
      imageWidth: 123,
      imageHeight: 112,
    },

    {
      id: 3 as ProjectId,
      color: "#7fc6a4",
      hatch: "projects-develop-hatch",

      number: "03",
      title: ["WALKABILITY", "MAP"],
      description: ["Code + walkability", "systems"],

      image: "/projects/walkabilityMap.png",

      centerX: 1049.5,

      cellPath: `
        M 972 1902.47
        L 1032.63 1902.47
        L 1121.68 2022.47
        L 1121.52 2227.47
        L 1013.02 2329.15
        L 972 2329.15
        Z
      `,

      contentX: 985,
      imageX: 981,
      imageY: 2024,
      imageWidth: 130,
      imageHeight: 112,
    },
  ];

  /* ============================================================
     DESKTOP HOVER SCALE
  ============================================================ */

  const getProjectTransform = (project: (typeof projects)[number]) => {
    if (activeProject !== project.id) {
      return "scale(1)";
    }

    const scale = 1.35;

    const cx = project.centerX;
    const cy = 2120;

    return `
      translate(${cx} ${cy})
      scale(${scale})
      translate(-${cx} -${cy})
    `;
  };

  return (
    <section
      id="projects"
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
      {/* ==========================================================
          DESKTOP / ORIGINAL
      =========================================================== */}

      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          hidden
          mobile:block
          h-full
          w-full
          overflow-visible
        "
      >
        <defs>
          <clipPath id="projects-field-clip">
            <polygon points={field} />
          </clipPath>

          {projects.map((project) => (
            <clipPath
              key={`cell-clip-${project.id}`}
              id={`project-cell-clip-${project.id}`}
            >
              <path d={project.cellPath} />
            </clipPath>
          ))}

          <pattern
            id="projects-design-hatch"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="#e46a63"
              strokeWidth="1"
              strokeOpacity="0.42"
            />
          </pattern>

          <pattern
            id="projects-research-hatch"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="#7d9be8"
              strokeWidth="1"
              strokeOpacity="0.42"
            />
          </pattern>

          <pattern
            id="projects-develop-hatch"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="#7fc6a4"
              strokeWidth="1"
              strokeOpacity="0.42"
            />
          </pattern>

          <linearGradient
            id="project-image-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.30" />
          </linearGradient>
        </defs>

        {/* MAIN FIELD */}

        <polygon
          points={field}
          fill="#151515"
          fillOpacity="0.88"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1.2"
        />

        {/* PROJECTS */}

        {projects.map((project) => {
          const isActive = activeProject === project.id;
          const hasActiveProject = activeProject !== null;

          return (
            <g key={project.id}>
              {/* VISUAL PROJECT */}

              <g
                transform={getProjectTransform(project)}
                style={{
                  opacity: hasActiveProject && !isActive ? 0.25 : 1,

                  transition:
                    "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease",

                  transformBox: "view-box",
                  pointerEvents: "none",
                }}
              >
                {/* HATCH */}

                <path d={project.cellPath} fill={`url(#${project.hatch})`} />

                {/* ACTIVE COLOR */}

                <path
                  d={project.cellPath}
                  fill={project.color}
                  fillOpacity="0.16"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                />

                {/* CONTENT */}

                <g clipPath={`url(#project-cell-clip-${project.id})`}>
                  {/* TITLE */}

                  <text
                    x={project.contentX}
                    y="1965"
                    fill="rgba(255,255,255,0.92)"
                    fontSize="14"
                    fontWeight="400"
                    letterSpacing="0.5"
                  >
                    <tspan x={project.contentX + 10} dy="50">
                      {project.title[0]}
                    </tspan>

                    <tspan x={project.contentX + 10} dy="15">
                      {project.title[1]}
                    </tspan>
                  </text>

                  {/* IMAGE */}

                  <image
                    href={project.image}
                    x={project.imageX}
                    y="2050"
                    width={project.imageWidth}
                    height={project.imageHeight}
                    preserveAspectRatio="xMidYMid meet"
                    clipPath="url(#projects-field-clip)"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 450ms ease",
                    }}
                  />

                  {/* IMAGE DARK OVERLAY */}

                  <rect
                    x={project.imageX}
                    y="2050"
                    width={project.imageWidth}
                    height={project.imageHeight}
                    fill="#000"
                    fillOpacity="0.15"
                    clipPath="url(#projects-field-clip)"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 450ms ease",
                    }}
                  />

                  {/* IMAGE GRADIENT */}

                  <rect
                    x={project.imageX}
                    y="2050"
                    width={project.imageWidth}
                    height={project.imageHeight}
                    fill="url(#project-image-gradient)"
                    clipPath="url(#projects-field-clip)"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 450ms ease",
                    }}
                  />

                  {/* DESCRIPTION */}

                  <text
                    x={project.contentX}
                    y="2180"
                    fill="rgba(255,255,255,0.62)"
                    fontSize="13"
                    letterSpacing="0.35"
                  >
                    <tspan x={project.contentX} dy="0">
                      {project.description[0]}
                    </tspan>

                    <tspan x={project.contentX} dy="12">
                      {project.description[1]}
                    </tspan>
                  </text>
                </g>

                {/* ACTIVE BORDER */}

                <path
                  d={project.cellPath}
                  fill="none"
                  stroke={project.color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    opacity: isActive ? 0.95 : 0,
                    transition: "opacity 350ms ease",
                  }}
                />
              </g>

              {/* CLICK / HOVER AREA */}

              {project.id === 1 ? (
                <a
                  href="/randomblock"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={project.cellPath}
                    fill="transparent"
                    pointerEvents="all"
                  />
                </a>
              ) : project.id === 3 ? (
                <a
                  href="/walkabilitymap"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={project.cellPath}
                    fill="transparent"
                    pointerEvents="all"
                  />
                </a>
              ) : (
                <path
                  d={project.cellPath}
                  fill="transparent"
                  pointerEvents="all"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                />
              )}
            </g>
          );
        })}

        {/* DIVIDER 1 */}

        <line
          x1="827"
          y1="1902.47"
          x2="827"
          y2="2329.15"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          pointerEvents="none"
        />

        {/* DIVIDER 2 */}

        <line
          x1="972"
          y1="1902.47"
          x2="972"
          y2="2329.15"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          pointerEvents="none"
        />

        {/* OUTER BORDER */}

        <polygon
          points={field}
          fill="none"
          stroke="rgba(255,255,255,0.48)"
          strokeWidth="1.2"
          pointerEvents="none"
        />
      </svg>

      {/* ==========================================================
          MOBILE
      =========================================================== */}

      <div
        className="
          absolute
          left-0
          top-[100%]
          block
          mobile:hidden
          w-full
          px-[7%]
          pb-8
        "
      >
        {/* MOBILE HEADER */}

        <div className="pt-16">
          <p
            className="
              mb-2
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-white/35
            "
          >
            02 — Projects
          </p>

          <h2
            className="
              text-[clamp(2rem,9vw,3rem)]
              font-light
              leading-[0.95]
              tracking-[-0.05em]
              text-white/70
            "
          >
            Small experiments
          </h2>

          <p
            className="
              mt-3
              max-w-[330px]
              text-[0.7rem]
              leading-relaxed
              text-white/35
            "
          >
            Exploring how data, code and urban systems can generate new ways of
            seeing and understanding cities.
          </p>
        </div>

        {/* MOBILE PROJECT CARDS */}

        <div className="mt-8 flex flex-col gap-3">
          {/* ======================================================
              PROJECT 01
          ======================================================= */}

          <Link
            href="/randomblock"
            className="
              group
              flex
              h-[92px]
              w-full
              items-center
              overflow-hidden
              border
              border-white/10
              border-l-2
              border-l-[#b8b5ae]
              bg-[#151515]/90
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/20
              hover:bg-[#1b1b1b]
            "
          >
            <div className="flex w-[42%] flex-col px-3">
              <span
                className="
                  text-[8px]
                  tracking-[0.2em]
                  text-white/45
                "
              >
                01
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  leading-tight
                  text-white/85
                "
              >
                RANDOM
                <br />
                URBAN BLOCK
              </span>

              <span
                className="
                  mt-2
                  text-[7px]
                  text-white/35
                "
              >
                Urban design · experiment
              </span>
            </div>


            <img
              src="/projects/randomblock.png"
              alt="Random Urban Block"
              className="
                h-[76px]
                w-[58%]
                object-cover
                opacity-90
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </Link>

          {/* ======================================================
              PROJECT 02
          ======================================================= */}

          <div
            className="
              flex
              h-[92px]
              w-full
              items-center
              overflow-hidden
              border
              border-white/10
              border-l-2
              border-l-[#7d9be8]
              bg-[#151515]/90
            "
          >
            <div className="flex w-[42%] flex-col px-3">
              <span
                className="
                  text-[8px]
                  tracking-[0.2em]
                  text-[#7d9be8]/80
                "
              >
                02
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  leading-tight
                  text-white/85
                "
              >
                10 MINUTES
                <br />
                CITY
              </span>

              <span
                className="
                  mt-2
                  text-[7px]
                  text-white/35
                "
              >
                Urban data · research
              </span>
            </div>

            <img
              src="/projects/10MinutesCity.jpg"
              alt="10 Minutes City"
              className="
                h-[76px]
                w-[58%]
                object-cover
                opacity-90
              "
            />
          </div>

          {/* ======================================================
              PROJECT 03
          ======================================================= */}

          <Link
            href="/walkabilitymap"
            className="
              group
              flex
              h-[92px]
              w-full
              items-center
              overflow-hidden
              border
              border-white/10
              border-l-2
              border-l-[#7fc6a4]
              bg-[#151515]/90
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/20
              hover:bg-[#1b1b1b]
            "
          >
            <div className="flex w-[42%] flex-col px-3">
              <span
                className="
                  text-[8px]
                  tracking-[0.2em]
                  text-[#7fc6a4]/80
                "
              >
                03
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  leading-tight
                  text-white/85
                "
              >
                WALKABILITY
                <br />
                MAP
              </span>

              <span
                className="
                  mt-2
                  text-[7px]
                  text-white/35
                "
              >
                Code + walkability · systems
              </span>
            </div>

            <img
              src="/projects/walkabilityMap.png"
              alt="Walkability Map"
              className="
                h-[76px]
                w-[58%]
                object-cover
                opacity-90
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </Link>
        </div>
      </div>

      {/* ==========================================================
          DESKTOP PROJECT LABEL
      =========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-[53%]
          hidden
          mobile:block
          w-[320px]
        "
      >
        <p
          className="
            mb-3
            text-[9px]
            uppercase
            tracking-[0.28em]
            text-white/35
          "
        >
          02 — Projects
        </p>

        <h2
          className="
            text-4xl
            font-light
            tracking-[-0.05em]
            text-white/70
          "
        >
          Small experiments
        </h2>

        <p
          className="
            mt-2
            text-md
            max-w-[300px]
            leading-relaxed
            text-white/35
          "
        >
          Exploring how data, code and urban systems can generate new ways of
          seeing and understanding cities.
        </p>
      </div>
    </section>
  );
};
