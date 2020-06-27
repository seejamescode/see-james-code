import styled, { css } from "styled-components";

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: linear-gradient(145deg, #f36dff, #cc5ce6);
  border: none;
  border-radius: none;
  color: inherit;
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0%;
  padding: calc(${({ theme }) => theme.padding} / 4)
    calc(${({ theme }) => theme.padding} / 2);
  position: relative;
  text-decoration: none;

  :after {
    border-radius: ${({ theme }) => theme.borderRadius};
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: box-shadow 200ms ${({ theme }) => theme.animation.hover};
    width: 100%;

    ${({ hideOuterBoxShadow }) =>
      !hideOuterBoxShadow &&
      css`
        box-shadow: 5px 5px 15px #d2d5d9, -5px -5px 15px #ffffff;
      `}
  }
  ${({ hideOuterBoxShadow }) =>
    !hideOuterBoxShadow &&
    css`
      :focus,
      :hover {
        :after {
          box-shadow: 10px 10px 45px #d2d5d9, -10px -10px 45px #ffffff;
        }
      }
    `}

  :active {
    background: ${({ theme }) => theme.colors.link};

    :after {
      box-shadow: inset 5px 5px 15px #c157d9, inset -5px -5px 15px #ff75ff;
    }
  }
`;

export default Button;
