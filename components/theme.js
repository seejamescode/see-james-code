import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "next-dark-mode";

const baseTheme = {
  animation: {
    hover: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  },
  borderRadius: ".5rem",
  breakpoints: {
    md: "40rem",
    lg: "60rem",
    max: "70rem",
  },
  colors: {
    brands: {
      facebook: "#1877f2",
      linkedin: "#007bb5",
      reddit: "#ff5700",
      twitter: "#1da1f2",
    },
  },
  maxWidth: "60ch",
  maxWidthHeader: "25ch",
  padding: {
    xxs: ".25rem",
    xs: ".5rem",
    sm: "1rem",
    md: "2rem",
    lg: "4rem",
    xl: "8rem",
    xxl: "16rem",
  },
  type: {
    small: {
      line: "1.6875rem",
      size: "1rem",
    },
    a: {
      line: "2.0625rem",
      size: "1.25rem",
    },
    b: {
      line: "2.625rem",
      size: "1.625rem",
    },
    c: {
      line: "3.25rem",
      size: "2.0625rem",
    },
    d: {
      line: "4.0625rem",
      size: "2.625rem",
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
    backdrop: "rgba(0, 0, 0, 0.6)",
    background: "#180619",
    backgroundShadow: "0px 0px 10px #180619, 0px 0px 2px #180619",
    backgroundShadowLarge: "5px 5px 15px #2e0c30, -5px -5px 15px #3e1042",
    backgroundShadowHover: "0px 0px 10px #180619, 0px 5px 10px #180619",
    backgroundShadowHoverSmall: "5px 5px 15px #2e0c30, -5px -5px 15px #3e1042",
    dropShadow: "drop-shadow(5px 5px 5px rgba(46, 12, 48, .7))",
    body: "#22262a",
    font: "#f7faff",
    fontBackground: "linear-gradient(145deg, #dee1e6, #ffffff)",
    fontBackgroundFocus:
      "inset 10px 10px 20px #d2d5d9, inset -10px -10px 20px #ffffff",
    focus: "#ffe366",
    link: "#F2B8FF",
    linkActive: "#ec99ff",
    linkBackground: "linear-gradient(145deg, #f36dff, #cc5ce6)",
    linkBackgroundHover: "linear-gradient(100deg, #f36dff, #cc5ce6)",
    linkHoverFont: "#f7faff",
    linkShadow: "0px 0px 20px #ec99ff",
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
    backdrop: "rgba(255, 255, 255, 0.6)",
    background: "#f7faff",
    backgroundShadow: "5px 5px 5px #d2d5d9, -5px -5px 5px #ffffff",
    backgroundShadowLarge: "5px 5px 15px #d2d5d9, -5px -5px 15px #ffffff",
    backgroundShadowHover: "5px 5px 30px #d2d5d9, -5px -5px 30px #d2d5d9",
    backgroundShadowHoverSm: "5px 5px 15px #d2d5d9, -5px -5px 15px #d2d5d9",
    dropShadow: "drop-shadow(5px 5px 5px rgba(0, 0, 0, .7))",
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

const Theme = ({ children }) => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();
  const [mounted, setMounted] = React.useState(false);
  const theme = darkModeActive ? darkTheme : lightTheme;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <ThemeProvider theme={theme}>
      {children({
        toggleTheme: darkModeActive ? switchToLightMode : switchToDarkMode,
      })}
    </ThemeProvider>
  );

  // Prevents SSR flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default Theme;
