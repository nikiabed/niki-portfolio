export type Layer = "overview" | "services" | "buildings" | "green" | "streets";
export type MapFeature = {
  id: string;
  lat: number;
  lon: number;
  name: string;
  category: string;
  geometry: [number, number][];
};
export type CityData = {
  retrievedAt: string;
  source: string;
  mode: 'live' | 'snapshot';
  studyArea: { south: number; west: number; north: number; east: number };
  buildings: MapFeature[];
  streets: MapFeature[];
  green: MapFeature[];
  services: MapFeature[];
};
export const origin: [number, number] = [35.715, 51.405];
export function distanceMeters(lat: number, lon: number, center: [number, number] = origin) {
  const radians = Math.PI / 180;
  const a = Math.sin((lat - center[0]) * radians / 2) ** 2 +
    Math.cos(center[0] * radians) * Math.cos(lat * radians) * Math.sin((lon - center[1]) * radians / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


export type StudyArea = CityData["studyArea"];

// Cover the largest walking circle (15 minutes at 80 m/min), with a small margin.
export function areaAround(center: [number, number]): StudyArea {
  const latDelta = 1250 / 111195;
  const lonDelta = latDelta / Math.cos(center[0] * Math.PI / 180);
  return { south: Math.max(-90, center[0] - latDelta), north: Math.min(90, center[0] + latDelta), west: center[1] - lonDelta, east: center[1] + lonDelta };
}

export function osmBounds(area: StudyArea): StudyArea[] {
  if (area.west < -180) return [{ ...area, west: area.west + 360, east: 180 }, { ...area, west: -180 }];
  if (area.east > 180) return [{ ...area, east: 180 }, { ...area, west: -180, east: area.east - 360 }];
  return [area];
}

export function normalizeLongitude(lon: number) {
  return ((lon + 180) % 360 + 360) % 360 - 180;
}
