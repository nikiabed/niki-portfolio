"use client";

import dynamic from "next/dynamic";

const Map = dynamic(
  () =>
    import("./WalkabilityMapClient").then(
      (module) => module.WalkabilityMapClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full rounded-xl bg-neutral-100 flex items-center justify-center">
        Loading map...
      </div>
    ),
  },
);

export const WalkabilityMap = () => {
  return <Map />;
};
