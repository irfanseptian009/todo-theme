/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Pastikan path ini benar
  variants: {
    extend: {},
    animate: ["responsive", "motion-safe", "motion-reduce"],
  },
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Tambahkan animasi kustom
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
      },
    },
  },
  plugins: [],
};
