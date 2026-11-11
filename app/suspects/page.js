// ============================================================
// app/suspects/page.js
// Suspect dossiers: compare alibi, motive, and evidence links.
// ============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SUSPECTS,
  FILES,
  MESSAGES,
  BROWSER_HISTORY,
  LOGS,
} from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { Pill } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

// Build a map of which evidence items reference each suspect
function evidenceForSuspect(suspectId) {
  const suspect = SUSPECTS[suspectId];
  if (!suspect) return [];

  const name = suspect.name;
  const first = name.split(" ")[0].toLowerCase();
  const last = name.split(" ")[1]?.toLowerCase() || "";
  const user = first[0] + last; // e.g. mvale, pnair, erusakova, dokafor

  const items = [];

  FILES.forEach((f) => {
    if (
      f.owner === user ||
      f.content.toLowerCase().includes(first) ||
      f.content.toLowerCase().includes(last)
    ) {
      items.push({ kind: "file", label: f.name, id: f.id, href: "/files" });
    }
  });

  MESSAGES.forEach((m) => {
    if (m.from.includes(name) || m.to.includes(name)) {
      items.push({
        kind: "message",
        label: `${m.from} → ${m.to}`,
        id: m.id,
        href: "/messages",
      });
    }
  });

  BROWSER_HISTORY.forEach((b) => {
    if (b.profile === user) {
      items.push({ kind: "browser", label: b.title, id: b.id, href: "/browser" });
    }
  });

  LOGS.forEach((l) => {
    if (
      l.user === user ||
      l.detail.toLowerCase().includes(first) ||
      l.detail.toLowerCase().includes(last)
    ) {
      items.push({ kind: "log", label: l.event, id: l.id, href: "/logs" });
    }
  });

  return items;
}

export default function SuspectsPage() {
  const [active, setActive] = useState("marcus");
  const { hasDiscovered, getProgress, accuse } = useGameStore();
  const progress = getProgress();

  const suspect = SUSPECTS[active];
  const links = evidenceForSuspect(active);
  const loggedLinks = links.filter((l) => hasDiscovered(l.id));

  return (
    <div className="fade-in mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Suspect Dossiers" icon="☰">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Review each person of interest. Evidence items you've logged are
              highlighted — use them to weigh alibi versus motive.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* ============ SUSPECT LIST ============ */}
        <aside className="flex h-[75vh] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
          <div className="border-b border-white/10 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Persons of interest
            </span>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {Object.values(SUSPECTS).map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={`relative flex w-full items-center gap-3 border-b border-white/5 px-4 py-4 text-left transition-colors ${
                      isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-px bg-white" />
                    )}
                    
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-xs font-bold"
                      style={{
                        color: s.accent,
                        borderColor: s.accent + "40",
                        backgroundColor: s.accent + "14",
                      }}
                    >
                      {s.avatar}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-medium ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/30">
                        {s.role}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ============ SUSPECT DETAIL ============ */}
        <section className="flex h-[75vh] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
          {/* Detail Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <Pill tone="accent">{suspect.role}</Pill>
              <Pill tone="muted">{suspect.clearance}</Pill>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Workstation: {suspect.workstation}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-xl border text-lg font-bold"
                style={{
                  color: suspect.accent,
                  borderColor: suspect.accent + "40",
                  backgroundColor: suspect.accent + "14",
                }}
              >
                {suspect.avatar}
              </span>
              <div>
                <h2 className="text-xl font-medium text-white">{suspect.name}</h2>
                <p className="mt-1 text-sm text-white/40">{suspect.role}</p>
              </div>
            </div>

            {/* Alibi & Motive */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Stated alibi
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  {suspect.alibi}
                </p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Possible motive
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  {suspect.motive}
                </p>
              </div>
            </div>

            {/* Linked Evidence */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Linked evidence
                </span>
                <span className="font-mono text-[10px] text-white/30">
                  {loggedLinks.length}/{links.length} logged
                </span>
              </div>
              
              {links.length === 0 && (
                <p className="text-sm text-white/30">
                  No direct evidence links found.
                </p>
              )}

              <ul className="grid gap-2">
                {links.map((l) => {
                  const logged = hasDiscovered(l.id);
                  return (
                    <li
                      key={l.kind + l.id}
                      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                        logged
                          ? "border-emerald-500/20 bg-emerald-500/5 text-white/80"
                          : "border-white/5 bg-white/[0.02] text-white/40"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="w-16 shrink-0 font-mono text-[9px] uppercase tracking-widest text-white/30">
                          {l.kind}
                        </span>
                        <span className="truncate">{l.label}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[10px]">
                        {logged ? (
                          <span className="text-emerald-400">✓ logged</span>
                        ) : (
                          <Link
                            href={l.href}
                            className="text-white/30 transition-colors hover:text-white"
                          >
                            review →
                          </Link>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Accuse Action */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-red-200/60">
                Confident this is the attacker? Submit a verdict.
              </p>
              <button
                onClick={() => accuse(suspect.id)}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
              >
                Accuse {suspect.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}