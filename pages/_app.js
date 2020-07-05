import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import styled, { createGlobalStyle } from "styled-components";
import "highlight.js/styles/a11y-dark.css";
import Font from "../components/Font";
import Header from "../components/Header";
import Theme from "../components/Theme";

const GlobalStyle = createGlobalStyle`
  ${Font}

  html {
    -webkit-text-size-adjust: 100%;
  }

  * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: "IBM Plex Serif", Menlo, "DejaVu Sans Mono", "Bitstream Vera Sans Mono", Courier, monospace;
    outline-color: ${({ theme }) => theme.colors.focus};
    text-rendering: optimizeLegibility;

    @media (prefers-reduced-motion: reduce) {
      animation: none !important;
      transition: none !important;
    }
  }

  blockquote {
    border-left: 1px solid gray;
    padding: 0 0 0 ${({ theme }) => theme.padding};
    margin-left: 0;
    margin-top: ${({ theme }) => theme.padding};
    width: 100%;

    p, * {
      font-size: ${({ theme }) => theme.type.b.size};
      line-height: ${({ theme }) => theme.type.b.line};
    }
  }

  code {
    box-shadow:  inset 10px 10px 60px #111111, 
            inset -10px -10px 60px #454545;
    border-radius: calc(${({ theme }) => theme.padding} / 2);
    cursor: text;
    font-family: 'IBM Plex Mono', monospace;
    padding: calc(${({ theme }) => theme.padding} / 4) calc(${({ theme }) =>
  theme.padding} / 2) !important;
  }

  p, ul {
    font-size: ${({ theme }) => theme.type.a.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.a.line};
  }

  h1, h2, h3, h4, p, ul, blockquote {
    max-width: ${({ theme }) => theme.maxWidth};
  }

  small {
    font-size: ${({ theme }) => theme.type.small.size};
    line-height: ${({ theme }) => theme.type.small.line};
  }

  strong {
    font-weight: 600;
  }

  a, button, select {
    cursor: url(/cursors/select.png) 12 0, auto !important;
  }

  input {
    cursor: text;
  }

  body {
      background: ${({ theme }) => theme.colors.body};
      color: ${({ theme }) => theme.colors.font};
      cursor: url(/cursors/cursor-${({ theme }) => theme.name}.png) 6 0, auto;
      min-height: 100%;
      margin: 0;
      transition: background 300ms ${({ theme }) => theme.animation.hover};
  }
`;

const MaxSize = styled.div`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 0px 300px -50px ${({ theme }) => theme.colors.accent};
  margin: auto;
  max-width: ${({ theme }) => theme.breakpoints.max};
  min-height: 100vh;
  padding: ${({ theme }) => theme.padding};
  transition: background 300ms ${({ theme }) => theme.animation.hover},
    color 300ms ${({ theme }) => theme.animation.hover};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.padding} calc(2 * ${theme.padding})`};
  }
`;

const DESCRIPTION =
  "James is a UX Designer and Engineer in Austin, Texas. Check out all of the latest articles, projects, and talks on user research, workshop facilitation, UI design, and web development.";
const TITLE = "James Y Rauhut";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHomepage = router.route === "/";

    return (
      <Theme>
        {({ toggleTheme }) => (
          <>
            <DefaultSeo
              description={DESCRIPTION}
              openGraph={{
                description: DESCRIPTION,
                images: [
                  {
                    alt:
                      "Superhero, robot, zombie, rockstar, and dinosaur all dancing together.",
                    height: 1600,
                    url: "https://seejamescode.com/graphics/open-graph.png",
                    width: 1600,
                  },
                ],
                site_name: TITLE,
                title: TITLE,
                type: "website",
                url: "https://seejamescode.com",
              }}
              title={TITLE}
              titleTemplate={`%s | ${TITLE}`}
              twitter={{
                cardType: "summary_large_image",
                handle: "@seejamescode",
                site: "@seejamescode",
              }}
            />
            <GlobalStyle />
            <MaxSize>
              <Header isHomepage={isHomepage} toggleTheme={toggleTheme} />
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </MaxSize>
          </>
        )}
      </Theme>
    );
  }
}
