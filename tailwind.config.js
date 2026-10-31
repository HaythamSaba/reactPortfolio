/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e6f8ee",
          200: "#c9efd9",
          300: "#a7e6c1",
          400: "#82e0aa", // main green color
          500: "#5ecf91",
          600: "#3fb477",
          700: "#2f8d5c",
          800: "#256947",
          900: "#1b4b35",
        },
        secondary: {
          100: "#fef9e5",
          200: "#fcf0c2",
          300: "#fae594",
          400: "#f7dc6f", // main yellow color
          500: "#eac42b",
          600: "#d1a81d",
          700: "#a68215",
          800: "#7c6010",
          900: "#5b460b",
        },
        background: "#f0e7db",
        darkBackground: "#0c0c0c",
        textColor: "#0d1117",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        cormorant: ["Cormorant", "Georgia", "Times New Roman", "serif"],
      },
      // Canonical green/gold "card glow" family — one definition per shape,
      // replacing the scattered .shadow-box class + inline boxShadow styles.
      boxShadow: {
        glow: "0 0 10px #82e0aa, inset 0 0 10px #f7dc6f",
        "glow-soft": "0 0 20px rgba(130,224,170,0.08)",
        "glow-strong": "0 0 8px #82e0aa, 0 0 20px #82e0aa",
        "glow-wide": "0 0 50px rgba(130,224,171,0.363)",
      },
    },
  },
  plugins: [],
};
