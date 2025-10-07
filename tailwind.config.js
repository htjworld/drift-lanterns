/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-[clamp(28px,7vw,56px)]",
    "drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]",
    "min-h-[50vh]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}