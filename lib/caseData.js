// ============================================================
// lib/caseData.js
// Loader wrapper around caseData.json.
// All components import from here — never from the JSON directly.
// To swap in real extracted data (e.g. from Szechuan Sauce /
// CFReDS), just replace lib/caseData.json. No component changes.
// ============================================================

import data from "./caseData.json";

export const CASE = data.case;
export const SUSPECTS = data.suspects;
export const FILES = data.files;
export const MESSAGES = data.messages;
export const BROWSER_HISTORY = data.browserHistory;
export const LOGS = data.logs;

// Convenience: total evidence points available in the case
export const TOTAL_EVIDENCE_POINTS = [
  ...FILES,
  ...MESSAGES,
  ...BROWSER_HISTORY,
  ...LOGS,
].reduce((sum, item) => sum + (item.evidencePoints || 0), 0);

// Convenience: which evidence items point to the culprit
export const CULPRIT_ID = CASE.culprit;
export const CULPRIT = SUSPECTS[CULPRIT_ID];

// Helper: get all evidence items (for the evidence ledger / verdict page)
export function getAllEvidence() {
  return [
    ...FILES.map((f) => ({ ...f, kind: "file" })),
    ...MESSAGES.map((m) => ({ ...m, kind: "message" })),
    ...BROWSER_HISTORY.map((b) => ({ ...b, kind: "browser" })),
    ...LOGS.map((l) => ({ ...l, kind: "log" })),
  ];
}

// Helper: find a single file by id
export function getFile(id) {
  return FILES.find((f) => f.id === id) || null;
}

// Helper: find a single message by id
export function getMessage(id) {
  return MESSAGES.find((m) => m.id === id) || null;
}

// Helper: find a single browser entry by id
export function getBrowserEntry(id) {
  return BROWSER_HISTORY.find((b) => b.id === id) || null;
}

// Helper: find a single log by id
export function getLog(id) {
  return LOGS.find((l) => l.id === id) || null;
}