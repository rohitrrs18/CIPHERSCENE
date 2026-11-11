/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255,255,255,0.10)",
      panel: "rgba(255,255,255,0.02)",
      panelAlt: "rgba(255,255,255,0.04)",
      ink: "rgba(255,255,255,0.92)",
      muted: "rgba(255,255,255,0.55)",
      accent: "#ffffff",
      danger: "#f87171",
      success: "#34d399",
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.25), 0 0 24px -6px rgba(34, 211, 238, 0.4)",
        panel: "0 8px 30px -12px rgba(0, 0, 0, 0.8)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        scan: "scan 4s linear infinite",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite",
        flicker: "flicker 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};