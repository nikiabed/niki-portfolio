"use client";

import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

import { POI_CONFIG } from "./poiIcons";
import type { POICategory, WalkingTime } from "./WalkabilityMapClient";

const TEHRAN_CENTER: [number, number] = [35.7219, 51.3347];

interface LeafletMapProps {
  walkingTime: WalkingTime;
  selectedLocation: [number, number] | null;
  onLocationSelect: (location: [number, number]) => void;
  selectedCategories: POICategory[];
}

interface POI {
  id: string;
  category: POICategory;
  name: string;
  position: [number, number];
}

const POI_LABELS: Record<POICategory, string> = {
  park: "Park",
  cafe: "Café",
  restaurant: "Restaurant",
  pharmacy: "Pharmacy",
  school: "School",
  grocery: "Grocery",
};

const createPOIIcon = (category: POICategory) => {
  const config = POI_CONFIG[category];

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 1.5px solid #171717;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.16);
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#171717"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          ${config.svg}
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (location: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export const LeafletMap = ({
  walkingTime,
  selectedLocation,
  onLocationSelect,
  selectedCategories,
}: LeafletMapProps) => {
  const [isochrone, setIsochrone] = useState<any>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [loadingIsochrone, setLoadingIsochrone] = useState(false);
  const [loadingPois, setLoadingPois] = useState(false);

  // ============================================================
  // ISOCHRONE
  // ============================================================

  useEffect(() => {
    if (!selectedLocation) {
      setIsochrone(null);
      setPois([]);
      return;
    }

    const [latitude, longitude] = selectedLocation;

    const fetchIsochrone = async () => {
      try {
        setLoadingIsochrone(true);

        const response = await fetch("/api/isochrone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude,
            longitude,
            minutes: walkingTime,
          }),
        });

        const text = await response.text();

        if (!response.ok) {
          console.error("ISOCHRONE STATUS:", response.status);
          console.error("ISOCHRONE RESPONSE:", text);

          throw new Error(`Failed to fetch isochrone (${response.status})`);
        }

        const data = JSON.parse(text);

        setIsochrone(data);
      } catch (error) {
        console.error("Isochrone error:", error);
        setIsochrone(null);
        setPois([]);
      } finally {
        setLoadingIsochrone(false);
      }
    };

    fetchIsochrone();
  }, [selectedLocation, walkingTime]);

  // ============================================================
  // POIS
  // ============================================================

  useEffect(() => {
    if (!isochrone || !selectedLocation) {
      setPois([]);
      return;
    }

    if (selectedCategories.length === 0) {
      setPois([]);
      return;
    }

    const polygon = isochrone.features?.[0]?.geometry;

    if (!polygon || polygon.type !== "Polygon") {
      console.warn("No valid polygon found in isochrone response.");
      setPois([]);
      return;
    }

    const [latitude, longitude] = selectedLocation;

    const fetchPois = async () => {
      try {
        setLoadingPois(true);

        const response = await fetch("/api/pois", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            polygon,
            latitude,
            longitude,
            minutes: walkingTime,
            categories: selectedCategories,
          }),
        });

        const text = await response.text();

        console.log("POI STATUS:", response.status);
        console.log("POI RAW RESPONSE:", text);

        if (!response.ok) {
          throw new Error(`Failed to fetch POIs (${response.status}): ${text}`);
        }

        const data = JSON.parse(text);

        console.log("POI DATA:", data);

        setPois(Array.isArray(data.features) ? data.features : []);
      } catch (error) {
        console.error("POI error:", error);
        setPois([]);
      } finally {
        setLoadingPois(false);
      }
    };

    fetchPois();
  }, [isochrone, selectedLocation, walkingTime, selectedCategories]);

  // ============================================================
  // FILTER VISIBLE POIS
  // ============================================================

  const visiblePois = pois.filter((poi) =>
    selectedCategories.includes(poi.category),
  );

  const loading = loadingIsochrone || loadingPois;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={TEHRAN_CENTER}
        zoom={14}
        scrollWheelZoom
        className="h-full min-h-[100vh] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />

        {selectedLocation && <Marker position={selectedLocation} />}

        {isochrone && (
          <GeoJSON
            key={`${selectedLocation?.join("-")}-${walkingTime}`}
            data={isochrone}
            style={{
              fillOpacity: 0.2,
              weight: 2,
            }}
          />
        )}

        {visiblePois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.position}
            icon={createPOIIcon(poi.category)}
          >
            <Popup>
              <div>
                <strong>{poi.name}</strong>

                <div className="mt-1 text-xs text-neutral-500">
                  {POI_LABELS[poi.category]}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {loading && (
        <div className="absolute left-4 top-4 z-[1000] rounded-lg bg-white px-3 py-2 text-sm shadow-md">
          {loadingIsochrone
            ? "Calculating walking area..."
            : "Finding nearby places..."}
        </div>
      )}
    </div>
  );
};
