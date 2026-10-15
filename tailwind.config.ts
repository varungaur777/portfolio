import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070708", // page background
        panel: "#101012",
        line: "#1F1F22",
        bone: "#EDEAE4", // body text, never pure white
        dust: "#8A8780", // muted
        ember: "#FF6A1A", // accent
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.06em",
      },
      aspectRatio: {
        scope: "2.39 / 1",
        sheet: "27 / 40",
      },
      transitionTimingFunction: {
        film: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
