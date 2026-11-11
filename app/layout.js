// ============================================================
// app/layout.js
// Root layout: metadata, global CSS, Navbar wrapper.
// ============================================================

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Digital Crime Scene — Forensics Simulator",
  description:
    "A playable digital forensics simulator. Investigate a virtual cybercrime, examine files, recover deleted messages, and identify the attacker.",
  keywords: [
    "digital forensics",
    "cybercrime simulator",
    "DFIR",
    "investigation game",
    "case studies",
  ],
  authors: [{ name: "Digital Crime Scene" }],
};

export const viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
        <footer className="mx-auto mt-10 w-full max-w-7xl px-4 py-6 text-center text-[10px] uppercase tracking-widest text-muted">
          Digital Crime Scene · Educational Simulator · All interactive cases are
          fictional; case studies are real public records.
        </footer>
      </body>
    </html>
  );
}