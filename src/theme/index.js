import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCB05",
      contrastText: "#2A75BB",
    },
    secondary: {
      main: "#2A75BB",
      contrastText: "#FFCB05",
    },
    background: {
      default: "#ffffff",
      paper: "#3b3a3f", // definir cor
    },
    text: {
      primary: "#333333",
      secondary: "#656565",
    },
  },
  typography: {
    // fontFamily: "'Press Start 2P', 'Roboto', 'Arial', sans-serif", - font estilo gameboy
    fontFamily: "Russo One, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      color: "#333333"
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#FFCB05"
    },
    h5: {
      color: "#656565",
      fontSize: "1rem"
    },
    h6: {
      letterSpacing: 2,
      lineHeight: 2,
      fontSize: "0.8rem"
    },
    body1: {
      fontSize: "1.2rem",
      color: "#ffffff",
      lineHeight: 1.6
    },
    button: {
      textTransform: "uppercase",
      width: "100px",
      height: "100px"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100%",
          padding: "12px 24px",
          // fontWeight: "bold"
        },
        containedPrimary: {
          backgroundColor: "rgb(201, 243, 16)",
          color: "#333333",
          "&:hover": {
            backgroundColor: "#dd523b",
            color: "#ffffff",
          },
        },
        containedSecondary: {
          backgroundColor: "#2A75BB",
          color: "#FFCB05",
          "&:hover": {
            backgroundColor: "#1E5FA0",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
