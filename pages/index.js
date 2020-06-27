import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Filter from "../components/Filter";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";
import PrimaryActions from "../components/PrimaryActions";
import { getAllPosts } from "../lib/contentful";

const HoverCursor = styled.span`
  :hover {
    cursor: url(/cursors/${({ cursor }) => cursor}.png), auto;
  }
`;

export default function Home({ allPosts: { entries = [], page, totalPages } }) {
  return (
    <motion.main initial="initial" animate="enter" exit="exit">
      <NextSeo title="Home" />
      <p>
        <HoverCursor cursor="pencil">UX Designer</HoverCursor> and{" "}
        <HoverCursor cursor="computer">Engineer</HoverCursor> <br />
        in <HoverCursor cursor="taco">Austin, Texas</HoverCursor>
      </p>
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
