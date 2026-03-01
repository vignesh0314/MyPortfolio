/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
        },
      },
      animation: {
        floatSlow: "floatSlow 12s ease-in-out infinite",
        aurora1: "aurora1 18s ease-in-out infinite",
        aurora2: "aurora2 22s ease-in-out infinite",
        aurora3: "aurora3 16s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "ring-pulse": "ring-pulse 3s ease-in-out infinite",
        "progress-fill": "progress-fill 1s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-40px)" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.5" },
          "33%": { transform: "translate(60px,-60px) scale(1.15)", opacity: "0.7" },
          "66%": { transform: "translate(-40px,40px) scale(0.95)", opacity: "0.4" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.4" },
          "33%": { transform: "translate(-80px,60px) scale(1.2)", opacity: "0.6" },
          "66%": { transform: "translate(50px,-30px) scale(0.9)", opacity: "0.3" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.3" },
          "50%": { transform: "translate(40px,80px) scale(1.1)", opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "ring-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.5), 0 0 0 6px rgba(139,92,246,0.2)" },
          "50%": { boxShadow: "0 0 0 8px rgba(59,130,246,0.1), 0 0 0 16px rgba(139,92,246,0.05)" },
        },
        "progress-fill": {
          from: { width: "0%" },
          to: { width: "var(--progress-width)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xl: "24px",
        "2xl": "40px",
      },
    },
  },
  plugins: [],
};
