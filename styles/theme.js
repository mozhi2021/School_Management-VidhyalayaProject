import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#e7ac3a",
      // main: "#144a75",
    },
    secondary: {
      main: "#337ab7",
    },
    background: {
      default: "#ffffff",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
