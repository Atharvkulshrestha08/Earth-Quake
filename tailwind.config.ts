import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0e6d6",
          100: "#dcc7ae",
          200: "#c4a585",
          300: "#a88868",
          400: "#8b6b4d",
          500: "#6b4c3a",
          600: "#4a3228",
          700: "#2d1f15",
          800: "#1a0f0a",
          900: "#0f0a06",
        },
        alert: {
          low: "#22c55e",
          medium: "#f59e0b",
          high: "#ef4444",
          critical: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shake": "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
