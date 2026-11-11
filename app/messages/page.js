// ============================================================
// app/messages/page.js
// Deleted message recovery: scan storage, recover, log evidence.
// ============================================================

"use client";

import { useMemo, useState } from "react";
import { MESSAGES } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { Pill, ClueBox } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

export default function MessagesPage() {
  // Local recovery state (which messages the player has "recovered")
  const [recovered, setRecovered] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState("all"); // all | recovered | deleted

  const { discoverEvidence, hasDiscovered, getProgress } = useGameStore();
  const progress = getProgress();

  // Simulate a storage scan: recover all deleted messages
  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      setRecovered(MESSAGES.filter((m) => m.deleted).map((m) => m.id));
      setScanning(false);
    }, 1400);
  };

  const visible = useMemo(() => {
    return MESSAGES.filter((m) => {
      const isRecovered = recovered.includes(m.id) || !m.deleted;
      if (filter === "recovered") return isRecovered;
      if (filter === "deleted") return m.deleted;
      return true;
    });
  }, [filter, recovered]);

  const deletedCount = MESSAGES.filter((m) => m.deleted).length;
  const recoveredCount = recovered.length;
  const scanComplete = recoveredCount === deletedCount;

  return (
    <div className="fade-in mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Message Recovery" icon="✉">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Deleted messages were wiped from the device. Run a storage scan to
              recover what you can, then log relevant conversations.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      {/* ============ CONTROL BAR ============ */}
      <section className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-white/40">
            <div className="flex flex-col gap-1">
              <span>Fragments</span>
              <span className="text-sm text-white/80">{deletedCount}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col gap-1">
              <span>Recovered</span>
              <span className={`text-sm ${recoveredCount > 0 ? "text-emerald-400" : "text-white/30"}`}>
                {recoveredCount}
              </span>
            </div>
          </div>

          <button
            onClick={runScan}
            disabled={scanning || scanComplete}
            className={`relative overflow-hidden rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              scanComplete
                ? "cursor-default bg-white/5 text-white/40"
                : "bg-white text-black hover:bg-white/90 active:scale-95 disabled:opacity-50"
            }`}
          >
            {scanning
              ? "Scanning storage…"
              : scanComplete
              ? "✓ Scan complete"
              : "Run storage scan"}
          </button>
        </div>

        {/* Scanning Progress Animation */}
        {scanning && (
          <div className="mt-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-white" />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Reading unallocated clusters…
            </p>
          </div>
        )}
      </section>

      {/* ============ FILTER TABS & COUNT ============ */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex gap-2">
          {[
            ["all", "All logs"],
            ["recovered", "Recovered"],
            ["deleted", "Deleted"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-white/30">
          {visible.length} records
        </span>
      </div>

      {/* ============ MESSAGE LIST ============ */}
      <div className="space-y-4">
        {visible.map((m) => {
          const isRecovered = recovered.includes(m.id) || !m.deleted;
          const logged = hasDiscovered(m.id);

          return (
            <article
              key={m.id}
              className={`group rounded-xl border border-white/10 bg-[#0a0a0a] p-5 transition-all duration-300 ${
                isRecovered ? "hover:border-white/20" : "opacity-60"
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill tone={m.deleted ? "danger" : "success"}>
                    {m.deleted ? "Deleted" : "On Device"}
                  </Pill>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {m.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
                  <span className="text-white/80">{m.from}</span>
                  <span className="text-white/20">→</span>
                  <span className="text-white/80">{m.to}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-4">
                {isRecovered ? (
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm leading-relaxed text-white/80">
                      "{m.content}"
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-white/10 bg-[#050505] p-4">
                    <p className="font-mono text-xs italic text-white/20">
                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ — fragment unrecovered. Run a storage scan.
                    </p>
                  </div>
                )}
              </div>

              {/* Clue Action */}
              {isRecovered && (
                <div className="mt-4">
                  <ClueBox
                    clue={m.clue}
                    logged={logged}
                    onLog={() => discoverEvidence(m.id)}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}