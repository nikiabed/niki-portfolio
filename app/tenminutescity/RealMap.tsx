"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Layer = "landuse" | "services" | "density" | "green" | "buildings";

type OSMData = {
  studyArea: {
    south: number;
    west: number;
    north: number;
    east: number;
  };

  counts: {
    buildings: number;
    streets: number;
    green: number;
    services: number;
  };

  buildings: any[];
  streets: any[];
  green: any[];
  services: any[];
};

function MapView({ studyArea }: { studyArea: OSMData["studyArea"] }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([
      [studyArea.south, studyArea.west],
      [studyArea.north, studyArea.east],
    ]);
  }, [map, studyArea]);

  return null;
}

export default function RealMap({ activeLayer }: { activeLayer: Layer }) {
  const [data, setData] = useState<OSMData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/tenminutescity");

        if (!response.ok) {
          throw new Error("Failed to fetch OSM data");
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error("OSM MAP ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#151515]">
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">
          LOADING REAL-WORLD DATA...
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#151515]">
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">
          OSM DATA UNAVAILABLE
        </span>
      </div>
    );
  }

  const center: [number, number] = [
    (data.studyArea.south + data.studyArea.north) / 2,
    (data.studyArea.west + data.studyArea.east) / 2,
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <MapContainer
        center={center}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        <MapView studyArea={data.studyArea} />

        {/* =====================================================
            BUILDINGS
        ===================================================== */}

        {activeLayer === "buildings" &&
          data.buildings.map((building) => {
            if (!building.lat || !building.lon) return null;

            return (
              <CircleMarker
                key={`building-${building.id}`}
                center={[building.lat, building.lon]}
                radius={2}
                pathOptions={{
                  fillOpacity: 0.35,
                  opacity: 0.25,
                  weight: 0,
                }}
              />
            );
          })}

        {/* =====================================================
            SERVICES
        ===================================================== */}

        {activeLayer === "services" &&
          data.services.map((service) => {
            if (!service.lat || !service.lon) return null;

            return (
              <CircleMarker
                key={`service-${service.id}`}
                center={[service.lat, service.lon]}
                radius={4}
                pathOptions={{
                  fillOpacity: 0.75,
                  opacity: 0.5,
                  weight: 1,
                }}
              />
            );
          })}

        {/* =====================================================
            GREEN
        ===================================================== */}

        {activeLayer === "green" &&
          data.green.map((item) => {
            if (!item.lat || !item.lon) return null;

            return (
              <CircleMarker
                key={`green-${item.id}`}
                center={[item.lat, item.lon]}
                radius={10}
                pathOptions={{
                  fillOpacity: 0.22,
                  opacity: 0.45,
                  weight: 1,
                }}
              />
            );
          })}

        {/* =====================================================
            DENSITY
        ===================================================== */}

        {activeLayer === "density" &&
          data.buildings.map((building) => {
            if (!building.lat || !building.lon) return null;

            return (
              <CircleMarker
                key={`density-${building.id}`}
                center={[building.lat, building.lon]}
                radius={3}
                pathOptions={{
                  fillOpacity: 0.5,
                  opacity: 0.25,
                  weight: 0,
                }}
              />
            );
          })}

        {/* =====================================================
            LAND USE / STREET STRUCTURE
        ===================================================== */}

        {activeLayer === "landuse" &&
          data.streets.map((street) => {
            if (!street.lat || !street.lon) return null;

            return (
              <CircleMarker
                key={`street-${street.id}`}
                center={[street.lat, street.lon]}
                radius={1.5}
                pathOptions={{
                  fillOpacity: 0.35,
                  opacity: 0.25,
                  weight: 0,
                }}
              />
            );
          })}
      </MapContainer>

      {/* =====================================================
          DATA COUNTER
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-5 right-5 z-[1000]">
        <div className="border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm">
          <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/30">
            LIVE DATASET
          </p>

          <p className="mt-1 font-mono text-[8px] text-white/45">
            {data.counts.buildings.toLocaleString()} buildings
          </p>

          <p className="font-mono text-[8px] text-white/45">
            {data.counts.services.toLocaleString()} services
          </p>

          <p className="font-mono text-[8px] text-white/45">
            {data.counts.green.toLocaleString()} green areas
          </p>
        </div>
      </div>

      {/* =====================================================
          VIGNETTE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[900] bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
