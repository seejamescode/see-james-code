import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import styled, { keyframes } from "styled-components";
import Anchor from "../components/Anchor";
import Filter from "../components/Filter";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";
import PrimaryActions from "../components/PrimaryActions";
import { getAllPosts } from "../lib/contentful";

const flicker = keyframes`
  0%, 19.99%, 22%, 62.99%, 64.99%, 66%, 100% {
    opacity: 1;
		
	}
	20%, 21.99%, 63%, 63.99%, 65.99% {
		opacity: 0.5;
	}
`;

const Flex = styled.section`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const Glow = styled.div`
  display: flex;
  flex: 1;
  min-width: 25rem;

  img {
    animation: ${flicker} 15s linear 5s infinite;
    filter: drop-shadow(
      0px 0px 1rem ${({ theme }) => theme.colors.accentShadow}
    );
    margin: calc(2 * ${({ theme }) => theme.padding}) auto 0 auto;
    width: 75%;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: calc(3 * ${({ theme }) => theme.padding});
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin: auto;
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

const IntroP = styled.p`
  margin-top: calc(2 * ${({ theme }) => theme.padding});
`;

export default function Home({ allPosts: { entries = [], page, totalPages } }) {
  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <NextSeo title="Home" />
      <Flex>
        <div>
          <IntroP>Hi there,</IntroP>
          <p>
            <strong>
              I’m a <HoverCursor cursor="pencil">UX Designer</HoverCursor> and{" "}
              <HoverCursor cursor="computer">Engineer</HoverCursor> in{" "}
              <HoverCursor cursor="taco">Austin, Texas.</HoverCursor>
            </strong>
          </p>
          <p>
            I enjoy doing user-centered research, workshop facilitation, UI
            design, and web development for the Growth Team at{" "}
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
        <Glow>
          <img src="/graphics/face-2.svg" />
        </Glow>
      </Flex>
      <PrimaryActions />
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
