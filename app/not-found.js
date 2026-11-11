// ============================================================
// app/not-found.js
// Custom 404 — "evidence not found" themed.
// ============================================================

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fade-in flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="panel max-w-md p-8">
        <div className="mb-3 text-4xl text-accent">▤</div>
        <div className="text-[10px] uppercase tracking-widest text-muted">
          Error 404 — Evidence Not Found
        </div>
        <h1 className="mt-2 text-xl font-bold text-ink">
          This file is missing from the case archive.
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          The page you requested doesn't exist or was wiped from storage. Return
          to the investigation hub and continue from there.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link href="/" className="btn btn-accent text-xs">
            ◈ Return to Hub
          </Link>
          <Link href="/case" className="btn text-xs">
            Open Case File
          </Link>
        </div>
      </div>
    </div>
  );
}