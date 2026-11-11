// ============================================================
// components/CaseHeader.js
// Reusable header block showing case title + status.
// ============================================================

"use client";

import { CASE } from "@/lib/caseData";

export default function CaseHeader({ title, subtitle, icon = "◈", children }) {
  return (
    <div className="panel mb-6 overflow-hidden">
      {/* Status strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-panelAlt px-4 py-2">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-danger" />
          {CASE.status}
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted">
          <span>Case: {CASE.id.toUpperCase()}</span>
          <span className="text-danger">{CASE.severity}</span>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-start gap-3 px-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-lg text-accent">
          {icon}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-ink">{title}</h1>
          <p className="text-xs text-muted">
            {subtitle || `${CASE.title} — ${CASE.subtitle}`}
          </p>
        </div>
      </div>

      {children && (
        <div className="border-t border-border px-4 py-3 text-xs text-ink">
          {children}
        </div>
      )}
    </div>
  );
}