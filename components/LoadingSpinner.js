// ============================================================
// components/LoadingSpinner.js
// Terminal-style loading indicator.
// ============================================================

"use client";

export default function LoadingSpinner({ label = "Analyzing…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 animate-pulseSoft rounded-full bg-accent" />
        <span
          className="h-2 w-2 animate-pulseSoft rounded-full bg-accent"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="h-2 w-2 animate-pulseSoft rounded-full bg-accent"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}