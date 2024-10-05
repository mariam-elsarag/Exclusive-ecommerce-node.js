/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      header: ["Inter", "sans-serif"],
    },
    height: {
      full: "100dvh",
    },

    extend: {
      colors: {
        White: "#FAFAFA",
        primary: "#DB4444",
        buttonHover: "#E07575",
      },
    },
  },
  plugins: [],
};
