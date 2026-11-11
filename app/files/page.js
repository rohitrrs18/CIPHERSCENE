// ============================================================
// app/files/page.js
// File examination: inspect suspicious files, log evidence.
// ============================================================

"use client";

import { useState } from "react";
import { FILES } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { Pill, SuspicionBadge, ClueBox } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

export default function FilesPage() {
  const [selectedId, setSelectedId] = useState(FILES[0]?.id || null);
  const selected = FILES.find((f) => f.id === selectedId) || FILES[0];

  const { discoverEvidence, hasDiscovered, getProgress } = useGameStore();
  const progress = getProgress();

  const logged = selected ? hasDiscovered(selected.id) : false;

  return (
    <div className="fade-in mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="File Examination" icon="▤">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Inspect files recovered from the seized workstation image. Log
              suspicious or relevant files as evidence.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* ============ FILE LIST ============ */}
        <aside className="flex h-[75vh] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Recovered files
            </span>
            <span className="font-mono text-[10px] text-white/30">
              {FILES.length}
            </span>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {FILES.map((file) => {
              const isActive = file.id === selected?.id;
              const isLogged = hasDiscovered(file.id);
              return (
                <li key={file.id}>
                  <button
                    onClick={() => setSelectedId(file.id)}
                    className={`relative flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "bg-white/[0.04]"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-px bg-white" />
                    )}

                    <span
                      className={`mt-0.5 shrink-0 text-xs ${
                        isActive ? "text-white" : isLogged ? "text-emerald-400" : "text-white/20"
                      }`}
                    >
                      {isLogged ? "✓" : "▤"}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-medium ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {file.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/30">
                        {file.type} · {file.size}
                      </span>
                    </span>

                    {file.suspicious && (
                      <span className="mt-0.5 text-[10px] text-red-400/80">⚠</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ============ FILE VIEWER ============ */}
        {selected && (
          <section className="flex h-[75vh] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <Pill tone="accent">{selected.type}</Pill>
                <SuspicionBadge suspicious={selected.suspicious} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                {selected.id}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <h2 className="text-xl font-medium text-white">{selected.name}</h2>

              {/* Metadata Manifest */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] sm:grid-cols-3">
                {[
                  ["Path", selected.path],
                  ["Size", selected.size],
                  ["Modified", selected.modified],
                  ["Owner", selected.owner],
                  ["Hash", selected.hash],
                ].map(([k, v]) => (
                  <div key={k} className="bg-[#0a0a0a] p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      {k}
                    </div>
                    <div
                      className="mt-1 truncate font-mono text-[11px] text-white/80"
                      title={v}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Preview */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    File content
                  </span>
                  <span className="font-mono text-[10px] text-white/20">
                    Read-only
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#050505]">
                  {/* Editor gutter accent */}
                  <div className="absolute inset-y-0 left-0 w-8 border-r border-white/5 bg-white/[0.01]" />
                  <pre className="max-h-72 overflow-auto whitespace-pre-wrap py-4 pl-12 pr-4 font-mono text-[12px] leading-relaxed text-white/70">
                    {selected.content}
                  </pre>
                </div>
              </div>

              {/* Clue + Log Action */}
              <div className="mt-6">
                <ClueBox
                  clue={selected.clue}
                  logged={logged}
                  onLog={() => discoverEvidence(selected.id)}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}