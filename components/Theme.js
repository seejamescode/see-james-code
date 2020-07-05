import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

const baseTheme = {
  animation: {
    hover: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  },
  borderRadius: "3rem",
  breakpoints: {
    md: "40rem",
    lg: "60rem",
    max: "80rem",
  },
  colors: {
    backdrop: "rgba(0, 0, 0, 0.5)",
    brands: {
      facebook: "#1877f2",
      linkedin: "#007bb5",
      reddit: "#ff5700",
      twitter: "#1da1f2",
    },
    fontTitle: "#f7faff",
  },
  maxWidth: "34rem",
  padding: "2rem",
  type: {
    small: {
      line: "1.25rem",
      size: "0.8125rem",
    },
    a: {
      line: "1.6875rem",
      size: "1rem",
    },
    b: {
      line: "2.0625rem",
      size: "1.25rem",
    },
    c: {
      line: "2.625rem",
      size: "1.625rem",
    },
    d: {
      line: "3.25rem",
      size: "2.0625rem",
    },
    e: {
      line: "4.0625rem",
      size: "2.625rem",
    },
  },
};

const darkTheme = {
  ...baseTheme,
  name: "dark",
  colors: {
    ...baseTheme.colors,
    accent: "#66FFE3",
    accentShadow: "#5be5cc",
    background: "#180619",
    backgroundShadow: "5px 5px 10px #2e0c30, -5px -5px 10px #3e1042",
    backgroundShadowHover: "5px 5px 20px #2e0c30, -5px -5px 20px #3e1042",
    body: "#090209",
    font: "#f7faff",
    fontBackground: "linear-gradient(145deg, #dee1e6, #ffffff)",
    fontBackgroundFocus:
      "inset 10px 10px 20px #d2d5d9, inset -10px -10px 20px #ffffff",
    focus: "#ffe366",
    link: "#E366FF",
    linkActive: "#ec99ff",
    linkBackground: "linear-gradient(145deg, #f36dff, #cc5ce6)",
    linkBackgroundHover: "linear-gradient(100deg, #f36dff, #cc5ce6)",
    linkHoverFont: "#f7faff",
    linkShadow: "0px 0px 8px #ec99ff",
    linkShadowActive:
      "inset 5px 5px 10px #c157d9, inset -5px -5px 10px #ff75ff",
  },
};

const lightTheme = {
  ...baseTheme,
  name: "light",
  colors: {
    ...baseTheme.colors,
    accent: "#00a8d6",
    accentShadow: "#0097c0",
    background: "#f7faff",
    backgroundShadow: "5px 5px 10px #d2d5d9, -5px -5px 10px #ffffff",
    backgroundShadowHover: "5px 5px 20px #d2d5d9, -5px -5px 20px #d2d5d9",
    body: "#fff",
    font: "#090209",
    fontBackground: "linear-gradient(145deg, #ffffff, #dee1e6)",
    fontBackgroundFocus:
      "inset 10px 10px 20px #d2d5d9, inset -10px -10px 20px #ffffff",
    focus: "#0A06E5",
    link: "#D600A8",
    linkActive: "#da19b0",
    linkBackground: "linear-gradient(145deg, #e91bbc, #c4179e)",
    linkBackgroundHover: "linear-gradient(100deg, #e91bbc, #c4179e)",
    linkShadow: "0px 0px 2px #c00097",
    linkShadowActive:
      "inset 5px 5px 10px #e91bbc, inset -5px -5px 10px #c4179e",
  },
};

const Themes = {
  dark: darkTheme,
  light: lightTheme,
};

export default function Theme({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const systemPreference =
        typeof mql.matches === "boolean" && mql.matches ? "dark" : "light";

      const preferredTheme =
        window.localStorage.getItem("seejamescode-theme") || systemPreference;

      if (preferredTheme !== theme) {
        setTheme(preferredTheme);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("seejamescode-theme", theme);
  }, [theme]);

  return (
    <ThemeProvider theme={Themes[theme] || lightTheme}>
      {children({
        toggleTheme: () => {
          setTheme(theme === "light" ? "dark" : "light");
        },
      })}
    </ThemeProvider>
  );
}
