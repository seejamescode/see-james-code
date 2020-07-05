import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import SearchToggle from "../components/SearchPopover";
import ThemeToggle from "../components/ThemeToggle";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
`;

const flicker = keyframes`
  0%, 2%, 4%, 50%, 52%, 54%, 100% {
    opacity: 1;
		
	}
	1%, 3%, 51%, 53% {
		opacity: 0.5;
	}
`;

const Name = styled.a`
  color: ${({ theme }) => theme.colors.link};
  font-size: ${({ theme }) => theme.type.c.size};
  margin: 0;
  position: relative;
  text-decoration: none;
  text-shadow: ${({ theme }) => theme.colors.linkShadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: scale(${({ isHomepage }) => (isHomepage ? 1.615 : 1)});
    transform-origin: top left;
    transition: transform 100ms ${({ theme }) => theme.animation.hover};
  }

  /* Media query disables easter egg for touch device clicks */
  @media (hover: hover) {
    :hover:after {
      animation: ${flicker} 8s linear;
      content: "[raw-hoot]";
      font-size: ${({ theme }) => theme.type.a.size};
      font-weight: 200;
      position: absolute;
      top: 0;
      transform: translate(0.75rem, 0.55rem);
      width: 6rem;
    }
  }
`;

const Toggles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
`;

export default function Header({ isHomepage, toggleTheme }) {
  return (
    <Container isHomepage={isHomepage}>
      <Link href="/" passHref>
        <Name isHomepage={isHomepage}>James Y Rauhut</Name>
      </Link>
      <Toggles>
        <ThemeToggle toggleTheme={toggleTheme} />
        <SearchToggle />
      </Toggles>
    </Container>
  );
}
