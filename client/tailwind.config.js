import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        app: "1024px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
