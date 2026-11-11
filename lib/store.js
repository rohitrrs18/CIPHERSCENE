// ============================================================
// lib/store.js
// Zustand store — client-side investigation state.
// Tracks discovered evidence, accusation, verdict, and progress.
// Persists to localStorage so progress survives refreshes.
// ============================================================

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CASE, TOTAL_EVIDENCE_POINTS } from "./caseData";

export const useGameStore = create(
  persist(
    (set, get) => ({
      // ---- Investigation state ----
      started: false,
      discoveredEvidence: [], // array of evidence ids
      accused: null, // suspect id or null
      verdict: null, // { correct: bool, rating: string, evidenceFound: number, total: number }

      // ---- Actions ----
      startCase: () => set({ started: true }),

      discoverEvidence: (id) => {
        const { discoveredEvidence } = get();
        if (discoveredEvidence.includes(id)) return;
        set({ discoveredEvidence: [...discoveredEvidence, id] });
      },

      hasDiscovered: (id) => get().discoveredEvidence.includes(id),

      accuse: (suspectId) => {
        const { discoveredEvidence } = get();
        const evidenceFound = discoveredEvidence.length;
        const correct = suspectId === CASE.culprit;

        // Rating based on evidence + accuracy
        let rating;
        if (!correct) {
          rating = "Misled";
        } else if (evidenceFound >= 10) {
          rating = "Elite Cyber Detective";
        } else if (evidenceFound >= 7) {
          rating = "Senior Analyst";
        } else if (evidenceFound >= 4) {
          rating = "Investigator";
        } else {
          rating = "Rookie";
        }

        set({
          accused: suspectId,
          verdict: {
            correct,
            rating,
            evidenceFound,
            total: TOTAL_EVIDENCE_POINTS,
          },
        });
      },

      resetCase: () =>
        set({
          started: false,
          discoveredEvidence: [],
          accused: null,
          verdict: null,
        }),

      // ---- Derived ----
      getProgress: () => {
        const { discoveredEvidence } = get();
        const pct =
          TOTAL_EVIDENCE_POINTS > 0
            ? Math.round((discoveredEvidence.length / TOTAL_EVIDENCE_POINTS) * 100)
            : 0;
        return {
          found: discoveredEvidence.length,
          total: TOTAL_EVIDENCE_POINTS,
          percent: Math.min(pct, 100),
        };
      },
    }),
    {
      name: "dcs-game-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        started: state.started,
        discoveredEvidence: state.discoveredEvidence,
        accused: state.accused,
        verdict: state.verdict,
      }),
    }
  )
);