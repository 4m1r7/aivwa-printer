module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        main: "54rem",
      },
      height: {
        main: "41rem",
      },
      colors: {
        customBlue: "#2690EA",
        customGray: "#AAAAAA",
        customGreen: "#00D816",
        "b-color": "#D5D5D5",
      },
      fontSize: {
        "menu-title": ".84rem",
        "main-title": "1.875rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        menu: "0 0px 25px 0px rgba(0, 0, 0, 0.2)",
        main: "0 0px 60px 0px rgba(0, 0, 0, 0.12)",
        pane: "0 0px 15px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
