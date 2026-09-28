/** Crownwork — cool spectrum tokens aligned with frank-dixon.github.io hub */
module.exports = {
  content: ["./docs/**/*.{html,js}", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        void: "#050608",
        bg: "#0A0C10",
        raised: "#141820",
        line: "#243041",
        ink: "#E6EAF0",
        lede: "#B7C0CE",
        soft: "#A8B2C2",
        mute: "#8B93A3",
        sea: {
          DEFAULT: "#5FA8A0",
          bright: "#7BC4BC",
          dim: "#3A6B66",
        },
        action: {
          DEFAULT: "#6B7FD7",
          bright: "#8A9AE8",
          dim: "#4A5BA8",
        },
        cut: {
          DEFAULT: "#E8A87C",
          soft: "#C4784A",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        brand: "0.08em",
        wide2: "0.14em",
      },
      animation: {
        "panel-in": "panel-in 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)",
        "pulse-cut": "pulse-cut 2s ease-in-out infinite",
      },
      keyframes: {
        "panel-in": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-cut": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        crown: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
