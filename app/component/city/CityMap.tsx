"use client";

import { useEffect, useState } from "react";
import { MomentumlySection } from "./MomentumlySection";

export const CityMap = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  const blockSizes = {
    sm: "h-[clamp(3rem,4vw,4rem)] w-[clamp(4rem,5.5vw,5.5rem)]",

    md: "h-[clamp(4rem,5vw,5rem)] w-[clamp(5.5rem,7vw,7rem)]",

    lg: "h-[clamp(5rem,6vw,6.5rem)] w-[clamp(7rem,9vw,9rem)]",
  };
  type MapBlockProps = {
    size?: "sm" | "md" | "lg";
    className?: string;
    delay?: string;
    href?: string;
    children?: React.ReactNode;
  };

  const MapBlock = ({
    size,
    className = "",
    delay = "",
    href,
    children,
  }: MapBlockProps) => {
    const classes = `
    group
    relative

    ${size ? blockSizes[size] : ""}

    border
    bg-white/[0.02]

    transition-all
    duration-500
    ease-out

    ${delay}

    ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}

    ${href ? "cursor-pointer hover:-translate-y-2 hover:scale-[1.04]" : ""}

    ${className}
  `;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return <div className={classes}>{children}</div>;
  };

  return (
    <main className="relative w-full bg-[#1b1b1b] text-[#f1f1ed]">
      <section className="relative min-h-[4900px] w-full overflow-hidden bg-[#1e1e1e]">
        <img
          src="/maps/Asset 6.svg"
          alt=""
          className={` absolute left-0 top-0 h-auto w-full  transition-all duration-[1800ms] ease-out
    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-[1.015]"}`}
        />

        {/* content روی نقشه */}
        <div
          className="
    absolute
    left-0
    top-0
    z-10
    w-full
  "
        >
          <p
            className={`
    ml-[5%] mt-[2%]
    text-2xl uppercase tracking-[0.28em] text-white/50
    transition-all duration-[1200ms] ease-out
    ${visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
  `}
          >
            Niki Abedzadeh
          </p>
          <h1 className="mt-[5%] ml-[5%] space-y-2 text-6xl font-semibold tracking-[-0.06em]">
            <p
              className={`
      transition-all duration-700 ease-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
    `}
            >
              <span style={{ color: "var(--design)" }}>Design</span>
            </p>

            <p
              className={`
      transition-all delay-150 duration-700 ease-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
    `}
            >
              <span style={{ color: "var(--research)" }}>Research</span>
            </p>

            <p
              className={`
      transition-all delay-300 duration-700 ease-out
      ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}
    `}
            >
              <span style={{ color: "var(--develop)" }}>Develop</span>
            </p>
          </h1>
          <h2
            className={`
    ml-[40%] mt-[8%]
    max-w-[850px]
    text-7xl font-light text-white/70
    transition-all duration-[1400ms] ease-out
    ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
  `}
          >
            Exploring cities through design, data & technology.
          </h2>

          <div
            className="
    absolute
    left-[clamp(36%,24vw,34%)]
    top-[clamp(38%,44vw,50%)]
    z-[5]
    w-[clamp(680px,90vw,1300px)]
    -translate-x-1/2
  "
          >
            <div className="flex justify-end gap-[clamp(0.75rem,1.4vw,1.5rem)]">
              {/* LEFT CLUSTER */}
              <div className="flex justify-end gap-[clamp(0.5rem,0.8vw,0.75rem)]">
                <MapBlock
                  size="md"
                  className="
          h-[clamp(3rem,5vw,5rem)]
          w-[clamp(4.5rem,7vw,7rem)]
          border-white/10
        "
                />

                <MapBlock
                  size="sm"
                  href="#about"
                  delay="delay-100"
                  className="
          h-[clamp(4.5rem,7vw,7.5rem)]
          w-[clamp(3.5rem,5vw,5rem)]
                    border-white/30
                      hover:bg-white/5
          hover:shadow-[0_0_35px_rgba(225,225,225,0.05)]

        "
                >
                  <span
                    className="
        absolute bottom-2 left-3
        text-[9px] uppercase tracking-[0.2em]
        text-white/0
        transition-all duration-300
        group-hover:text-white/40
      "
                  >
                    about →
                  </span>
                </MapBlock>
              </div>

              {/* RIGHT CLUSTER */}
              <div className="flex justify-end gap-[clamp(0.5rem,0.8vw,0.75rem)]">
                <MapBlock
                  size="sm"
                  className="
          h-[clamp(3rem,5vw,5rem)]
          w-[clamp(3.5rem,5vw,5rem)]
          border-white/10
        "
                />

                <MapBlock
                  size="md"
                  href="#projects"
                  delay="delay-150"
                  className="
          h-[clamp(4rem,6vw,6.5rem)]
          w-[clamp(4.5rem,7vw,7rem)]
          border-white/30
           hover:bg-white/5
          hover:shadow-[0_0_35px_rgba(225,225,225,0.05)]
        "
                >
                  <span
                    className="
        absolute bottom-2 left-3
        text-[9px] uppercase tracking-[0.2em]
        text-white/0
        transition-all duration-300
        group-hover:text-white/40
       
      "
                  >
                    Projects →
                  </span>
                </MapBlock>

                <MapBlock
                  size="md"
                  className="
          h-[clamp(3rem,5vw,5rem)]
          w-[clamp(4.5rem,7vw,7rem)]
          border-white/10
        "
                />

                <MapBlock
                  size="sm"
                  className="
          h-[clamp(4rem,5.5vw,5.5rem)]
          w-[clamp(2.5rem,3.5vw,4rem)]
          border-white/10
        "
                />

                <MapBlock
                  size="sm"
                  className="
          h-[clamp(4.5rem,7vw,7rem)]
          w-[clamp(3rem,7vw,7rem)]
          border-white/10
        "
                />
              </div>
            </div>
          </div>
          <div className="absolute left-[46%] top-[25%] z-[5] w-[90%] -translate-x-1/2">
            <div className="flex justify-end gap-8">
              <div className="flex justify-end items-end gap-3">
                <MapBlock
                  href="#design"
                  className="
          h-20 w-28
          items-end
          border-[#e46a63]/30
          bg-[#e46a63]/[0.04]

          hover:border-[#e46a63]
          hover:bg-[#e46a63]/15
          hover:shadow-[0_0_35px_rgba(228,106,99,0.15)]
        "
                >
                  <span
                    className="
            absolute bottom-2 left-3
            text-[9px] uppercase tracking-[0.2em]
            text-[#e46a63]/0
            transition-all duration-300
            group-hover:text-[#e46a63]
          "
                  >
                    Design →
                  </span>
                </MapBlock>

                <MapBlock
                  className="
          h-30 w-20
          border-white/10
          bg-white/[0.02]
        "
                />

                <MapBlock
                  className="
          h-20 w-28
          border-white/10
          bg-white/[0.02]
        "
                />

                <MapBlock
                  href="#develop"
                  className="
          h-30 w-[72px]
          items-end
          border-[#7fc6a4]/30
          bg-[#7fc6a4]/[0.04]

          hover:border-[#7fc6a4]
          hover:bg-[#7fc6a4]/15
          hover:shadow-[0_0_35px_rgba(127,198,164,0.15)]
        "
                >
                  <span
                    className="
            absolute bottom-2 left-2
            text-[8px] uppercase tracking-[0.15em]
            text-[#7fc6a4]/0
            transition-all duration-300
            group-hover:text-[#7fc6a4]
          "
                  >
                    Research →
                  </span>
                </MapBlock>
              </div>

              <div className="flex justify-end items-end gap-3">
                <MapBlock
                  className="
          h-20 w-30
          border-white/10
          bg-white/[0.02]
        "
                />

                <MapBlock
                  href="#research"
                  className="
          h-[120px] w-[100px]
          items-end
          border-[#7d9be8]/30
          bg-[#7d9be8]/[0.04]

          hover:border-[#7d9be8]
          hover:bg-[#7d9be8]/15
          hover:shadow-[0_0_35px_rgba(125,155,232,0.15)]
        "
                >
                  <span
                    className="
            absolute bottom-2 left-3
            text-[9px] uppercase tracking-[0.2em]
            text-[#7d9be8]/0
            transition-all duration-300
            group-hover:text-[#7d9be8]
          "
                  >
                    Develop →
                  </span>
                </MapBlock>

                <MapBlock
                  className="
          h-20 w-30
          border-white/10
          bg-white/[0.02]
        "
                />

                <MapBlock
                  className="
          h-25 w-25
          border-white/10
          bg-white/[0.02]
        "
                />
              </div>
            </div>
          </div>


      <MomentumlySection />
        </div>
      </section>

    </main>
  );
};
