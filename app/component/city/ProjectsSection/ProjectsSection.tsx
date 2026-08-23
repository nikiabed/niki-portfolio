"use client";

import { useState } from "react";

type ProjectId = 1 | 2 | 3;

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);

  const SVG_WIDTH = 1403.28;
  const SVG_HEIGHT = 3876.47;

  /*
   * ============================================================
   * MAIN FIELD
   * ============================================================
   */

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

  /*
   * ============================================================
   * PROJECTS
   * ============================================================
   *
   * هر پروژه یک سلول مستقل دارد.
   */

  const projects = [
    {
      id: 1 as ProjectId,

      color: "#e46a63",
      hatch: "projects-design-hatch",

      number: "01",
      title: ["RANDOM", "URBAN BLOCK"],
      description: ["Urban design", "experiment"],

      image: "/projects/randomBlock.jpg",

      centerX: 753,

      /*
       * CELL 01
       */
      cellPath: `
        M 768 1902.47
        L 827 1902.47
        L 827 2322
        L 779.40 2329.15
        L 679.52 2209.47
        L 679.43 2027.75
        Z
      `,

      /*
       * محتوای داخلی
       */
      contentX: 692,
      contentRight: 814,

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

      /*
       * CELL 02
       */
      cellPath: `
        M 827 1902.47
        L 972 1902.47
        L 972 2329.15
        L 827 2329.15
        Z
      `,

      contentX: 840,
      contentRight: 959,

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

      /*
       * CELL 03
       */
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
      contentRight: 1108,

      imageX: 981,
      imageY: 2024,
      imageWidth: 130,
      imageHeight: 112,
    },
  ];

  /*
   * ============================================================
   * HOVER SCALE
   * ============================================================
   */

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
        <defs>
          {/* =====================================================
              MAIN FIELD CLIP
          ====================================================== */}

          <clipPath id="projects-field-clip">
            <polygon points={field} />
          </clipPath>

          {/* =====================================================
              INDIVIDUAL CELL CLIPS
          ====================================================== */}

          {projects.map((project) => (
            <clipPath
              key={`cell-clip-${project.id}`}
              id={`project-cell-clip-${project.id}`}
            >
              <path d={project.cellPath} />
            </clipPath>
          ))}

          {/* =====================================================
              DESIGN HATCH
          ====================================================== */}

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

          {/* =====================================================
              RESEARCH HATCH
          ====================================================== */}

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

          {/* =====================================================
              DEVELOPMENT HATCH
          ====================================================== */}

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

          {/* =====================================================
              IMAGE GRADIENT
          ====================================================== */}

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

        {/* =====================================================
            FIELD BACKGROUND
        ====================================================== */}

        <polygon
          points={field}
          fill="#151515"
          fillOpacity="0.88"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1.2"
        />

        {/* =====================================================
            PROJECT CELLS
        ====================================================== */}

        {projects.map((project) => {
          const isActive = activeProject === project.id;

          const hasActiveProject = activeProject !== null;

          return (
            <g key={project.id}>
              {/* =================================================
                  VISUAL GROUP
              ================================================= */}

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
                {/* =================================================
                    HATCH
                ================================================= */}

                <path d={project.cellPath} fill={`url(#${project.hatch})`} />

                {/* =================================================
                    ACTIVE COLOR
                ================================================= */}

                <path
                  d={project.cellPath}
                  fill={project.color}
                  fillOpacity="0.16"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 400ms ease",
                  }}
                />

                <g clipPath={`url(#project-cell-clip-${project.id})`}>
                  {/* =================================================
                      HEADER
                      NUMBER → TITLE
                  ================================================= */}

                  {/* NUMBER */}

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

                  {/* =================================================
                      IMAGE
                  ================================================= */}

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

                  {/* =================================================
                      IMAGE DARK OVERLAY
                  ================================================= */}

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

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <text
                    x={project.contentX + 100}
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

                {/* =================================================
                    ACTIVE BORDER
                    دقیقاً همان شکل سلول
                ================================================= */}

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

              {/* =================================================
                  REAL HIT AREA
                  خود سلول، نه مستطیل
              ================================================= */}

              <path
                d={project.cellPath}
                fill="transparent"
                pointerEvents="all"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              />
            </g>
          );
        })}

        {/* =====================================================
            DIVISION LINES
        ====================================================== */}

        <line
          x1="827"
          y1="1902.47"
          x2="827"
          y2="2329.15"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          pointerEvents="none"
        />

        <line
          x1="972"
          y1="1902.47"
          x2="972"
          y2="2329.15"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          pointerEvents="none"
        />

        {/* =====================================================
            OUTER FIELD BORDER
        ====================================================== */}

        <polygon
          points={field}
          fill="none"
          stroke="rgba(255,255,255,0.48)"
          strokeWidth="1.2"
          pointerEvents="none"
        />
      </svg>

      {/* =====================================================
          PROJECT LABEL
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-[53%]
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
            max-w-[300px]
            text-md
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
