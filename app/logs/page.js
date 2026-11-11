// ============================================================
// app/logs/page.js
// Activity log analysis: filter by event type, read the timeline.
// ============================================================

"use client";

import { useMemo, useState } from "react";
import { LOGS, SUSPECTS } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { Pill, ClueBox } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

export default function LogsPage() {
  const [event, setEvent] = useState("all");

  const { discoverEvidence, hasDiscovered, getProgress } = useGameStore();
  const progress = getProgress();

  const eventTypes = useMemo(() => {
    const set = new Set(LOGS.map((l) => l.event));
    return ["all", ...Array.from(set)];
  }, []);

  const visible = useMemo(() => {
    return LOGS.filter((l) => event === "all" || l.event === event).sort(
      (a, b) => (a.time < b.time ? -1 : 1)
    );
  }, [event]);

  const nameFor = (id) => {
    const s = Object.values(SUSPECTS).find(
      (x) => x.id === id || x.id === id.replace("svc-maint", "marcus")
    );
    return s?.name || id;
  };

  // Event-type → tone mapping
  const toneFor = (ev) => {
    if (ev.includes("OUTBOUND") || ev.includes("WALLET") || ev.includes("SERVICE"))
      return "danger";
    if (ev.includes("FILE") || ev.includes("SESSION_END")) return "warning";
    if (ev.includes("AUDIT")) return "success";
    return "accent";
  };

  return (
    <div className="fade-in mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Activity Logs" icon="▦">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Cross-reference authentication, file access, and outbound transfer
              events. Timestamps are chronological.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      {/* ============ FILTERS ============ */}
      <section className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4 sm:px-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Filter by event type
        </div>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((ev) => (
            <button
              key={ev}
              onClick={() => setEvent(ev)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                event === ev
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              {ev === "all" ? "All events" : ev}
            </button>
          ))}
        </div>
      </section>

      {/* ============ LOG TABLE ============ */}
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
        {/* Table Header (Desktop only) */}
        <div className="hidden border-b border-white/10 bg-white/[0.02] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:grid sm:grid-cols-[140px_160px_1fr] sm:gap-4">
          <span>Time</span>
          <span>Event</span>
          <span>Detail</span>
        </div>

        <div className="flex flex-col">
          {visible.map((log) => {
            const logged = hasDiscovered(log.id);
            return (
              <div
                key={log.id}
                className="group border-b border-white/5 p-5 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:px-6"
              >
                <div className="grid gap-4 sm:grid-cols-[140px_160px_1fr] sm:items-start sm:gap-4">
                  {/* Time Column */}
                  <div className="font-mono text-[11px] tabular-nums text-white/40">
                    {log.time}
                  </div>
                  
                  {/* Event Pill Column */}
                  <div>
                    <Pill tone={toneFor(log.event)}>{log.event}</Pill>
                  </div>
                  
                  {/* Detail Column */}
                  <div className="min-w-0">
                    <div className="text-sm text-white/90">{log.detail}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 truncate font-mono text-[10px] text-white/30">
                      <span>
                        user: <span className="text-white/60">{nameFor(log.user)}</span>
                      </span>
                      <span>
                        src: <span className="text-white/60">{log.source}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clue Action */}
                <div className="mt-4 sm:pl-[304px]">
                  <ClueBox
                    clue={log.clue}
                    logged={logged}
                    onLog={() => discoverEvidence(log.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Empty State */}
      {visible.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#0a0a0a] p-8 text-center">
          <p className="font-mono text-xs text-white/30">
            No log entries match the selected event type.
          </p>
        </div>
      )}
    </div>
  );
}