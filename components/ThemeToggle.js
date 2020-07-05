import React, { useContext } from "react";
import MoonIcon from "@carbon/icons-react/lib/moon/20";
import SunIcon from "@carbon/icons-react/lib/sun/20";
import styled, { ThemeContext } from "styled-components";

const ToggleButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  padding: 0;

  svg {
    fill: ${({ theme }) => theme.colors.font};
  }

  :focus,
  :hover {
    svg {
      fill: ${({ theme }) => theme.colors.link};
    }
  }

  :active {
    svg {
      fill: ${({ theme }) => theme.colors.linkActive};
    }
  }
`;

export default function ThemeToggle({ toggleTheme }) {
  const themeContext = useContext(ThemeContext);
  const isLight = themeContext.name === "light";

  return (
    <ToggleButton
      aria-label={`Toggle to ${isLight ? "dark" : "light"} theme`}
      onClick={toggleTheme}
      type="button"
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </ToggleButton>
  );
}
