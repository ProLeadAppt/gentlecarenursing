import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pawsome & Co. palette — warm, premium, approachable
        "pw-sage": {
          50: "#f4f7f3",
          100: "#e5ebe3",
          200: "#cdd9c9",
          300: "#adc2a6",
          400: "#8baa7f",
          DEFAULT: "#6b9360",
          500: "#6b9360",
          600: "#537548",
          700: "#435e3b",
          800: "#384d32",
          900: "#2f402b",
        },
        "pw-teal": {
          50: "#f0fafa",
          100: "#d0f0f0",
          200: "#a3e0e1",
          300: "#6ec8ca",
          400: "#3daeb2",
          DEFAULT: "#1b6b6d",
          500: "#1b6b6d",
          600: "#165858",
          700: "#144848",
          800: "#133a3b",
          900: "#0f2e2f",
        },
        "pw-cream": {
          DEFAULT: "#fdf6ec",
          warm: "#f5ebd8",
          light: "#fefaf4",
        },
        "pw-terracotta": {
          50: "#fdf3ed",
          100: "#fae2d3",
          200: "#f4c2a5",
          300: "#ec9a6e",
          DEFAULT: "#c4704b",
          400: "#c4704b",
          500: "#b25c38",
          600: "#9a4a2d",
          700: "#7d3c26",
          800: "#653222",
          900: "#542a1e",
        },
        "pw-amber": {
          50: "#fdf8eb",
          100: "#faedcc",
          200: "#f5da99",
          300: "#efc35d",
          DEFAULT: "#d4a03c",
          400: "#d4a03c",
          500: "#c08a24",
          600: "#a4701c",
          700: "#83561a",
          800: "#6b461b",
          900: "#593a1a",
        },
        "pw-charcoal": {
          DEFAULT: "#2d2926",
          light: "#3d3835",
          dark: "#1e1b19",
        },
        "pw-surface": "#ffffff",
        "pw-elevated": "#fbf7f0",
        "pw-muted": "#736e62",
        "pw-subtle": "#b5afa3",
        "pw-border": "#e8e0d4",
        "pw-berry": {
          50: "#fdf2f4",
          100: "#fbe5e8",
          200: "#f7ccd3",
          300: "#f1a3af",
          400: "#e87285",
          DEFAULT: "#842833",
          500: "#842833",
          600: "#6b2028",
          700: "#561a20",
          800: "#48171c",
          900: "#3d161b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3rem, 7vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(2.25rem, 5vw, 4rem)",
          { lineHeight: "1.0", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(1.75rem, 3.5vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        section: [
          "clamp(1.5rem, 2.5vw, 2rem)",
          { lineHeight: "1.25" },
        ],
      },
      maxWidth: {
        "pw-container": "1200px",
        "pw-narrow": "800px",
        "pw-wide": "1400px",
      },
      spacing: {
        section: "7rem",
        "section-sm": "5rem",
        "section-lg": "9rem",
        "section-xl": "10rem",
      },
      boxShadow: {
        pw: "0 2px 8px rgba(107,147,96,0.08), 0 8px 24px rgba(107,147,96,0.04)",
        "pw-lg":
          "0 4px 16px rgba(107,147,96,0.1), 0 16px 48px rgba(107,147,96,0.06)",
        "pw-xl":
          "0 8px 32px rgba(107,147,96,0.12), 0 24px 64px rgba(107,147,96,0.08)",
        "glow-sage": "0 0 24px rgba(107,147,96,0.15)",
        "glow-teal": "0 0 24px rgba(27,107,109,0.15)",
        "glow-berry": "0 0 24px rgba(132,40,51,0.15)",
        "glow-terracotta": "0 0 24px rgba(196,112,75,0.15)",
        "glow-amber": "0 0 24px rgba(212,160,60,0.2)",
        "card-hover":
          "0 8px 24px rgba(107,147,96,0.08), 0 20px 48px rgba(107,147,96,0.06)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(107,147,96,0.3)" },
          "50%": { boxShadow: "0 0 32px rgba(107,147,96,0.5)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.4)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      backgroundImage: {
        "radial-spotlight":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(107,147,96,0.08) 0%, transparent 60%)",
        "gradient-section":
          "linear-gradient(180deg, #fdf6ec 0%, #ffffff 50%, #fdf6ec 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #2d2926 0%, #1e1b19 50%, #2d2926 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
