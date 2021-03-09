import React, { useContext } from "react";
import MoonIcon from "@carbon/icons-react/lib/moon/20";
import SunIcon from "@carbon/icons-react/lib/sun/20";
import { ThemeContext } from "styled-components";
import ButtonToggle from "./button-toggle";

export default function ThemeToggle({ toggleTheme }) {
  const themeContext = useContext(ThemeContext);
  const isLight = themeContext.name === "light";

  return (
    <ButtonToggle
      aria-label={`Toggle to ${isLight ? "dark" : "light"} theme`}
      onClick={toggleTheme}
      type="button"
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </ButtonToggle>
  );
}
