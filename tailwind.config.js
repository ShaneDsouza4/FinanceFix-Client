/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        customHsl: {
          warning: "hsl(4 66% 63%)",
          bkg: "hsl(357, 74%, 96%)",
          text: "hsl(185 26% 9%)",
          muted: "hsl(183 8% 55%)",
          accent: "hsl(360 74% 41%)",
          warningopacity: "hsl(4 66% 63% /.1)",
          blueopacity: "hsl(183 74% 44% / .04)",
          accentopacity: "hsl(183 74% 44% / .04)",
          amberopacity: "hsl(26 90.5% 37.1% / 0.04)",
        },
      },
    },
  },
  plugins: [],
};
