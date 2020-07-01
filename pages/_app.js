import App from "next/app";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import styled, {
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} from "styled-components";
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
    accent: "#66FFE3",
    accentShadow: "#5be5cc",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: "#180619",
    backgroundShadow: "5px 5px 10px #2e0c30, -5px -5px 10px #3e1042",
    backgroundShadowHover: "5px 5px 20px #2e0c30, -5px -5px 20px #3e1042",
    body: "#090209",
    brands: {
      facebook: "#1877f2",
      linkedin: "#007bb5",
      reddit: "#ff5700",
      twitter: "#1da1f2",
    },
    font: "#f7faff",
    fontBackground: "linear-gradient(145deg, #dee1e6, #ffffff)",
    fontBackgroundFocus:
      "inset 10px 10px 20px #d2d5d9, inset -10px -10px 20px #ffffff",
    focus: "#ffe366",
    maxWidthShadow: "0px 0px 15px #000",
    link: "#E366FF",
    linkActive: "#ec99ff",
    linkBackground: "linear-gradient(145deg, #f36dff, #cc5ce6)",
    linkBackgroundHover: "linear-gradient(100deg, #f36dff, #cc5ce6)",
    linkShadow: "0px 0px 8px #ec99ff",
    linkShadowActive:
      "inset 5px 5px 10px #c157d9, inset -5px -5px 10px #ff75ff",
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
      background-image: url("/graphics/background.svg");
      background-size: 300px 300px;
      color: ${({ theme }) => theme.colors.font};
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
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.colors.maxWidthShadow};
  margin: auto;
  max-width: ${({ theme }) => theme.breakpoints.max};
  min-height: 100vh;
  padding: ${({ theme }) => theme.padding};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.padding} calc(2 * ${theme.padding})`};
  }
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
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.type.c.size};
  margin: 0;
  position: relative;
  text-decoration: none;
  text-shadow: 0px 0px 1rem ${({ theme }) => theme.colors.accentShadow};

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

const DESCRIPTION =
  "UX Designer and Engineer in Austin, Texas. See all of his blogs, projects, and talks.";
const TITLE = "James Y Rauhut";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHomepage = router.route === "/";

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
          <Header isHomepage={isHomepage}>
            <Link href="/" passHref>
              <Name isHomepage={isHomepage}>James Y Rauhut</Name>
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
