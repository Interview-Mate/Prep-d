/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "eerie-black": "#262626ff",
        "dark-cyan": "#4fbbbd",
        "african-violet": {
          400: "#FFBFEF",
          900: "#c98bb9ff",
        },
        // prettier-ignore
        "seasalt": "#f8f7f9ff",
        white: "#fcfcfcff",
      },
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
