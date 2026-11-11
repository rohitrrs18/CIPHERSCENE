// ============================================================
// components/StudyCard.js
// Card for a real-world forensic case study.
// ============================================================

"use client";

import Link from "next/link";

export default function StudyCard({ study, index }) {
  return (
    <Link
      href={`/studies/${study.id}`}
      className="panel group block p-4 transition hover:border-accent/50 hover:shadow-glow"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/30 bg-accent/10 text-[11px] font-semibold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="tag">{study.year}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted">
          Real Case
        </span>
      </div>

      <h3 className="text-sm font-semibold text-ink transition group-hover:text-accent">
        {study.title}
      </h3>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
        {study.type}
      </p>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
        {study.summary}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
        <span className="text-[10px] text-muted">
          {study.keyEvidence.length} evidence types
        </span>
        <span className="text-[11px] text-accent opacity-0 transition group-hover:opacity-100">
          Read case →
        </span>
      </div>
    </Link>
  );
}