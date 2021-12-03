module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: "#e99301",
        footer: "#161719",
        name: "#7988a3",
        borderColor: "#4c4d50",
        navText: "#666666",
        filter: "#4d4d4d",
        background: "#1f2024",
        detialColor: "#dfdfdf",
        iconColor: "#79797c",
        cmnt: "#27282a",
      },
      height: {
        pic: "160px",
        picDetails: "320px",
        picDetail: "16rem",
      },
      width: {
        pic: "160px",
        picCont: "98%",
      },
      fontFamily: {
        lato: "Lato",
      },
      backgroundImage: {
        bgAd: "linear-gradient(39deg, #000000 0%, #1f2024 74%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
