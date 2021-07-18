import styled, { css } from "styled-components";

const Button = styled.button`
  background: ${({ underline, theme }) =>
    underline ? "none" : theme.colors.linkBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ underline, theme }) =>
    underline ? "inherit" : theme.colors.background};
  font-size: ${({ underline, theme }) =>
    underline ? theme.type.a.size : theme.type.small.size};
  font-weight: 600;
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0%;
  padding: ${({ theme }) => `${theme.padding.xs} ${theme.padding.sm}`};
  position: relative;
  text-decoration: none;
  transition: ${({ theme, underline }) => css`background 300ms ${
    theme.animation.hover
  },
    ${underline ? null : `, transform 100ms ${theme.animation.hover}`}`};

  :after {
    background: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.linkBackground : "none"};
    content: "";
    bottom: 0;
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  :focus,
  :hover {
    background: ${({ underline, theme }) =>
      underline ? "none" : theme.colors.linkBackgroundHover};
    color: ${({ underline, theme }) =>
      underline ? "inherit" : theme.colors.background};
  }

  :hover {
    :after {
      background: ${({ theme, underline }) =>
        underline ? theme.colors.linkBackground : "none"};
    }
  }

  :focus {
    box-shadow: ${({ hideOuterBoxShadow, underline, theme }) =>
      !underline &&
      `inset 0px 0px 0px 3px ${theme.colors.focus}${
        !hideOuterBoxShadow ? `, ${theme.colors.backgroundShadowHoverSm}` : ""
      }`};
    outline: none;

    :after {
      background: ${({ theme, underline }) =>
        underline ? theme.colors.focus : "none"};
    }
  }

  :active {
    box-shadow: ${({ theme, underline }) =>
      !underline && theme.colors.linkShadowActive};
  }
`;

export default Button;
