"use client";

type CityBlockProps = {
  width: string;
  height: string;
  variant?: "default" | "red" | "green" | "blue";
  rounded?: boolean;
};

const CityBlock = ({
  width,
  height,
  variant = "default",
  rounded = false,
}: CityBlockProps) => {
  const variants = {
    default: `
      border-white/[0.045]
      bg-white/[0.012]
      hover:border-white/15
      hover:bg-white/[0.025]
    `,

    red: `
      city-block-red
      border-[#e46a63]/[0.09]
      bg-[#e46a63]/[0.012]
      hover:border-[#e46a63]/30
      hover:bg-[#e46a63]/[0.04]
      city-block
    `,

    green: `
      city-block-green
      border-[#79a47b]/[0.08]
      bg-[#79a47b]/[0.012]
      hover:border-[#79a47b]/30
      hover:bg-[#79a47b]/[0.04]
            city-block

    `,

    blue: `
      city-block-blue
      border-[#6587e8]/[0.09]
      bg-[#6587e8]/[0.012]
      hover:border-[#6587e8]/30
      hover:bg-[#6587e8]/[0.04]
            city-block

    `,
  };

  return (
    <div
      className={`
        min-w-0
        border
        transition-all
        duration-500
        hover:-translate-y-2

        ${width}
        ${height}
        ${variants[variant]}

        ${rounded ? "rounded-[10px]" : ""}
      `}
    />
  );
};

const blocks: CityBlockProps[] = [
  {
    width: "w-full",
    height: "h-[clamp(48px,5vw,72px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(65px,6.5vw,92px)]",
    variant: "red",
  },

  {
    width: "w-full",
    height: "h-[clamp(52px,5.5vw,78px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(72px,7vw,105px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(60px,6vw,88px)]",
    variant: "green",
  },

  {
    width: "w-full",
    height: "h-[clamp(48px,5vw,70px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(78px,7.5vw,110px)]",
    variant: "blue",
    rounded: true,
  },

  {
    width: "w-full",
    height: "h-[clamp(52px,5vw,75px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(70px,7vw,100px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(58px,6vw,85px)]",
    variant: "red",
  },

  {
    width: "w-full",
    height: "h-[clamp(45px,4.5vw,65px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(82px,8vw,115px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(55px,5.5vw,80px)]",
    variant: "green",
  },

  {
    width: "w-full",
    height: "h-[clamp(68px,6.5vw,95px)]",
  },

  {
    width: "w-full",
    height: "h-[clamp(60px,6vw,88px)]",
    variant: "blue",
    rounded: true,
  },

  {
    width: "w-full",
    height: "h-[clamp(75px,7vw,105px)]",
    variant: "red",
  },
];

export const FooterSection = () => {
  return (
    <footer
      id="footer"
      className="
        pointer-events-none
        absolute
        bottom-0
        left-0
        z-[25]
        w-full
        bg-[#181A1B]
        text-[#f1f1ed]
      "
    >
      {/* =====================================================
          TOP BORDER
      ====================================================== */}

      <div className="h-px w-full bg-white/15" />

      {/* =====================================================
          CITY BLOCKS

          فقط FLEX
          بدون absolute
          بدون left/top
          همه از بالا شروع می‌شوند
      ====================================================== */}

      <div
        className="
    mx-auto
    grid
    min-h-[180px]
    w-[90%]
    max-w-[1400px]
    grid-cols-8
    items-start
    gap-[clamp(5px,0.8vw,12px)]
    pt-[clamp(20px,2vw,28px)]

    sm:grid-cols-10
    md:grid-cols-12
    lg:grid-cols-16
  "
      >
        {blocks.map((block, index) => (
          <CityBlock key={index} {...block} />
        ))}
      </div>

      <div
        className="
          pointer-events-auto
          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto
            grid
            w-[90%]
            max-w-[1400px]
            grid-cols-1
            gap-8
            py-8

            md:grid-cols-3
            md:items-start
            md:gap-10
            md:py-10
          "
        >
          <div>
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-white/35

                md:text-[13px]
              "
            >
              Niki Abedzadeh
            </p>

            <p
              className="
                mt-3
                max-w-[320px]
                text-[11px]
                leading-[1.7]
                text-white/35

                md:text-[12px]
              "
            >
              Design, research and development
              <br />
              across cities, data & technology.
            </p>
          </div>

          <div className="text-left md:text-center">
            <div
              className="
                flex
                items-center
                justify-start
                gap-2
                text-[9px]
                uppercase
                tracking-[0.22em]

                md:justify-center
                md:gap-3
                md:text-[11px]
                md:tracking-[0.28em]
              "
            >
              <span className="text-[#e46a63]">Design</span>

              <span className="text-white/15">·</span>

              <span className="text-[#7d9be8]">Research</span>

              <span className="text-white/15">·</span>

              <span className="text-[#7fc6a4]">Develop</span>
            </div>

            <p
              className="
                mt-4
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              © 2026
            </p>
          </div>

          <div
            className="
              flex
              flex-row
              gap-5

              md:flex-col
              md:items-end
              md:gap-3
            "
          >
            <a
              href="#"
              className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-white/35
                transition-all
                duration-300

                hover:-translate-x-1
                hover:text-[#e46a63]

                md:text-[11px]
                md:tracking-[0.2em]
              "
            >
              Back to top ↑
            </a>

            <a
              href="mailto:"
              className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-white/35
                transition-colors
                duration-300

                hover:text-[#7d9be8]

                md:text-[11px]
                md:tracking-[0.2em]
              "
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div
          className="
            mx-auto
            flex
            w-[90%]
            max-w-[1400px]
            flex-col
            gap-2
            py-4
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/20

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-0
            sm:py-5
            sm:text-[9px]
            sm:tracking-[0.25em]
          "
        >
          <span>Urban systems / digital spaces</span>

          <span>Tehran — 2026</span>
        </div>
      </div>
    </footer>
  );
};
