// ============================================================
// app/studies/[slug]/page.js
// Individual real case study detail page.
// ============================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { STUDIES, getStudy } from "@/lib/studiesData";

// Pre-render all 10 studies at build time (static, fast, no runtime cost)
export function generateStaticParams() {
  return STUDIES.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }) {
  const study = getStudy(params.slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} (${study.year}) — Digital Crime Scene`,
    description: study.summary.slice(0, 160),
  };
}

export default function StudyDetailPage({ params }) {
  const study = getStudy(params.slug);
  if (!study) notFound();

  const idx = STUDIES.findIndex((s) => s.id === study.id);
  const prev = idx > 0 ? STUDIES[idx - 1] : null;
  const next = idx < STUDIES.length - 1 ? STUDIES[idx + 1] : null;

  return (
    <div className="fade-in mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
      
      {/* Back link */}
      <div>
        <Link
          href="/studies"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to archive
        </Link>
      </div>

      {/* ============ HEADER ============ */}
      <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-white/60">
            {study.year}
          </span>
          <span className="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-white">
            Real Case
          </span>
          <span className="ml-auto text-white/30">
            Study {String(idx + 1).padStart(2, "0")} / {STUDIES.length}
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {study.title}
        </h1>
        <p className="mt-3 text-sm text-white/40">{study.type}</p>
      </header>

      {/* ============ MAIN CONTENT GRID ============ */}
      <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        
        {/* Left Column: Text Content */}
        <div className="space-y-10">
          {/* Summary */}
          <section>
            <h2 className="mb-4 border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Case summary
            </h2>
            <p className="text-[15px] leading-relaxed text-white/70">
              {study.summary}
            </p>
          </section>

          {/* Key Evidence */}
          <section>
            <h2 className="mb-4 border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Key digital evidence
            </h2>
            <ul className="space-y-3">
              {study.keyEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lesson */}
          <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Forensic lesson
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              {study.lesson}
            </p>
          </section>
        </div>

        {/* Right Column: Metadata Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          {/* Source */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
            <div className="border-b border-white/10 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Source record
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/80">{study.source}</p>
              {study.sourceUrl && (
                <a
                  href={study.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 break-all font-mono text-[11px] text-white/40 transition-colors hover:text-white"
                >
                  {study.sourceUrl.replace(/^https?:\/\//, '')}
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <nav className="flex flex-col gap-2">
            {prev ? (
              <Link
                href={`/studies/${prev.id}`}
                className="group flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.02]"
              >
                <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                  ← Previous
                </span>
                <span className="line-clamp-1 text-sm text-white/70 transition-colors group-hover:text-white">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="hidden lg:block" />
            )}

            {next ? (
              <Link
                href={`/studies/${next.id}`}
                className="group flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] p-4 text-right transition-colors hover:border-white/20 hover:bg-white/[0.02]"
              >
                <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                  Next →
                </span>
                <span className="line-clamp-1 text-sm text-white/70 transition-colors group-hover:text-white">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="hidden lg:block" />
            )}
          </nav>
        </aside>
      </div>
    </div>
  );
}