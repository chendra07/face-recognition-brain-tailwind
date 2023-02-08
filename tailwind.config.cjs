/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "scr-1400-more": { min: "1400px" }, //@media (min-width: 1400px) { ... }
        "scr-1400-less": { max: "1400px" }, //@media (max-width: 1400px) { ... }
        "scr-1200-less": { max: "1200px" },
        "scr-1000-less": { max: "1000px" },
        "scr-800-less": { max: "800px" },
        "scr-700-less": { max: "700px" },
        "scr-600-less": { max: "600px" },
        "scr-500-less": { max: "500px" },
        "scr-400-less": { max: "400px" },
        "scr-300-less": { max: "300px" },
      },
    },
  },
  plugins: [
    // plugin(function ({ addBase }) {
    //   addBase({
    //     html: { fontSize: "62.5%" },
    //     //default browser fontsize: 16
    //     //16 * 62.5% == 10px (1rem === 10px)
    //   });
    // }),
  ],
  corePlugins: {
    preflight: false,
  },
};
