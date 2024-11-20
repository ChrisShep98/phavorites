"use client";
import React from "react";
import { ThemeProvider as MuiProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0a0a0a",
      },
    },
    components: {},
    typography: {
      fontFamily: outfit.style.fontFamily,
      overline: {
        color: "#0a0a0a",
        textTransform: "none",
        fontSize: "1rem",
      },
    },
  });

  return <MuiProvider theme={theme}>{children}</MuiProvider>;
};
