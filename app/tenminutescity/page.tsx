"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Layers, MapPin, RotateCcw } from "lucide-react";
import { distanceMeters, origin, type CityData, type Layer } from "./data";

const RealMap = dynamic(() => import("./RealMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-white/50">Preparing map…</div>,
});
const layers: { id: Layer; label: string; color: string; description: string }[] = [
  { id: "overview", label: "Neighborhood overview", color: "#b8b5ae", description: "Buildings, streets, green spaces and everyday destinations together." },
  { id: "services", label: "Everyday services", color: "#7d9be8", description: "Mapped amenities, shops and public transport stops. Select a point to see its details." },
  { id: "buildings", label: "Built fabric", color: "#b8b5ae", description: "Building footprints reveal the physical grain of the neighborhood." },
  { id: "green", label: "Green / public space", color: "#7fc6a4", description: "Mapped parks, gardens and playgrounds within the study area." },
  { id: "streets", label: "Street network", color: "#d5b586", description: "Mapped streets and paths. This layer includes roads that may not be walkable." },
];

export default function TenMinutesCityPage() {
  const [activeLayer, setActiveLayer] = useState<Layer>("overview");
  const [minutes, setMinutes] = useState(10);
  const [data, setData] = useState<CityData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState<[number, number]>(origin);
  const radius = minutes * 80;
  const selectCenter = (point: [number, number]) => {
    setAttempt(0);
    setData(null);
    setLoading(true);
    setError(false);
    setCenter(point);
  };
  const defaultLocation = center[0] === origin[0] && center[1] === origin[1];
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (center[0] !== origin[0] || center[1] !== origin[1]) {
      params.set("lat", String(center[0]));
      params.set("lon", String(center[1]));
    }
    if (attempt) params.set("refresh", "1");
    const timer = window.setTimeout(() => {
    fetch(`/api/tenminutescity?${params}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Unavailable"); return response.json(); })
      .then((result: CityData & { refreshUnavailable?: boolean }) => { if (!controller.signal.aborted) { setData(result); setError(!!result.refreshUnavailable); } })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 300);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [attempt, center]);
  const nearby = data?.services.filter(f => distanceMeters(f.lat, f.lon, center) <= radius);
  const categories = nearby ? new Set(nearby.map(f => f.category)).size : undefined;
  const selected = layers.find(layer => layer.id === activeLayer)!;
  const metrics = [
    { label: "MAPPED BUILDINGS", value: data?.buildings.length, detail: "Across the study area" },
    { label: "NEARBY SERVICES", value: nearby?.length, detail: `Within the ${radius} m radius` },
    { label: "SERVICE TYPES", value: categories, detail: "Distinct mapped categories" },
    { label: "GREEN SPACES", value: data?.green.length, detail: "Parks, gardens & playgrounds" },
  ];
  return (
    <main className="min-h-screen bg-[#111] text-white selection:bg-[#7d9be8]/30">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-[6vw]">
        <nav aria-label="Project navigation" className="flex items-center justify-between border-b border-white/10 py-7">
          <Link href="/#projects" className="flex items-center gap-2 text-xs text-white/60 transition hover:text-white"><ArrowLeft size={14} /> Back to projects</Link>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">EXPERIMENT / 02</span>
        </nav>
        <header className="grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end lg:py-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d9be8]">02 — Urban data / research</p>
            <h1 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-light leading-[0.9] tracking-[-0.06em]">10 Minutes<br /><span className="text-white/45">City.</span></h1>
            <p className="mt-7 max-w-[470px] text-sm leading-7 text-white/50">How much of everyday life is close to home? An urban data experiment exploring proximity, neighborhood structure and the places we use every day.</p>
          </div>
          <div className="border-l border-white/15 pl-5 text-xs leading-6 text-white/50"><MapPin size={16} className="mb-3 text-[#7d9be8]" /><p className="text-white/80">{defaultLocation ? "Valiasr · Tehran" : "Selected neighborhood"}</p><p>{center[0].toFixed(5)}°, {center[1].toFixed(5)}°</p><p className="mt-2 text-[10px] uppercase tracking-widest">OpenStreetMap study area</p></div>
        </header>
        <section aria-label="Interactive neighborhood analysis" className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="flex items-center justify-between border border-white/10 bg-[#191919] px-4 py-3 text-[10px] tracking-widest text-white/60"><span>01 / EXPLORE THE NEIGHBORHOOD</span><span className="hidden sm:block text-[#7d9be8]">{radius} M RADIUS</span></div>
            <div className="relative isolate h-[420px] border-x border-b border-white/10 bg-[#151515] sm:h-[540px]">
              <RealMap data={data} activeLayer={activeLayer} radius={radius} center={center} onCenterChange={selectCenter} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-3 text-[11px] text-white/55">
              <p role="status">{loading ? "Updating OpenStreetMap data…" : data ? `${data.mode === "snapshot" ? "Saved OSM snapshot" : "Updated OSM data"} · ${data.retrievedAt.slice(0, 10)}${error ? " · Refresh unavailable; saved data remains active." : ""}` : "Could not load this location. Retry or select another point; the map remains interactive."}</p>
              <button disabled={loading} onClick={() => { setLoading(true); setError(false); setAttempt(a => a + 1); }} className="flex items-center gap-2 py-1 text-[#7d9be8] hover:text-white disabled:opacity-40"><RotateCcw size={12} />{loading ? "Loading…" : "Refresh data"}</button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 text-[10px] text-white/50">{layers.slice(1).map(layer => <span key={layer.id} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: layer.color }} />{layer.label}</span>)}</div>
          </div>
          <aside className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/45"><Layers size={13} /> ANALYSIS LAYERS</p>
            <div className="mt-5">{layers.map(layer => <button key={layer.id} aria-pressed={activeLayer === layer.id} onClick={() => setActiveLayer(layer.id)} className={`flex w-full items-center justify-between border-b border-white/10 py-3.5 text-left text-xs transition hover:text-white ${activeLayer === layer.id ? "text-white" : "text-white/40"}`}><span>{layer.label}</span><span className="h-1.5 w-1.5 rounded-full" style={{ background: activeLayer === layer.id ? layer.color : "#393939" }} /></button>)}</div>
            <p className="mt-4 min-h-16 text-xs leading-6 text-white/40">{selected.description}</p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <label htmlFor="walking-time" className="text-[10px] tracking-[0.2em] text-white/45">WALKING TIME</label>
              <p className="mt-3 font-mono text-4xl text-[#7d9be8]">{minutes}<span className="ml-2 text-xs text-white/45">min</span></p>
              <input id="walking-time" type="range" min={5} max={15} step={1} value={minutes} onChange={event => setMinutes(Number(event.target.value))} className="mt-5 w-full" style={{ accentColor: "#7d9be8" }} />
              <div className="flex justify-between font-mono text-[10px] text-white/35"><span>5 MIN</span><span>15 MIN</span></div>
              <p className="mt-4 text-xs leading-6 text-white/40">Pan or zoom to any area, then click to select it. Use Choose location to select over an existing feature, or Analyze map center to use the current view. Data and counts update for your selection.</p><button onClick={() => { setAttempt(0); selectCenter(origin); setMinutes(10); }} className="mt-3 text-xs text-[#7d9be8] hover:text-white">Reset origin & time</button><p className="mt-3 font-mono text-[10px] text-white/40">{center[0].toFixed(5)}°, {center[1].toFixed(5)}°</p><p className="mt-4 text-xs leading-6 text-white/40">{radius} m at an assumed 4.8 km/h. The circle shows straight-line proximity, not a routed walking boundary.</p>
            </div>
          </aside>
        </section>
        <section aria-label="Neighborhood metrics" className="my-10 grid grid-cols-2 border-y border-white/10 py-7 lg:grid-cols-4">
          {metrics.map(metric => <div key={metric.label} className="py-4 pr-4"><p className="text-[9px] tracking-[0.18em] text-white/40">{metric.label}</p><p className="my-3 font-mono text-3xl text-white/80">{metric.value?.toLocaleString() ?? "—"}</p><p className="text-xs text-white/35">{metric.detail}</p></div>)}
        </section>
        <section className="grid gap-8 py-7 pb-16 md:grid-cols-[1fr_2fr]">
          <div><p className="text-[10px] tracking-[0.2em] text-[#7d9be8]">02 / BEHIND THE MAP</p><h2 className="mt-4 text-3xl font-light tracking-tight text-white/80">A city at<br />a human scale.</h2></div>
          <div className="grid gap-8 sm:grid-cols-2"><div><h3 className="text-sm text-white/75">The question</h3><p className="mt-3 text-xs leading-7 text-white/45">Can daily needs be found within a short walk? Explore the relationship between the built fabric, local services and shared green spaces around a selectable neighborhood origin.</p></div><div><h3 className="text-sm text-white/75">Reading the results</h3><p className="mt-3 text-xs leading-7 text-white/45">Counts come from mapped OpenStreetMap features. Nearby services use the distance to each feature’s center. Missing places, street crossings and access restrictions can change real walking access; counts are limited to the study area and are not a walkability score.</p></div></div>
        </section>
        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-7 text-[10px] tracking-widest text-white/40"><span>PROXIMITY · URBAN FORM · EVERYDAY LIFE</span><Link href="/walkabilitymap" className="flex items-center gap-2 hover:text-white">NEXT / WALKABILITY MAP <ArrowUpRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
