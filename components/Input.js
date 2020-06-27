import styled from "styled-components";

const Input = styled.input`
  appearance: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 5px 5px 15px #d9d9d9, inset -5px -5px 15px #ffffff;
  flex: 1;
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};
  margin: 0;
  padding: 0.5rem 1rem;
  transition: box-shadow 200ms ${({ theme }) => theme.animation.hover};

  :focus {
    box-shadow: inset 0px 0px 0px 2px blue, inset 5px 5px 15px #d9d9d9,
      inset -5px -5px 15px #ffffff;
    outline: none;
  }
`;

export default Input;
