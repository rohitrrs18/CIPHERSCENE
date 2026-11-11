// ============================================================
// components/Navbar.js
// Top navigation with case progress + section links.
// ============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGameStore } from "@/lib/store";

const NAV_LINKS = [
  { href: "/case", label: "Case", icon: "◈" },
  { href: "/files", label: "Files", icon: "▤" },
  { href: "/messages", label: "Messages", icon: "✉" },
  { href: "/browser", label: "Browser", icon: "◐" },
  { href: "/logs", label: "Logs", icon: "▦" },
  { href: "/suspects", label: "Suspects", icon: "☰" },
  { href: "/studies", label: "Studies", icon: "❋" },
  { href: "/verdict", label: "Verdict", icon: "⚖" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { getProgress, resetCase } = useGameStore();
  const progress = getProgress();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
        {/* Top row: brand + progress */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent shadow-glow">
              ◆
            </span>
            <span className="text-sm font-semibold tracking-widest text-ink group-hover:text-accent">
              CIPHERSCENE
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Progress */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-[10px] uppercase tracking-widest text-muted">
                Evidence
              </span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-panelAlt">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span className="text-[11px] tabular-nums text-accent">
                {progress.found}/{progress.total}
              </span>
            </div>

            <button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.confirm("Reset the entire investigation? This clears all progress.")
                ) {
                  resetCase();
                }
              }}
              className="btn px-2 py-1 text-[11px]"
              title="Reset case"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border border-accent/40 bg-accent/10 text-accent"
                    : "border border-transparent text-muted hover:border-border hover:bg-panelAlt hover:text-ink"
                }`}
              >
                <span className="text-[13px]">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}