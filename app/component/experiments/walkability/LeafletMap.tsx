"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMapEvents,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import { POI_CONFIG } from "./poiIcons";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import type { WalkingTime, POICategory } from "./WalkabilityMapClient";

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

const POI_ICONS: Record<POICategory, string> = {
  park: "🌳",
  cafe: "☕",
  restaurant: "🍽️",
  pharmacy: "💊",
  school: "🏫",
  grocery: "🛒",
};

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedLocation) {
      setIsochrone(null);
      setPois([]);
      return;
    }

    const fetchIsochrone = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/isochrone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: selectedLocation[0],
            longitude: selectedLocation[1],
            minutes: walkingTime,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch isochrone");
        }

        const data = await response.json();

        setIsochrone(data);
      } catch (error) {
        console.error("Isochrone error:", error);
        setIsochrone(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIsochrone();
  }, [selectedLocation, walkingTime]);

  useEffect(() => {
    if (!isochrone) {
      setPois([]);
      return;
    }

    const polygon = isochrone.features?.[0]?.geometry;

    if (!polygon || polygon.type !== "Polygon") {
      return;
    }

    const fetchPois = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/pois", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            polygon,
            latitude: selectedLocation[0],
            longitude: selectedLocation[1],
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

        setPois(data.features ?? []);
      } catch (error) {
        console.error("POI error:", error);
        setPois([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPois();
  }, [isochrone, selectedLocation, walkingTime, selectedCategories]);

  const visiblePois = pois.filter((poi) =>
    selectedCategories.includes(poi.category),
  );

  return (
    <div className="relative  h-full w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={TEHRAN_CENTER}
        zoom={14}
        scrollWheelZoom
        className="h-full w-full"
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
          Finding nearby places...
        </div>
      )}
    </div>
  );
};
