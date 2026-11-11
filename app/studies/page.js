// ============================================================
// app/studies/page.js
// Index of all 10 real-world forensic case studies.
// ============================================================

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STUDIES } from "@/lib/studiesData";
import CaseHeader from "@/components/CaseHeader";

export default function StudiesPage() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");

  const years = useMemo(() => {
    const set = new Set(STUDIES.map((s) => s.year));
    return ["all", ...Array.from(set).sort((a, b) => b.localeCompare(a))];
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STUDIES.filter((s) => {
      if (year !== "all" && s.year !== year) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.lesson.toLowerCase().includes(q)
      );
    });
  }, [query, year]);

  return (
    <div className="fade-in mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Real Case Studies" icon="❋">
          <div className="text-sm text-white/50">
            Ten documented digital forensics investigations from public records.
            Each study shows real evidence types and the forensic lesson it
            teaches — no API, no fabricated case data.
          </div>
        </CaseHeader>
      </div>

      {/* ============ FILTERS ============ */}
      <section className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
          
          {/* Search */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Search archive
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                ⌕
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, type, or lesson…"
                className="w-full rounded-lg border border-white/10 bg-[#050505] py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
          </div>

          {/* Year Select */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Filter by year
            </div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full appearance-none rounded-lg border border-white/10 bg-[#050505] px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-[#0a0a0a]">
                  {y === "all" ? "All years" : y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ============ RESULTS HEADER ============ */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-lg font-medium text-white">Archive Index</h2>
        <span className="font-mono text-[11px] text-white/40">
          {visible.length} {visible.length === 1 ? "record" : "records"}
        </span>
      </div>

      {/* ============ GRID ============ */}
      {visible.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((study, i) => (
            <StudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#0a0a0a] p-10 text-center">
          <p className="font-mono text-sm text-white/30">
            No case studies match your search.
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   INLINE COMPONENT: StudyCard
   (Replaces your external component to match the new theme)
   ============================================================ */
function StudyCard({ study, index }) {
  return (
    <Link
      href={`/studies/${study.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:border-white/25 hover:bg-[#0c0c0c]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
          {study.type}
        </span>
        <span className="font-mono text-[11px] text-white/30 transition-colors group-hover:text-white/60">
          {study.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-medium leading-snug text-white/90 transition-colors group-hover:text-white">
          {study.title}
        </h3>
        
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40 transition-colors group-hover:text-white/60">
          {study.summary}
        </p>

        {/* Footer Action */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/0 transition-colors group-hover:text-white/40">
            Read dossier
          </span>
          <span className="text-sm text-white/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/60">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}