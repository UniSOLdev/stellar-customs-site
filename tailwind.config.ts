import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          black: "#020202",
          void: "#050508",
          surface: "#0c0c10",
          blue: "#00b4ff",
          "blue-deep": "#0066ff",
          orange: "#ff6b00",
          "orange-soft": "#ff8c42",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%), linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(0, 180, 255, 0.45), 0 0 80px rgba(0, 102, 255, 0.25)",
        "glow-orange": "0 0 30px rgba(255, 107, 0, 0.5), 0 0 60px rgba(255, 140, 66, 0.2)",
        "glow-button":
          "0 0 20px rgba(0, 180, 255, 0.4), 0 0 40px rgba(0, 180, 255, 0.15)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-subtle": "floatSubtle 8s ease-in-out infinite",
        ripple: "ripple 4s ease-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scroll-hint": "scrollHint 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        ripple: {
          "0%": { transform: "scaleX(1) scaleY(0.35)", opacity: "0.55" },
          "70%": { opacity: "0.15" },
          "100%": { transform: "scaleX(1.15) scaleY(0.5)", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(0, 180, 255, 0.35), 0 0 40px rgba(255, 107, 0, 0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 28px rgba(0, 180, 255, 0.55), 0 0 50px rgba(255, 107, 0, 0.28)",
          },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
