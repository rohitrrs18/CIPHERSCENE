// ============================================================
// app/page.js
// Landing page — premium black forensics terminal.
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CASE } from "@/lib/caseData";
import { STUDIES } from "@/lib/studiesData";
import { useGameStore } from "@/lib/store";

const SECTIONS = [
  { href: "/files", label: "Examine Files", desc: "Inspect suspicious files on the seized workstation.", icon: "▤", code: "FS" },
  { href: "/messages", label: "Recover Messages", desc: "Restore deleted chat logs from simulated storage.", icon: "✉", code: "MSG" },
  { href: "/browser", label: "Browser History", desc: "Follow the digital trail across profiles.", icon: "◐", code: "WEB" },
  { href: "/logs", label: "Activity Logs", desc: "Cross-reference logins, access, and transfers.", icon: "▦", code: "LOG" },
  { href: "/suspects", label: "Suspects", desc: "Compare evidence against each alibi.", icon: "☰", code: "SUS" },
  { href: "/verdict", label: "Submit Verdict", desc: "Accuse a suspect using the evidence.", icon: "⚖", code: "VDT" },
];

/* ---------- hooks ---------- */

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function useCountUp(target, active, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

/* ---------- cursor spotlight ---------- */

function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 20%), rgba(255,255,255,0.045), transparent 60%)",
      }}
    />
  );
}

/* ---------- page ---------- */

export default function HomePage() {
  const { started, startCase, getProgress } = useGameStore();
  const progress = getProgress();

  const [heroRef, heroShown] = useReveal();
  const [hubRef, hubShown] = useReveal();
  const [studRef, studShown] = useReveal();
  const found = useCountUp(progress.found, heroShown);
  const pct = useCountUp(progress.percent, heroShown);

  return (
    <>
      <Spotlight />

      <div className="relative z-10 space-y-16 pb-16">
        {/* ================= HERO ================= */}
        <section ref={heroRef} className="relative pt-4">
          {/* ambient top glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(120,180,255,0.10), transparent 70%)",
            }}
          />

          <div
            className={`relative transition-all duration-700 ${
              heroShown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {/* meta rail */}
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest">
              <span className="flex items-center gap-2 text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
                LIVE
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-white/70">{CASE.id.toUpperCase()}</span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-red-400/90">{CASE.severity}</span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-white/40">{CASE.status}</span>
            </div>

            {/* title */}
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {CASE.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/40">
              {CASE.subtitle}
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-2xl text-[15px] leading-relaxed text-white/55">
                {CASE.brief}
              </p>

              {/* actions + stats */}
              <div className="flex flex-col gap-5 lg:items-end">
                <div className="flex flex-wrap gap-3">
                  <MagneticLink href="/case" primary>
                    {started ? "Continue investigation" : "Open case file"}
                  </MagneticLink>
                  <button
                    onClick={startCase}
                    className="group relative rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {started ? "Case in progress" : "Begin investigation"}
                  </button>
                </div>

                {started && (
                  <div className="flex items-center gap-4 font-mono text-[11px] text-white/40">
                    <div className="h-px w-24 bg-white/10 lg:w-40">
                      <div
                        className="h-full bg-gradient-to-r from-white/60 to-white/20"
                        style={{ width: `${pct}%`, transition: "width .3s" }}
                      />
                    </div>
                    <span className="tabular-nums text-white/60">
                      {found}/{progress.total}
                      <span className="ml-1.5 text-white/30">evidence</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODULE HUB ================= */}
        <section ref={hubRef}>
          <SectionHead
            kicker="Investigation"
            title="Modules"
            right={`${SECTIONS.length} available`}
            shown={hubShown}
          />

          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s, i) => (
              <ModuleTile key={s.href} {...s} index={i} shown={hubShown} />
            ))}
          </div>
        </section>

        {/* ================= CASE STUDIES ================= */}
        <section ref={studRef}>
          <SectionHead
            kicker="Archive"
            title="Case studies"
            right="View all"
            rightHref="/studies"
            shown={studShown}
          />

          <div className="mt-6 flex flex-col">
            {STUDIES.slice(0, 4).map((study, i) => (
              <StudyRow key={study.id} study={study} index={i} shown={studShown} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ================= subcomponents ================= */

function SectionHead({ kicker, title, right, rightHref, shown }) {
  return (
    <div
      className={`flex items-end justify-between border-b border-white/10 pb-3 transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          {kicker}
        </span>
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
      {right &&
        (rightHref ? (
          <Link
            href={rightHref}
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40 transition-colors hover:text-white"
          >
            {right}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <span className="font-mono text-[11px] text-white/30">{right}</span>
        ))}
    </div>
  );
}

function ModuleTile({ href, label, desc, icon, code, index, shown }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--ty", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      style={{ transitionDelay: `${index * 55}ms` }}
      className={`group relative isolate overflow-hidden bg-[#070707] p-5 transition-all duration-500 hover:bg-[#0c0c0c] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {/* cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--tx,50%) var(--ty,50%), rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
      {/* top scan line on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/25">
          {code}
        </span>
        <span className="font-mono text-[10px] text-white/15">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-sm text-white/50 transition-colors duration-300 group-hover:border-white/25 group-hover:text-white">
          {icon}
        </span>
        <h3 className="text-[15px] font-medium text-white/90 transition-colors group-hover:text-white">
          {label}
        </h3>
      </div>

      <p className="relative mt-3 text-xs leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/50">
        {desc}
      </p>

      <div className="relative mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/0 transition-colors duration-300 group-hover:text-white/40">
        Enter module
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}

function StudyRow({ study, index, shown }) {
  return (
    <Link
      href={`/studies/${study.id}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`group relative flex items-center gap-5 border-b border-white/[0.06] py-4 transition-all duration-500 hover:border-white/20 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {/* left accent on hover */}
      <span className="absolute left-0 top-0 h-full w-px scale-y-0 bg-white/50 transition-transform duration-300 group-hover:scale-y-100" />

      <span className="w-12 shrink-0 font-mono text-[11px] text-white/30 transition-colors group-hover:text-white/60">
        {study.year}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">
          {study.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-white/30 transition-colors group-hover:text-white/45">
          {study.summary}
        </p>
      </div>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/0 transition-colors group-hover:text-white/40">
        Read
      </span>
    </Link>
  );
}

function MagneticLink({ href, children, primary }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    el.style.setProperty("--tx", `${e.clientX - r.left}px`);
    el.style.setProperty("--ty", `${e.clientY - r.top}px`);
  };
  const reset = () => {
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative isolate inline-flex items-center overflow-hidden rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-transform duration-150 ease-out will-change-transform"
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--tx,50%) var(--ty,50%), rgba(0,0,0,0.10), transparent 70%)",
        }}
      />
      <span className="relative">{children}</span>
      <span className="relative ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}