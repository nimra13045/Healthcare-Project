"use client";

import { useState, type ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({
  children,
}: ThemeRegistryProps) {
  const [theme] = useState(() =>
    createTheme({
      palette: {
        primary: {
          main: "#07998F",
          dark: "#056F67",
          light: "#F0FDFA",
        },
        secondary: {
          main: "#15384B",
        },
        background: {
          default: "#FFFFFF",
        },
      },
      typography: {
        fontFamily: "Arial, Helvetica, sans-serif",
        button: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
      shape: {
        borderRadius: 12,
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}