"use client";

export const MomentumlySection = () => {
  return (
    <div
      className="
        absolute
        left-[54.5%]
        top-[145%]
        z-[20]
        h-[800px]
        w-full
        -translate-x-1/2
        overflow-visible
      "
    >
      {/* =====================================================
          MOMENTUMLY FIELD
      ====================================================== */}

      <div
        className="
          group/momentumly
          absolute
          left-[50%]
          top-[55%]
          z-[30]
          h-[clamp(140px,21vw,310px)]
          w-[clamp(140px,21vw,310px)]
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
        "
      >
        {/* =================================================
            DIAMOND
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            rounded-[clamp(2rem,4vw,5rem)]
            border
            border-[#e46a63]/70
            bg-[#7d9be8]/[0.12]
          "
        >
          <div
            className="
              absolute
              inset-[clamp(2rem,5vw,5rem)]
              rounded-[clamp(1.5rem,3vw,4rem)]
              border
              border-[#e46a63]/20
              bg-[#7d9be8]/[0.08]
            "
          />
        </div>

        {/* =================================================
            HOVER PREVIEW
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-[70%]
            top-[150%]
            z-[100]
            w-[clamp(320px,34vw,520px)]
            -translate-y-1/2
            -rotate-45
            translate-x-10
            opacity-0
            scale-[0.94]

            transition-all
            duration-500
            ease-out

            group-hover/momentumly:translate-x-0
            group-hover/momentumly:opacity-100
            group-hover/momentumly:scale-100
          "
        >
          {/* OUTER FRAME */}

          <div
            className="
              relative
              rounded-2xl
              border
              border-white/20
              bg-[#111111]
              p-2
              shadow-[0_30px_100px_rgba(0,0,0,0.65)]
            "
          >
            {/* INNER FRAME */}

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-[#e46a63]/30
                bg-[#181818]
              "
            >
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-video
                  w-full
                  overflow-hidden
                  bg-[#202020]
                "
              >
                <img
                  src="/projects/momentumly.png"
                  alt="Momentumly project preview"
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-700
                    group-hover/momentumly:scale-[1.02]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/40
                    via-transparent
                    to-transparent
                  "
                />

             
              </div>

              {/* PROJECT INFO */}

              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[#e46a63]
                    "
                  >
                    01 — Product / Frontend
                  </p>

                  <span className="text-xs text-white/30">↗</span>
                </div>

                <h3
                  className="
                    mt-2
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                    text-white
                  "
                >
                  Momentumly
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[380px]
                    text-xs
                    leading-relaxed
                    text-white/45
                  "
                >
                  A task management experience designed to make starting easier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PROJECT INFO — TOP RIGHT
      ====================================================== */}

      <div
        className="
          absolute
          right-[clamp(6%,9vw,14%)]
          top-[clamp(10%,11vw,16%)]
          z-[50]
          w-[clamp(240px,22vw,360px)]
        "
      >
        <p
          className="
            mb-5
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white/40
          "
        >
          01 — PRODUCT / FRONTEND
        </p>

        <h2
          className="
            text-[clamp(2rem,4vw,4rem)]
            font-medium
            leading-[0.95]
            tracking-[-0.05em]
            text-white
          "
        >
          Momentumly
        </h2>

        <p
          className="
            mt-6
            max-w-[320px]
            text-[clamp(0.9rem,1.2vw,1.1rem)]
            leading-relaxed
            text-white/45
          "
        >
          A task management experience designed to make starting easier.
        </p>
      </div>

      {/* =====================================================
          CENTER POINT
      ====================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[55%]
          z-[40]
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#e46a63]
          shadow-[0_0_25px_rgba(228,106,99,0.45)]
        "
      />
    </div>
  );
};
