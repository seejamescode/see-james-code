import App from "next/app";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import "highlight.js/styles/a11y-dark.css";
import Font from "../components/Font";
import SearchToggle from "../components/SearchPopover";

const theme = {
  animation: {
    hover: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  },
  borderRadius: "3rem",
  breakpoints: {
    md: "40rem",
    lg: "60rem",
    max: "80rem",
  },
  colors: {
    backdrop: "rgba(0, 0, 0, 0.75)",
    black: "#180619",
    blackShadow: "#7e667f",
    brands: {
      facebook: "#1877f2",
      linkedin: "#007bb5",
      reddit: "#ff5700",
      twitter: "#1da1f2",
    },
    link: "#E366FF",
    linkActive: "#ec99ff",
    linkSuperActive: "#EFADFF",
    white: "#f7faff",
  },
  maxWidth: "34rem",
  padding: "2rem",
  type: {
    small: {
      line: "1.25rem",
      size: "0.8125rem",
    },
    a: {
      line: "1.6875rem",
      size: "1rem",
    },
    b: {
      line: "2.0625rem",
      size: "1.25rem",
    },
    c: {
      line: "2.625rem",
      size: "1.625rem",
    },
    d: {
      line: "3.25rem",
      size: "2.0625rem",
    },
    e: {
      line: "4.0625rem",
      size: "2.625rem",
    },
  },
};

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
    text-rendering: optimizeLegibility;
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
    box-shadow:  inset 20px 20px 60px #111111, 
            inset -20px -20px 60px #454545;
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
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.black};
      cursor: url(/cursors/cursor.png) 6 0, auto;
      min-height: 100%;
      margin: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const MaxSize = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 20px 20px 60px #d2d5d9, -20px -20px 60px #ffffff;
  margin: auto;
  max-width: ${({ theme }) => theme.breakpoints.max};
  min-height: 100vh;
  padding: ${({ theme }) => theme.padding};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.padding} calc(2 * ${theme.padding})`};
  }
`;

const Name = styled.a`
  color: inherit;
  font-size: ${({ theme }) => theme.type.c.size};
  margin: 0;
  position: relative;
  color: inherit;
  text-decoration: none;

  :active {
    outline-color: ${({ theme }) => theme.colors.linkActive};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: scale(${({ isHomepage }) => (isHomepage ? 1.615 : 1)});
    transform-origin: top left;
    transition: transform 100ms ${({ theme }) => theme.animation.hover};
  }

  /* Media query disables easter egg for touch device clicks */
  @media (hover: hover) {
    :hover:after {
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

const DESCRIPTION =
  "UX Designer and Engineer in Austin, Texas. See all of his blogs, projects, and talks.";
const TITLE = "James Y Rauhut";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <ThemeProvider theme={theme}>
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
          <Header>
            <Link href="/" passHref>
              <Name isHomepage={router.route === "/"}>James Y Rauhut</Name>
            </Link>
            <SearchToggle />
          </Header>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MaxSize>
      </ThemeProvider>
    );
  }
}
