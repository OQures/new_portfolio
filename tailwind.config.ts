import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ascend: {
          bg: "#f6f9fc",
          "bg-alt": "#ffffff",
          muted: "#f1f5f9",
          surface: "#ffffff",
          border: "#e3e8ef",
          ink: "#0a2540",
          slate: "#425466",
          "slate-soft": "#697386",
          cyan: "#5AC8FA",
          "cyan-dark": "#2f9fd4",
          accent: "#635bff",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 50px 100px -20px rgba(50,50,93,0.12), 0 30px 60px -30px rgba(0,0,0,0.18)",
        "card-sm": "0 13px 27px -5px rgba(50,50,93,0.1), 0 8px 16px -8px rgba(0,0,0,0.12)",
        nav: "0 1px 0 rgba(0,0,0,0.04)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        pulseSlow: "pulseGlow 8s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.75s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.55s ease-out both",
        "scale-in": "scaleIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
        "nav-enter": "navSlide 0.55s cubic-bezier(0.16,1,0.3,1) both",
        "drawer-enter": "drawerDown 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "shimmer-slow": "meshShift 14s ease-in-out infinite",
        "bar-grow": "barGrow 0.95s cubic-bezier(0.16,1,0.3,1) both",
        "bar-grow-y": "barGrowY 0.95s cubic-bezier(0.16,1,0.3,1) both",
        "headline-reveal": "headlineReveal 0.95s cubic-bezier(0.16,1,0.3,1) both",
        "hero-gradient-sweep": "heroGradientSweep 1.35s cubic-bezier(0.16,1,0.3,1) both",
        "service-modal-rise": "serviceModalRise 0.55s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(1%, -1%) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(1rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.96) translateY(6px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        navSlide: {
          from: { opacity: "0", transform: "translateY(-0.6rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drawerDown: {
          from: { opacity: "0", transform: "translateY(-0.35rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        meshShift: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        barGrow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        barGrowY: {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
        headlineReveal: {
          from: { clipPath: "inset(-0.14em 100% -0.14em 0)" },
          to: { clipPath: "inset(-0.14em 0% -0.14em 0)" },
        },
        heroGradientSweep: {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        serviceModalRise: {
          from: { opacity: "0", transform: "translateY(18px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
