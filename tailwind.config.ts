import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#05051a",
        parchment: "#fdf5e6",
        ember: {
          100: "#ffe2a8",
          200: "#f5c56c",
          300: "#d28d37",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(245, 197, 108, 0.18)",
      },
      fontFamily: {
        serifStory: ["Georgia", "Times New Roman", "serif"],
      },
      backgroundImage: {
        paperGlow:
          "radial-gradient(circle at center, rgba(245,197,108,0.16), rgba(245,197,108,0.06) 28%, rgba(5,5,26,0) 64%)",
      },
    },
  },
  plugins: [],
};

export default config;
