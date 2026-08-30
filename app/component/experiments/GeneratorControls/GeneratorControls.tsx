"use client";

type GeneratorControlsProps = {
  density: number;
  openSpace: number;
  parcelCount: number;

  onDensityChange: (value: number) => void;
  onOpenSpaceChange: (value: number) => void;
  onParcelCountChange: (value: number) => void;

  onGenerate: () => void;
};

export function GeneratorControls({
  density,
  openSpace,
  parcelCount,
  onDensityChange,
  onOpenSpaceChange,
  onParcelCountChange,
  onGenerate,
}: GeneratorControlsProps) {
  return (
    <div className="w-full max-w-[260px]">
      {/* HEADER */}

      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] text-white/30">GENERATOR</p>

        <p className="mt-3 text-sm leading-relaxed text-white/40">
          Adjust the urban conditions and generate a new configuration.
        </p>
      </div>

      {/* CONTROLS */}

      <div className="space-y-7">
        {/* DENSITY */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-white/35">
              DENSITY
            </span>

            <span className="font-mono text-[10px] text-white/45">
              {density}%
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="90"
            value={density}
            onChange={(e) => onDensityChange(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        {/* OPEN SPACE */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-white/35">
              OPEN SPACE
            </span>

            <span className="font-mono text-[10px] text-white/45">
              {openSpace}%
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="40"
            value={openSpace}
            onChange={(e) => onOpenSpaceChange(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        {/* PARCELS */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-white/35">
              PARCELS
            </span>

            <span className="font-mono text-[10px] text-white/45">
              {parcelCount}
            </span>
          </div>

          <input
            type="range"
            min="6"
            max="24"
            step="1"
            value={parcelCount}
            onChange={(e) => onParcelCountChange(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>
      </div>

      {/* GENERATE */}

      <button
        onClick={onGenerate}
        className="
          mt-9
          w-full
          rounded-full
          border
          border-white/20
          px-5
          py-3
          text-[10px]
          tracking-[0.25em]
          text-white/60
          transition-all
          duration-300
          hover:border-white/40
          hover:bg-white/10
          hover:text-white/90
        "
      >
        GENERATE NEW CITY
      </button>
    </div>
  );
}
