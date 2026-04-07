import type { Config } from "tailwindcss";

// Note: In Tailwind v4, most config moved to CSS via @theme.
// This file is kept for compatibility only.
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
