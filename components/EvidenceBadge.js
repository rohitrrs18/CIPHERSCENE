// ============================================================
// components/EvidenceBadge.js
// Small reusable badges for evidence, risk, and clue states.
// ============================================================

"use client";

// Generic pill
export function Pill({ children, tone = "muted", className = "" }) {
  const tones = {
    muted: "border-border bg-panelAlt text-muted",
    accent: "border-accent/40 bg-accent/10 text-accent",
    danger: "border-danger/40 bg-danger/10 text-danger",
    success: "border-success/40 bg-success/10 text-success",
    warning: "border-warning/40 bg-warning/10 text-warning",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

// Risk badge for browser history (HIGH / MEDIUM / LOW)
export function RiskBadge({ risk }) {
  const tone =
    risk === "HIGH" ? "danger" : risk === "MEDIUM" ? "warning" : "success";
  return <Pill tone={tone}>{risk} RISK</Pill>;
}

// Suspicious-file indicator
export function SuspicionBadge({ suspicious }) {
  return suspicious ? (
    <Pill tone="danger">⚠ Suspicious</Pill>
  ) : (
    <Pill tone="muted">✓ Benign</Pill>
  );
}

// "Evidence discovered" indicator
export function DiscoveredBadge({ discovered }) {
  return discovered ? (
    <Pill tone="success">✓ Logged</Pill>
  ) : (
    <Pill tone="warning">◌ Unlogged</Pill>
  );
}

// Evidence points chip
export function PointsBadge({ points }) {
  if (!points) return null;
  return (
    <Pill tone="accent">
      +{points} {points === 1 ? "pt" : "pts"}
    </Pill>
  );
}

// Clue box shown after evidence is logged
export function ClueBox({ clue, onLog, logged }) {
  if (!clue) return null;
  return (
    <div className="mt-3 rounded-md border border-accent/30 bg-accent/5 p-3">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
        {logged ? "✓ Evidence Logged" : "◆ Clue Identified"}
      </div>
      <p className="text-xs leading-relaxed text-ink">{clue}</p>
      {!logged && onLog && (
        <button onClick={onLog} className="btn btn-accent mt-2 px-3 py-1 text-[11px]">
          Log as Evidence
        </button>
      )}
    </div>
  );
}

export default Pill;