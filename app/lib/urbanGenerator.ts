type Parcel = {
  id: number;
  points: string;
  type: "building" | "green" | "public";
};

export function generateUrbanBlock(seed: number): Parcel[] {
  const site = [
    [150, 80],
    [720, 80],
    [780, 150],
    [780, 420],
    [120, 420],
    [80, 330],
  ];

  const cols = 5;
  const rows = 4;

  const left = 80;
  const right = 780;
  const top = 80;
  const bottom = 420;

  const cellW = (right - left) / cols;
  const cellH = (bottom - top) / rows;

  const parcels: Parcel[] = [];

  let id = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x1 = left + col * cellW;
      const x2 = left + (col + 1) * cellW;

      const y1 = top + row * cellH;
      const y2 = top + (row + 1) * cellH;

      parcels.push({
        id: id++,

        points: `
          ${x1},${y1}
          ${x2},${y1}
          ${x2},${y2}
          ${x1},${y2}
        `,

        type: id % 7 === 0 ? "green" : id % 9 === 0 ? "public" : "building",
      });
    }
  }

  return parcels;
}
