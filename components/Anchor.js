import React from "react";
import styled from "styled-components";

const Container = styled.a`
  color: ${({ theme }) => theme.colors.font};
  position: relative;
  text-decoration: none;
  transition: color 100ms ${({ theme }) => theme.animation.hover};

  :active {
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0) 50%,
      ${({ theme }) => theme.colors.linkActive} 50%
    );
  }

  :focus,
  :hover {
    span {
      background-position: 0 0%;
    }

    color: ${({ theme }) => theme.colors.background};
  }

  svg {
    fill: transparent;
    margin-right: 0.75rem;
    transform: translateY(0.25rem);

    path {
      fill: ${({ theme }) => theme.colors.font};
    }
  }
`;

const Text = styled.span`
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 50%,
    ${({ theme }) => theme.colors.link} 50%
  );
  background-position: 0 -95%;
  background-size: auto 200%;
  transition: background-position 100ms ${({ theme }) => theme.animation.hover};
`;

const Anchor = React.forwardRef(({ children, icon, ...props }, ref) => (
  <Container {...props} ref={ref}>
    {icon}
    <Text>{children}</Text>
  </Container>
));

export default Anchor;
