import styled from "styled-components";

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.linkBackground};
  border: none;
  border-radius: none;
  box-shadow: ${({ hideOuterBoxShadow, theme }) =>
    !hideOuterBoxShadow && theme.colors.backgroundShadow};
  color: ${({ theme }) => theme.colors.background};
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
