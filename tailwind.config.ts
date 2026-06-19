import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        card: "#0f0f11",
        "card-foreground": "#ffffff",
        primary: {
          DEFAULT: "#7b2cbf",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1a1a1c",
          foreground: "#a0a0a0",
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
