"use client";

import { useEffect, useRef, useState } from "react";
import { Circle, CircleMarker, MapContainer, Polygon, Polyline, Popup, ScaleControl, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { DomEvent } from "leaflet";
import type { CityData, Layer, MapFeature } from "./data";
import { distanceMeters, normalizeLongitude } from "./data";

import styles from "./RealMap.module.css";

function PickOrigin({ center, onCenterChange, selecting, setSelecting }: {
  center: [number, number]; onCenterChange: (center: [number, number]) => void;
  selecting: boolean; setSelecting: (value: boolean) => void;
}) {
  const map = useMap();
  const controls = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (controls.current) {
      DomEvent.disableClickPropagation(controls.current);
      DomEvent.disableScrollPropagation(controls.current);
    }
  }, []);
  const choose = (lat: number, lng: number) => {
    onCenterChange([Math.max(-85, Math.min(85, lat)), normalizeLongitude(lng)]);
    setSelecting(false);
  };
  useMapEvents({ click(event) { choose(event.latlng.lat, event.latlng.lng); } });
  useEffect(() => { map.setView(center, Math.max(map.getZoom(), 14)); }, [map, center]);
  return <div ref={controls} className="absolute right-3 top-3 z-[1000] flex flex-col items-end gap-2" onPointerDown={event => event.stopPropagation()} onDoubleClick={event => event.stopPropagation()} onClick={event => event.stopPropagation()}>
    <button aria-pressed={selecting} onClick={() => setSelecting(!selecting)} className="border border-white/20 bg-[#171b22] px-3 py-2 text-xs text-white shadow-lg">{selecting ? "Cancel selection" : "Choose location"}</button>
    <button onClick={() => { const point = map.getCenter(); choose(point.lat, point.lng); }} className="border border-white/20 bg-[#171b22] px-3 py-2 text-xs text-white shadow-lg">Analyze map center</button>
    {selecting && <span className="max-w-48 bg-[#171b22] px-3 py-2 text-xs text-white">Click anywhere to select your neighborhood.</span>}
  </div>;
}

export default function RealMap({ data, activeLayer, radius, center, onCenterChange }: {
  data: CityData | null; activeLayer: Layer; radius: number;
  center: [number, number]; onCenterChange: (center: [number, number]) => void;
}) {
  const [selecting, setSelecting] = useState(false);
  const show = (layer: Layer) => activeLayer === "overview" || activeLayer === layer;
  const popup = (feature: MapFeature) => <Popup><strong>{feature.name}</strong><br />{feature.category.replaceAll("_", " ")}<br />{Math.round(distanceMeters(feature.lat, feature.lon, center))} m from selected origin</Popup>;
  return (
    <MapContainer center={center} zoom={15} scrollWheelZoom className={`h-full w-full ${styles.map}`} style={{ background: "#181c20" }} worldCopyJump minZoom={2}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>' />
      <PickOrigin center={center} onCenterChange={onCenterChange} selecting={selecting} setSelecting={setSelecting} />
      <ScaleControl position="bottomleft" imperial={false} />

      {show("streets") && data?.streets.map(f => f.geometry.length > 1 && <Polyline key={f.id} positions={f.geometry} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: "#a6a39c", weight: 2, opacity: 0.5 }}>{popup(f)}</Polyline>)}
      {show("buildings") && data?.buildings.map(f => f.geometry.length > 2 && <Polygon key={f.id} positions={f.geometry} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: "#b8b5ae", weight: 0.5, fillOpacity: 0.25 }}>{popup(f)}</Polygon>)}
      {show("green") && data?.green.map(f => f.geometry.length > 2 ? <Polygon key={f.id} positions={f.geometry} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: "#7fc6a4", weight: 1, fillOpacity: 0.4 }}>{popup(f)}</Polygon> : <CircleMarker key={f.id} center={[f.lat, f.lon]} radius={7} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: "#7fc6a4" }}>{popup(f)}</CircleMarker>)}
      <Circle center={center} radius={radius} interactive={false} pathOptions={{ color: "#7d9be8", weight: 1.5, dashArray: "5 7", fillOpacity: 0.07 }} />
      {show("services") && data?.services.map(f => <CircleMarker key={f.id} center={[f.lat, f.lon]} radius={4} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: distanceMeters(f.lat, f.lon, center) <= radius ? "#7d9be8" : "#686d79", weight: 1, fillOpacity: 0.85 }}>{popup(f)}</CircleMarker>)}
      <CircleMarker center={center} radius={6} interactive={!selecting} bubblingMouseEvents={false} pathOptions={{ color: "#fff", fillColor: "#7d9be8", fillOpacity: 1, weight: 2 }}><Popup>Selected study origin · Click an empty map location anywhere to move it.</Popup></CircleMarker>
    </MapContainer>
  );
}
