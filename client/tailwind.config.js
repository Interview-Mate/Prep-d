/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      // colors: {
      //   eerieblack: rgba(38, 38, 38, 1),
      //   darkcyan: rgba(84, 134, 135, 1),
      //   africanviolet: rgba(201, 139, 185, 1),
      //   seasalt: rgba(248, 247, 249, 1),
      //   white: rgba(252, 252, 252, 1),
      // },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
