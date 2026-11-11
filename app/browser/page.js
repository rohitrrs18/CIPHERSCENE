// ============================================================
// app/browser/page.js
// Browser history analysis: filter by profile and risk level.
// ============================================================

"use client";

import { useMemo, useState } from "react";
import { BROWSER_HISTORY, SUSPECTS } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { RiskBadge, ClueBox, Pill } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

export default function BrowserPage() {
  const [profile, setProfile] = useState("all");
  const [risk, setRisk] = useState("all");

  const { discoverEvidence, hasDiscovered, getProgress } = useGameStore();
  const progress = getProgress();

  // Unique profiles present in history
  const profiles = useMemo(() => {
    const set = new Set(BROWSER_HISTORY.map((b) => b.profile));
    return ["all", ...Array.from(set)];
  }, []);

  const visible = useMemo(() => {
    return BROWSER_HISTORY.filter((b) => {
      if (profile !== "all" && b.profile !== profile) return false;
      if (risk !== "all" && b.risk !== risk) return false;
      return true;
    }).sort((a, b) => (a.time < b.time ? 1 : -1));
  }, [profile, risk]);

  const nameFor = (id) => SUSPECTS[id]?.name || id;
  const accentFor = (id) => SUSPECTS[id]?.accent || "#64748b";

  return (
    <div className="fade-in mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Browser History Analysis" icon="◐">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Reconstruct the digital trail. Filter by user profile and risk level
              to isolate suspicious browsing activity.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      {/* ============ FILTERS ============ */}
      <section className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Profile Filter */}
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Profile
            </div>
            <div className="flex flex-wrap gap-2">
              {profiles.map((p) => (
                <button
                  key={p}
                  onClick={() => setProfile(p)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    profile === p
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  {p === "all" ? "All profiles" : nameFor(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Filter */}
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Risk level
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "HIGH", "MEDIUM", "LOW"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRisk(r)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    risk === r
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  {r === "all" ? "All" : r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE FEED ============ */}
      <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6">
        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#0a0a0a] p-8 text-center">
            <p className="font-mono text-xs text-white/30">
              No history entries match the selected filters.
            </p>
          </div>
        )}

        {visible.map((entry) => {
          const logged = hasDiscovered(entry.id);
          return (
            <article key={entry.id} className="relative group">
              {/* Timeline Node */}
              <span 
                className="absolute -left-[31px] top-6 flex h-2.5 w-2.5 items-center justify-center rounded-full ring-4 ring-[#050505]"
                style={{ backgroundColor: accentFor(entry.profile) }}
              />

              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors duration-300 hover:border-white/20">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <RiskBadge risk={entry.risk} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {entry.time}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[11px] font-medium"
                    style={{ color: accentFor(entry.profile) }}
                  >
                    {nameFor(entry.profile)}
                  </span>
                </div>

                <div className="px-5 py-4">
                  <div className="text-sm font-medium text-white/90">
                    {entry.title}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-white/20">↳</span>
                    <span className="truncate font-mono text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                      {entry.url}
                    </span>
                  </div>
                  
                  {/* Clue Action inside the card */}
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <ClueBox
                      clue={entry.clue}
                      logged={logged}
                      onLog={() => discoverEvidence(entry.id)}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}