/* ============================================================
   STREET VIEW WALKABILITY — DATA
   ============================================================
   Source: Neshan 360 panoramas along Valiasr Street, split into
   two facing perspective views ("A" and "B", roughly opposite
   directions). A Segformer model (ADE20K, fine-tuned) reads each
   view's pixels into the seven walkability indicators used in
   the thesis. Only this one point has been segmented so far —
   the low-quality raw-only captures from the first test batch
   were dropped until more points are actually segmented.
============================================================ */

export type StreetViewGroupKey =
  | "vegetation"
  | "sidewalk"
  | "sky"
  | "building"
  | "wall_fence"
  | "road"
  | "vehicles"
  | "other";

export interface GroupBreakdown {
  key: StreetViewGroupKey;
  label: string;
  color: string;
  percent: number;
}

export interface StreetViewImage {
  label: string;
  image: string;
  overlay?: string;
  groups?: GroupBreakdown[];
}

export interface StreetViewPoint {
  id: string;
  label: string;
  hasSegmentation: boolean;
  viewA: StreetViewImage;
  viewB: StreetViewImage;
}

const GROUP_META: Record<
  StreetViewGroupKey,
  { label: string; color: string }
> = {
  other: { label: "Other", color: "#464646" },
  vegetation: { label: "Vegetation", color: "#23aa46" },
  sidewalk: { label: "Sidewalk", color: "#f0aa50" },
  sky: { label: "Sky", color: "#4696f5" },
  building: { label: "Building", color: "#be5ab4" },
  wall_fence: { label: "Wall / fence", color: "#967350" },
  road: { label: "Road", color: "#73737d" },
  vehicles: { label: "Vehicles", color: "#e13737" },
};

const buildGroups = (
  percents: Record<StreetViewGroupKey, number>,
): GroupBreakdown[] =>
  (Object.keys(GROUP_META) as StreetViewGroupKey[])
    .filter((key) => key !== "other")
    .map((key) => ({
      key,
      label: GROUP_META[key].label,
      color: GROUP_META[key].color,
      percent: percents[key] ?? 0,
    }));

/* Real output from semantic_segmentation.py, sample_6 */

const POINT_6_A_GROUPS = buildGroups({
  other: 0.0348,
  vegetation: 11.5809,
  sidewalk: 8.0001,
  sky: 33.5926,
  building: 12.0349,
  wall_fence: 0.001,
  road: 28.7736,
  vehicles: 5.9821,
});

const POINT_6_B_GROUPS = buildGroups({
  other: 0.515,
  vegetation: 22.5135,
  sidewalk: 13.2927,
  sky: 18.9208,
  building: 14.0615,
  wall_fence: 0,
  road: 30.0878,
  vehicles: 0.6087,
});

export const STREET_VIEW_POINTS: StreetViewPoint[] = [
  {
    id: "point-6",
    label: "Point 6",
    hasSegmentation: true,
    viewA: {
      label: "Facing A",
      image: "/streetview/point-6-a.jpg",
      overlay: "/streetview/point-6-a-overlay.jpg",
      groups: POINT_6_A_GROUPS,
    },
    viewB: {
      label: "Facing B (opposite)",
      image: "/streetview/point-6-b.jpg",
      overlay: "/streetview/point-6-b-overlay.jpg",
      groups: POINT_6_B_GROUPS,
    },
  },
];
