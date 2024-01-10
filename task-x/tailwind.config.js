/** @type {import('tailwindcss').Config} */
import { colorStyle } from "./src/style";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: colorStyle,
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
