import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import SearchToggle from "../components/search-toggle";
import Layout from "./layout";
import ThemeToggle from "./theme-toggle";

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.padding.sm};
  }
`;

const Container = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.padding.md};
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
  font-size: ${({ theme }) => theme.type.b.size};
  line-height: ${({ theme }) => theme.type.b.line};
  margin: 0;
  position: relative;
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.c.size};
    line-height: ${({ theme }) => theme.type.c.line};
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
      text-shadow: ${({ theme }) => theme.colors.linkShadow};
      top: 0;
      transform: translate(0.75rem, 0.15rem);
      width: 6rem;
    }
  }
`;

export default function Header({ isHomepage, toggleTheme }) {
  return (
    <Layout as="nav">
      <Container isHomepage={isHomepage}>
        <Link href="/" passHref>
          <Name isHomepage={isHomepage}>James Y Rauhut</Name>
        </Link>
        <Buttons>
          <SearchToggle />
          <ThemeToggle toggleTheme={toggleTheme} />
        </Buttons>
      </Container>
    </Layout>
  );
}
