"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full rounded-xl bg-neutral-100 flex items-center justify-center">
        Loading map...
      </div>
    ),
  },
);

export const WalkabilityMapClient = () => {
  return <LeafletMap />;
};
