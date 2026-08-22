import type { POICategory } from "./WalkabilityMapClient";

export const POI_CONFIG: Record<
  POICategory,
  {
    label: string;
    svg: string;
  }
> = {
  park: {
    label: "Parks",
    svg: `
      <path d="M12 21V10" />
      <path d="M8 21h8" />
      <path d="M7 11a4 4 0 1 1 8 0" />
      <path d="M9 8a3 3 0 1 1 6 0" />
      <path d="M12 5a2 2 0 1 1 0 4" />
    `,
  },

  cafe: {
    label: "Cafés",
    svg: `
      <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M17 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M8 4v2" />
      <path d="M12 4v2" />
    `,
  },

  restaurant: {
    label: "Restaurants",
    svg: `
      <path d="M7 3v7" />
      <path d="M4 3v7a3 3 0 0 0 6 0V3" />
      <path d="M7 13v8" />
      <path d="M17 3v18" />
      <path d="M17 3c3 2 3 6 0 8" />
    `,
  },

  pharmacy: {
    label: "Pharmacies",
    svg: `
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    `,
  },

  school: {
    label: "Schools",
    svg: `
      <path d="m3 10 9-5 9 5-9 5Z" />
      <path d="M6 12v5" />
      <path d="M18 12v5" />
      <path d="M8 18h8" />
    `,
  },

  grocery: {
    label: "Grocery stores",
    svg: `
      <path d="M3 5h2l2 11h10l2-8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    `,
  },
};
