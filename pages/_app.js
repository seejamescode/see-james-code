import Link from "next/link";
import withDarkMode from "next-dark-mode";
import styled, { createGlobalStyle } from "styled-components";
import Anchor from "../components/anchor";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Theme from "../components/theme";

const GlobalStyle = createGlobalStyle`
  * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: "IBM Plex Serif", Menlo, "DejaVu Sans Mono", "Bitstream Vera Sans Mono", Courier, monospace;
    min-width: 0;
    outline-color: ${({ theme }) => theme.colors.focus};
    text-rendering: optimizeLegibility;

    @media (prefers-reduced-motion: reduce) {
      animation: none !important;
      transition: none !important;
    }
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.font};
    cursor: url(/cursors/cursor-${({ theme }) => theme.name}.png) 6 0, auto;
    min-height: 100%;
    margin: 0;
    transition: background 100ms ${({ theme }) => theme.animation.hover};
  }

  p, ul {
    font-size: ${({ theme }) => theme.type.a.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.a.line};
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
`;

const Footer = styled.div`
  padding-bottom: ${({ theme }) => theme.padding.md};
  padding-top: ${({ theme }) => theme.padding.xl};
  text-align: center;
`;

function App({ Component, pageProps }) {
  return (
    <Theme>
      {({ toggleTheme }) => (
        <>
          <GlobalStyle />
          <Nav toggleTheme={toggleTheme} />
          <Layout as="main">
            <Component {...pageProps} />
          </Layout>
          <Layout as="footer">
            <Footer>
              <small>
                You're still here? It's over!{" "}
                <Link href="/" passHref>
                  <Anchor>Go home.</Anchor>
                </Link>{" "}
                Go!
              </small>
            </Footer>
          </Layout>
        </>
      )}
    </Theme>
  );
}

export default withDarkMode(App);
