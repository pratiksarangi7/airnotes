/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080",
        "primary-content": "#FBFBE0",
        "primary-dark": "#004d4d",
        "primary-light": "#00b3b3",

        secondary: "#EA454C",
        "secondary-content": "#ffffff",
        "secondary-dark": "#e21a22",
        "secondary-light": "#ef7378",

        background: "#eff1f1",
        foreground: "#fbfbfb",
        border: "#dde2e2",

        copy: "#232929",
        "copy-light": "#5e6e6e",
        "copy-lighter": "#849595",

        success: "#008000",
        warning: "#808000",
        error: "#800000",

        "success-content": "#80ff80",
        "warning-content": "#ffff80",
        "error-content": "#ff8080",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
