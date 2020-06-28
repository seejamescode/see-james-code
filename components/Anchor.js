import styled from "styled-components";

const Anchor = styled.a`
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 50%,
    ${({ theme }) => theme.colors.link} 50%
  );
  background-position: 0 -95%;
  background-size: auto 200%;
  color: inherit;
  position: relative;
  text-decoration: none;
  transition: background-position 100ms ${({ theme }) => theme.animation.hover},
    color 100ms ${({ theme }) => theme.animation.hover};

  :active {
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0) 50%,
      ${({ theme }) => theme.colors.linkActive} 50%
    );
  }

  :focus,
  :hover {
    background-position: 0 0%;
    color: ${({ theme }) => theme.colors.background};

    path {
      fill: ${({ theme }) => theme.colors.background};
    }
  }

  svg {
    fill: transparent;
    margin-right: 0.75rem;
    transform: translateY(0.25rem);

    path {
      fill: ${({ theme }) => theme.colors.font};
      transition: fill 100ms ${({ theme }) => theme.animation.hover};
    }
  }
`;

export default Anchor;
