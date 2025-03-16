import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
// const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // single component styles
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
} satisfies Config;
