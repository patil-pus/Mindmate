// pages/_app.js
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../app/globals.css";
import { GlobalProvider } from "../contexts/GlobalContext";

const theme = createTheme({
  palette: {
    primary: { main: "#1A73E8" }, // Light blue
    secondary: { main: "#FF5252" }, // Vibrant red-pink
    background: { default: "#f4f4f9" }, // Light grey background
    text: { primary: "#333333", secondary: "#757575" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: "700" },
    body1: { fontSize: "1.1rem", fontWeight: "500" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
            transform: "translateY(-2px)",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#1A73E8",
            },
            "&:hover fieldset": {
              borderColor: "#1565c0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF5252",
            },
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
