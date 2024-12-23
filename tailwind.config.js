/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        MT: "Montserrat",
        MK: "Mako",
        HM: "Hind Madurai",
      },
      fontSize: {
        title: "2rem",
        subtitle: "1.5rem",
        body: "1rem",
      },
      colors: {
        primary: {
          100: "#E8fAf8",
          200: "#BAEFEA",
          300: "#8CE5DC",
          400: "#5EDACE",
          500: "#30CFC0",
          600: "#25A196",
          700: "#1A736B",
          800: "#104540",
          900: "#051715",
        },
        "ui-gray": {
          100: "#EFF2F1",
          200: "#D0D9D6",
          300: "#B1BFBB",
          400: "#92A69F",
          500: "#738C84",
          600: "#596D67",
          700: "#404E49",
          800: "#262F2C",
          900: "#0D100F",
        },
        success: {
          100: "#E7FBEF",
          200: "#B6F3D0",
          300: "#86EAB0",
          400: "#55E291",
          500: "#23CE6B",
          600: "#1DA958",
          700: "#15793F",
          800: "#0C4926",
          900: "#04180D",
        },
        warning: {
          100: "#FEFAE4",
          200: "#FCF0AD",
          300: "#FAE576",
          400: "#F9DB3F",
          500: "#EFCA08",
          600: "#C0A206",
          700: "#897405",
          800: "#524503",
          900: "#1B1701",
        },
        danger: {
          100: "#FAEAE8",
          200: "#F0C1B9",
          300: "#E5988B",
          400: "#DB6F5D",
          500: "#D1462F",
          600: "#A23624",
          700: "#74261A",
          800: "#46170F",
          900: "#170805",
        },
      },
    },
  },
  plugins: [],
};
