/** Crownwork — cream paper + turquoise (#0B8A8F), aligned with frank-dixon.github.io hub */
module.exports = {
  content: ["./docs/**/*.{html,js}", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Paper / craft surfaces (never near-black)
        void: "#FAF7F1",
        bg: "#F5F0E8",
        raised: "#FFFBF5",
        line: "#DDD5C8",
        // Ink
        ink: "#1C1916",
        lede: "#3F3A34",
        soft: "#5A534A",
        mute: "#7A7368",
        // Turquoise accent (personal-site world)
        sea: {
          DEFAULT: "#0B8A8F",
          bright: "#0D9FA5",
          dim: "#086F73",
        },
        // Supporting action / craft
        action: {
          DEFAULT: "#0B8A8F",
          bright: "#0D9FA5",
          dim: "#086F73",
        },
        // Warm cut / warning accents
        cut: {
          DEFAULT: "#B86A3C",
          soft: "#C4784A",
        },
        wood: "#6B5344",
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
      boxShadow: {
        paper: "0 1px 2px rgba(28, 25, 22, 0.04), 0 8px 24px rgba(28, 25, 22, 0.06)",
      },
    },
  },
  plugins: [],
};
