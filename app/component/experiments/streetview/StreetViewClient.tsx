"use client";

import { useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import { STREET_VIEW_POINTS } from "./data";

type ViewKey = "A" | "B";

export const StreetViewClient = () => {
  const point = STREET_VIEW_POINTS[0];

  const [activeView, setActiveView] = useState<ViewKey>("A");
  const [showSegmentation, setShowSegmentation] = useState(false);

  const view = activeView === "A" ? point.viewA : point.viewB;
  const canShowSegmentation = Boolean(view.overlay);

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* =======================================================
          HEADER — thin, fixed height
      ======================================================== */}

      <div className="flex shrink-0 items-center justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          <span>Back</span>
        </button>

        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            Thesis — Street View
          </p>
          <h2 className="text-base font-medium leading-tight">
            Valiasr Street, {point.label}
          </h2>
        </div>
      </div>

      {/* =======================================================
          IMAGE — takes almost all remaining height, whole
          image always visible (object-contain, never cropped)
      ======================================================== */}

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={showSegmentation && view.overlay ? view.overlay : view.image}
          alt={`${point.label} — ${view.label}`}
          className="aspect-square max-h-full max-w-full rounded-2xl object-contain"
        />
      </div>

      {/* =======================================================
          CONTROLS — thin strip, fixed height, never grows
      ======================================================== */}

      <div className="flex shrink-0 flex-wrap items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          {(["A", "B"] as ViewKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setActiveView(key);
                setShowSegmentation(false);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs transition ${
                activeView === key
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {key === "A" ? "Facing A" : "Facing B"}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={!canShowSegmentation}
          onClick={() => setShowSegmentation((current) => !current)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition ${
            !canShowSegmentation
              ? "cursor-not-allowed bg-neutral-100 text-neutral-300"
              : showSegmentation
                ? "bg-[#e46a63] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          <Layers size={13} strokeWidth={1.8} />
          {showSegmentation ? "Segmented" : "Raw image"}
        </button>

        {view.groups && (
          <>
            <div className="h-6 w-px bg-neutral-100" />

            <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1.5">
              {view.groups.map((group) => (
                <div
                  key={group.key}
                  className="flex items-center gap-1.5 text-[11px] text-neutral-500"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <span>{group.label}</span>
                  <span className="tabular-nums text-neutral-400">
                    {group.percent.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
