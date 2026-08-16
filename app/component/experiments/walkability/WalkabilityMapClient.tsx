"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TEHRAN_CENTER: [number, number] = [35.7219, 51.3347];

export const WalkabilityMapClient = () => {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-xl">
      <MapContainer
        center={TEHRAN_CENTER}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
