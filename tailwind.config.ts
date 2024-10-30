import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        devanshSky: "#C3EBFA",
        devanshSkyLight: "#EDF9FD",
        devanshPurple: "#CFCEFF",
        devanshPurpleLight: "#F1F0FF",
        devanshYellow: "#FAE27C",
        devanshYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
