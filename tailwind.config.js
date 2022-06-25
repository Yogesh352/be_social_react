const colors = require("@material-ui/core/colors"); // for mui v4
// const colors = require('@mui/material/colors'); for mui v5

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
