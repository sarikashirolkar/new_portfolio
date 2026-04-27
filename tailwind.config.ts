import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aurora: {
          navy: "#1c3468",
          royal: "#2741a8",
          violet: "#414494",
          mint: "#7fecc1",
          teal: "#3ab8a8",
          purple: "#7c3aed",
          dawn: "#f5b8d6",
          sky: "#a8d8ff",
        },
      },
      fontFamily: {
        name: ["var(--font-name)", "Ubuntu", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-display)", "Ubuntu", "Arial", "Helvetica", "sans-serif"],
        accent: ["var(--font-accent)", "Ubuntu", "Arial", "Helvetica", "sans-serif"],
        sans: ["var(--font-sans)", "Open Sans", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "Open Sans", "Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        "aurora-shift": "auroraShift 18s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        auroraShift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-3%, 2%, 0) scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
