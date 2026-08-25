export type Street = {
  id: number;
  x?: number;
  y?: number;
  width: number;
  direction: "horizontal" | "vertical";
};

export type Block = {
  id: number;
  points: string;
};

export type UrbanLayout = {
  streets: Street[];
  blocks: Block[];
};

function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateUrbanBlock(seed: number): UrbanLayout {
  const site = {
    left: 80,
    right: 780,
    top: 80,
    bottom: 420,
  };

  /*
    STREET GENERATION
  */

  const verticalStreetX = 300 + random(seed) * 180;

  const horizontalStreetY = 220 + random(seed + 10) * 100;

  const streetWidth = 18;

  const streets: Street[] = [
    {
      id: 1,
      direction: "vertical",
      x: verticalStreetX,
      width: streetWidth,
    },

    {
      id: 2,
      direction: "horizontal",
      y: horizontalStreetY,
      width: streetWidth,
    },
  ];

  /*
    BLOCK GENERATION
  */

  const sx = verticalStreetX;
  const sy = horizontalStreetY;
  const sw = streetWidth;

  const blocks: Block[] = [
    {
      id: 1,
      points: `
        ${site.left},${site.top}
        ${sx - sw / 2},${site.top}
        ${sx - sw / 2},${sy - sw / 2}
        ${site.left},${sy - sw / 2}
      `,
    },

    {
      id: 2,
      points: `
        ${sx + sw / 2},${site.top}
        ${site.right},${site.top}
        ${site.right},${sy - sw / 2}
        ${sx + sw / 2},${sy - sw / 2}
      `,
    },

    {
      id: 3,
      points: `
        ${site.left},${sy + sw / 2}
        ${sx - sw / 2},${sy + sw / 2}
        ${sx - sw / 2},${site.bottom}
        ${site.left},${site.bottom}
      `,
    },

    {
      id: 4,
      points: `
        ${sx + sw / 2},${sy + sw / 2}
        ${site.right},${sy + sw / 2}
        ${site.right},${site.bottom}
        ${sx + sw / 2},${site.bottom}
      `,
    },
  ];

  return {
    streets,
    blocks,
  };
}
