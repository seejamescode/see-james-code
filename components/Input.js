import styled from "styled-components";

const Input = styled.input`
  appearance: none;
  background: ${({ theme }) => theme.colors.fontBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  flex: 1;
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};
  margin: 0;
  padding: 0.5rem 1rem;
  transition: box-shadow 200ms ${({ theme }) => theme.animation.hover};

  :focus {
    background: ${({ theme }) => theme.colors.fontBackgroundFocus};
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.focus};
    outline: none;
  }
`;

export default Input;
