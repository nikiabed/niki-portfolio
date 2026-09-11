import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "10 Minutes City | Urban Data Experiment",
  description: "Explore everyday services, buildings and green spaces around Valiasr, Tehran, through an interactive neighborhood proximity study.",
};

export default function TenMinutesCityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

