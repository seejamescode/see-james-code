import React, { useRef } from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useHoverDirty } from "react-use";
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

const Border = styled.img`
  animation: ${flicker} 21s linear 7s infinite;
  filter: drop-shadow(0px 0px 1rem ${({ theme }) => theme.colors.accentShadow});
  margin-bottom: calc(2 * ${({ theme }) => theme.padding});
  width: 100%;
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
      <Border role="presentation" src="/graphics/border.svg" />
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
