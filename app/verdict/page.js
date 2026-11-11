// ============================================================
// app/verdict/page.js
// Submit an accusation, see the result and detective rating.
// ============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { CASE, SUSPECTS, TOTAL_EVIDENCE_POINTS } from "@/lib/caseData";
import CaseHeader from "@/components/CaseHeader";
import { Pill } from "@/components/EvidenceBadge";
import { useGameStore } from "@/lib/store";

const RATINGS = [
  { min: 10, label: "Elite Cyber Detective", tone: "accent" },
  { min: 7, label: "Senior Analyst", tone: "success" },
  { min: 4, label: "Investigator", tone: "warning" },
  { min: 0, label: "Rookie", tone: "muted" },
];

export default function VerdictPage() {
  const { accused, verdict, accuse, resetCase, getProgress, discoveredEvidence } =
    useGameStore();
  const [selected, setSelected] = useState(accused || null);
  const progress = getProgress();

  const submit = () => {
    if (!selected) return;
    accuse(selected);
  };

  // ============ RESULT VIEW ============
  if (verdict) {
    const culprit = SUSPECTS[CASE.culprit];
    return (
      <div className="fade-in mx-auto max-w-4xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
          <CaseHeader title="Verdict" icon="⚖">
            <span className="text-sm text-white/50">
              Investigation closed. Case report below.
            </span>
          </CaseHeader>
        </div>

        {/* Outcome Banner */}
        <section
          className={`overflow-hidden rounded-2xl border ${
            verdict.correct
              ? "border-emerald-500/30 bg-emerald-500/[0.02]"
              : "border-red-500/30 bg-red-500/[0.02]"
          }`}
        >
          <div
            className={`flex flex-col items-start gap-4 border-b p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8 ${
              verdict.correct
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-red-500/20 bg-red-500/5"
            }`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${
                verdict.correct
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {verdict.correct ? "✓" : "✕"}
            </span>
            <div>
              <h2
                className={`text-2xl font-medium ${
                  verdict.correct ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {verdict.correct ? "Correct Accusation" : "Wrong Accusation"}
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {verdict.correct
                  ? "You identified the attacker. Well done, detective."
                  : "The evidence pointed elsewhere. Review the case report."}
              </p>
            </div>
          </div>

          {/* Case Facts */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            <div className="bg-[#0a0a0a] p-5">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Your accusation
              </div>
              <div className="text-sm font-medium text-white">
                {SUSPECTS[accused]?.name || accused}
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-5">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Actual attacker
              </div>
              <div className="text-sm font-medium text-red-400">
                {culprit.name}
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-5">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Evidence collected
              </div>
              <div className="text-sm font-medium text-white/80">
                {verdict.evidenceFound} / {TOTAL_EVIDENCE_POINTS}
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-5">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Rating
              </div>
              <div className="text-sm font-medium text-white/80">
                {verdict.rating}
              </div>
            </div>
          </div>
        </section>

        {/* Case Resolution Narrative */}
        <section className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8">
          <h3 className="mb-4 border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Case resolution
          </h3>
          <p className="text-[15px] leading-relaxed text-white/60">
            {culprit.name} ({culprit.role}) used an unrotated service account
            (<span className="font-mono text-white/90">svc-maint</span>) to log in from
            workstation {culprit.workstation} at 23:46, opened the blueprint one
            second later, and exfiltrated 48.2 MB to an external Tor exit node at
            23:47. A crypto payment landed in Marcus's wallet at 00:12, matching
            the 50k offer in the recovered dark-web chat. Marcus's own notes and
            hidden wallet seed file confirm both access and motive.
          </p>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="/studies"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform active:scale-95 hover:bg-white/90"
          >
            Explore case studies
          </Link>
          <Link
            href="/case"
            className="rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            Review case file
          </Link>
          <button
            onClick={() => {
              if (
                window.confirm("Reset and play again? This clears your progress.")
              ) {
                resetCase();
              }
            }}
            className="rounded-lg border border-red-500/20 bg-red-500/5 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            Play again
          </button>
        </div>
      </div>
    );
  }

  // ============ ACCUSATION FORM VIEW ============
  return (
    <div className="fade-in mx-auto max-w-4xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <CaseHeader title="Submit Verdict" icon="⚖">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-white/50">
              Accuse a suspect. Your detective rating depends on how much evidence
              you collected before submitting.
            </span>
            <span className="shrink-0 font-mono text-xs text-white/80">
              {progress.found}/{progress.total}
              <span className="ml-1.5 text-white/30">evidence logged</span>
            </span>
          </div>
        </CaseHeader>
      </div>

      {/* Progress Bar */}
      <section className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Evidence collected</span>
          <span className="text-white/80">{Math.round(progress.percent)}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-white/30">
          Higher evidence counts unlock better ratings. The threshold for
          "Elite Cyber Detective" is {TOTAL_EVIDENCE_POINTS > 10 ? 10 : TOTAL_EVIDENCE_POINTS} points.
        </p>
      </section>

      {/* Suspect Selection */}
      <section>
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Select the attacker
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.values(SUSPECTS).map((s) => {
            const isSelected = selected === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-white/40 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                    : "border-white/10 bg-[#0a0a0a] hover:border-white/20 hover:bg-white/[0.02]"
                }`}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-xs font-bold"
                  style={{
                    color: s.accent,
                    borderColor: s.accent + (isSelected ? "80" : "40"),
                    backgroundColor: s.accent + (isSelected ? "20" : "10"),
                  }}
                >
                  {s.avatar}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-medium ${
                      isSelected ? "text-white" : "text-white/80"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-white/40">
                    {s.role}
                  </span>
                </span>
                {isSelected && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-black">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Submit Action */}
      <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-red-200/60">
            {selected
              ? `You are about to accuse ${SUSPECTS[selected].name}. This is final.`
              : "Select a suspect to continue."}
          </p>
          <button
            onClick={submit}
            disabled={!selected}
            className={`shrink-0 rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
              selected
                ? "bg-red-500 text-white hover:bg-red-600 active:scale-95"
                : "cursor-not-allowed bg-white/5 text-white/20"
            }`}
          >
            Submit final verdict
          </button>
        </div>
      </section>

      {/* Warning if no evidence */}
      {discoveredEvidence.length === 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200/60">
          ⚠ You haven't logged any evidence yet. Submitting now will likely
          result in a "Misled" rating even if you guess correctly. Consider
          reviewing the files, messages, browser, and logs first.
        </div>
      )}
    </div>
  );
}