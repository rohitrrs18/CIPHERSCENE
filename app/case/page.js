// ============================================================
// app/case/page.js
// Full case briefing: incident details + suspect overview.
// ============================================================

"use client";

import Link from "next/link";
import { CASE, SUSPECTS, TOTAL_EVIDENCE_POINTS } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { useGameStore } from "@/lib/store";

export default function CasePage() {
  const { started, startCase, getProgress } = useGameStore();
  const progress = getProgress();

  const details = [
    { label: "Victim", value: CASE.victim },
    { label: "Asset Compromised", value: CASE.asset },
    { label: "Incident Date", value: CASE.incidentDate },
    { label: "Incident Time", value: CASE.incidentTime },
    { label: "Workstation", value: CASE.workstation },
    { label: "Evidence Available", value: `${TOTAL_EVIDENCE_POINTS} points` },
  ];

  const roadmap = [
    ["Examine Files", "/files", "Inspect the workstation image for suspicious or relevant files."],
    ["Recover Messages", "/messages", "Restore deleted messages and identify who spoke to whom."],
    ["Analyze Browser History", "/browser", "Follow the digital trail across user profiles."],
    ["Review Activity Logs", "/logs", "Cross-reference logins, file access, and outbound transfers."],
    ["Interrogate Suspects", "/suspects", "Compare evidence against each suspect's alibi and motive."],
    ["Submit Verdict", "/verdict", "Accuse the attacker. Rating depends on evidence collected."],
  ];

  return (
    <div className="fade-in mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Header Container */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Case file — Briefing" icon="◈">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              {started
                ? "Investigation in progress. Review each module, then submit your verdict."
                : "Press 'Begin investigation' to open the case and start collecting evidence."}
            </span>
            {!started && (
              <button
                onClick={startCase}
                className="shrink-0 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-transform active:scale-95 hover:bg-white/90"
              >
                Begin investigation
              </button>
            )}
          </div>
        </CaseHeader>
      </div>

      {/* ============ INCIDENT BRIEF ============ */}
      <section>
        <SectionHead kicker="Record" title="Incident brief" right="Case narrative" />
        
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: Narrative */}
          <p className="text-base leading-relaxed text-white/60">
            {CASE.brief}
          </p>

          {/* Right: Metadata List */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`px-4 py-3.5 ${i !== details.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                  {d.label}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PERSONS OF INTEREST ============ */}
      <section>
        <SectionHead
          kicker="Roster"
          title="Persons of interest"
          right="Full profiles"
          rightHref="/suspects"
        />
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.values(SUSPECTS).map((s) => (
            <div
              key={s.id}
              className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-0.5 scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                style={{ backgroundColor: s.accent }}
              />
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-sm font-bold"
                style={{
                  color: s.accent,
                  borderColor: s.accent + "40",
                  backgroundColor: s.accent + "14",
                }}
              >
                {s.avatar}
              </span>
              <div className="min-w-0">
                <div className="text-base font-medium text-white">{s.name}</div>
                <div className="mt-0.5 text-sm text-white/40">{s.role}</div>
                <div className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Clearance <span className="text-white/70">{s.clearance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ROADMAP ============ */}
      <section>
        <SectionHead
          kicker="Sequence"
          title="Investigation roadmap"
          right={`${roadmap.length} steps`}
        />

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
          <ol className="flex flex-col">
            {roadmap.map(([label, href, desc], i) => (
              <li key={href} className="border-b border-white/5 last:border-b-0">
                <Link
                  href={href}
                  className="group flex items-center gap-5 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-white/40 transition-colors group-hover:border-white/30 group-hover:text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                      {label}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-white/40 transition-colors group-hover:text-white/60">
                      {desc}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/0 transition-colors group-hover:text-white/50">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {started && (
          <div className="mt-6 flex items-center gap-4 font-mono text-xs text-white/40">
            <span className="uppercase tracking-[0.2em] text-white/30">Progress</span>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="tabular-nums text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-2 text-white/30">evidence logged</span>
            </span>
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------------- shared section header ---------------- */

function SectionHead({ kicker, title, right, rightHref }) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          {kicker}
        </span>
        <h2 className="text-xl font-medium text-white">{title}</h2>
      </div>
      {right &&
        (rightHref ? (
          <Link
            href={rightHref}
            className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
          >
            {right}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <span className="font-mono text-xs text-white/30">{right}</span>
        ))}
    </div>
  );
}