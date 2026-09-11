"use client";

import dynamic from "next/dynamic";

import type {
  POICategory,
  WalkingTime,
} from "./WalkabilityMapClient";

interface Props {
  walkingTime: WalkingTime;
  selectedLocation: [number, number] | null;
  onLocationSelect: (location: [number, number]) => void;
  selectedCategories: POICategory[];
}

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-neutral-100">
        Loading map...
      </div>
    ),
  },
);

export const LeafletMapWrapper = (props: Props) => {
  return <LeafletMap {...props} />;
};