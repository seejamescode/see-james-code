import styled from "styled-components";

const Input = styled.input`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.font};
  flex: 1;
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0;
  padding: ${({ theme }) => theme.padding.xs} ${({ theme }) => theme.padding.xs};
  transition: box-shadow 200ms ${({ theme }) => theme.animation.hover};

  :focus {
    box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.focus};
    outline: none;
  }
`;

export default Input;
