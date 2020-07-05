import styled from "styled-components";

const Button = styled.button`
  background: ${({ ghost, theme }) =>
    ghost ? "none" : theme.colors.linkBackground};
  border: ${({ ghost, theme }) =>
    ghost ? `1px solid ${theme.colors.link}` : "none"};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ ghost, hideOuterBoxShadow, theme }) =>
    !hideOuterBoxShadow &&
    (ghost
      ? `${theme.colors.linkShadow}, inset ${theme.colors.linkShadow}`
      : theme.colors.backgroundShadow)};
  color: ${({ ghost, theme }) => (ghost ? "inherit" : theme.colors.background)};
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0%;
  padding: calc(${({ theme }) => theme.padding} / 4)
    calc(${({ theme }) => theme.padding} / 2);
  position: relative;
  text-decoration: none;
  transition: background 100ms ${({ theme }) => theme.animation.hover},
    box-shadow 100ms ${({ theme }) => theme.animation.hover};

  :focus,
  :hover {
    background: ${({ theme }) => theme.colors.linkBackgroundHover};
    color: ${({ theme }) => theme.colors.background};
  }

  :hover {
    box-shadow: ${({ hideOuterBoxShadow, theme }) =>
      !hideOuterBoxShadow && theme.colors.backgroundShadowHover};
  }

  :focus {
    box-shadow: ${({ hideOuterBoxShadow, theme }) =>
      `inset 0px 0px 0px 3px ${theme.colors.focus}${
        !hideOuterBoxShadow ? `, ${theme.colors.backgroundShadowHover}` : ""
      }`};
    outline: none;
  }

  :active {
    box-shadow: ${({ theme }) => theme.colors.linkShadowActive};
  }
`;

export default Button;
