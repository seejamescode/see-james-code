import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useHoverDirty } from "react-use";
import styled, { keyframes, ThemeContext } from "styled-components";
import Anchor from "../components/Anchor";
import Filter from "../components/Filter";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";
import PrimaryActions from "../components/PrimaryActions";
import { getAllPosts } from "../lib/contentful";

const flicker = keyframes`
  0%, 19%, 21%, 23%, 100% {
    opacity: 1;
		
	}
	20%, 22% {
		opacity: 0.5;
	}
`;

const line1 = keyframes`
  10%, 12%, 100% {
    opacity: 1;
		
	}
	0%, 9%, 11% {
		opacity: 0.5;
	}
`;

const line2 = keyframes`
  20%, 22%, 100% {
    opacity: 1;
		
	}
	0%, 19%, 21% {
		opacity: 0.5;
	}
`;

const line3 = keyframes`
  30%, 32%, 100% {
    opacity: 1;
		
	}
	0%, 29%, 31% {
		opacity: 0.5;
	}
`;

const BorderSVG = styled.svg`
  filter: drop-shadow(0px 0px 1rem ${({ theme }) => theme.colors.accentShadow});
  margin-bottom: calc(2 * ${({ theme }) => theme.padding});
  width: 100%;

  line:nth-of-type(1) {
    animation: ${line1} 10s linear infinite;
  }

  line:nth-of-type(2) {
    animation: ${line2} 10s linear infinite;
  }

  line:nth-of-type(3) {
    animation: ${line3} 10s linear infinite;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: calc(4 * ${({ theme }) => theme.padding});
    margin-top: calc(2 * ${({ theme }) => theme.padding});
  }
`;

const Flex = styled.section`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    margin-top: calc(2 * ${({ theme }) => theme.padding});
  }
`;

const Glow = styled.div`
  display: flex;
  flex: 1;
  margin: ${({ theme }) => theme.padding} auto;
  max-height: 50vmin;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: calc(2 * ${({ theme }) => theme.padding}) auto
      ${({ theme }) => theme.padding} auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-height: 25rem;
    margin: auto;
  }

  img {
    animation: ${flicker} 15s linear infinite;
    filter: drop-shadow(
      0px 0px 1rem ${({ theme }) => theme.colors.accentShadow}
    );
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      /* Half of horziontal padding for optical centering with container */
      transform: translateX(${({ theme }) => theme.padding});
    }
  }
`;

const HoverCursor = styled.span`
  :hover {
    cursor: url(/cursors/${({ cursor }) => cursor}.png), auto;
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.type.b.size};
  line-height: ${({ theme }) => theme.type.b.line};
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 1rem;
  }
`;

export default function Home({ allPosts: { entries = [], page, totalPages } }) {
  const themeContext = useContext(ThemeContext);
  const glowRef = useRef(null);
  const isHovering = useHoverDirty(glowRef);

  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <NextSeo title="Home" />
      <Title>
        <HoverCursor cursor="pencil">UX Designer</HoverCursor> and{" "}
        <HoverCursor cursor="computer">Engineer</HoverCursor> <br />
        in <HoverCursor cursor="taco">Austin, Texas</HoverCursor>
      </Title>
      <Flex>
        <div>
          <p>Hi there,</p>
          <p>
            I enjoy doing{" "}
            <strong>
              user research, workshop facilitation, UI design, and web
              development
            </strong>{" "}
            for the Growth Team at{" "}
            <Anchor
              href="https://pingboard.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pingboard
            </Anchor>
            . I’ve also helped improve accessibility across the employee
            networking product. Before that, I was helping{" "}
            <Anchor
              href="https://www.ibm.com/design/language/"
              rel="noopener noreferrer"
              target="_blank"
            >
              IBM
            </Anchor>{" "}
            elevate the quality of design across business units.
          </p>
          <p>
            <Anchor
              href="https://poster.party"
              rel="noopener noreferrer"
              target="_blank"
            >
              Poster.Party
            </Anchor>{" "}
            is my own start-up and passion project. It is a community and
            marketplace for collectors of limited edition prints. My hope is
            that the site helps others find the joy of collecting posters.
          </p>
          <p>
            Enough about me! Below are a bunch of helpful resources I worked on
            to assist others in learning. Please enjoy and share whatever you
            find useful.
          </p>
          <p>
            Sincerely,
            <br />
            James
          </p>
        </div>
        <Glow ref={glowRef}>
          <img
            alt="Head portrait of James in neon"
            src={isHovering ? "/graphics/face-wink.svg" : "/graphics/face.svg"}
          />
        </Glow>
      </Flex>
      <PrimaryActions />
      <BorderSVG
        width="1614px"
        height="72px"
        viewBox="0 0 1614 72"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line
            x1="7"
            y1="7.5"
            x2="1607"
            y2="7.5"
            stroke={themeContext.colors.accent}
            stroke-width="12"
          ></line>
          <line
            x1="107"
            y1="38.5"
            x2="1507"
            y2="38.5"
            stroke={themeContext.colors.accent}
            stroke-width="8"
          ></line>
          <line
            x1="207"
            y1="66.5"
            x2="1407"
            y2="66.5"
            stroke={themeContext.colors.accent}
            stroke-width="4"
          ></line>
        </g>
      </BorderSVG>
      <Filter />
      <Grid posts={entries} />
      <Pagination page={page} totalPages={totalPages} url="/search" />
    </motion.main>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPosts({ preview });

  return {
    props: {
      allPosts,
      preview,
    },
  };
}
