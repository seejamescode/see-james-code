import styled from "styled-components";

const ButtonToggle = styled.button`
  align-items: center;
  background: none;
  padding: ${({ theme }) => theme.padding.xs};
  border: none;
  display: flex;

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

export default ButtonToggle;
