import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Filter from "../components/Filter";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { getAllPosts } from "../lib/contentful";

const Main = styled(motion.main)`
  padding-top: ${({ theme }) => theme.padding};
`;

const NoResults = styled.p`
  font-size: ${({ theme }) => theme.type.b.size};
  line-height: ${({ theme }) => theme.type.b.line};
  margin: calc(2 * ${({ theme }) => theme.padding}) auto;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.padding};
`;

export default function SearchPage({
  allPosts: { entries = [], page, totalPages },
  query,
  type,
}) {
  return (
    <Main initial="initial" animate="enter" exit="exit">
      <NextSeo title="Search" />
      <SearchContainer>
        <Search query={query} />
      </SearchContainer>
      {entries.length ? (
        <>
          <Filter query={query} type={type} />
          <Grid posts={entries} />
          <Pagination page={page} totalPages={totalPages} url="/search" />
        </>
      ) : (
        <NoResults>Oof, no results for "{query}." Try again?</NoResults>
      )}
    </Main>
  );
}

export async function getServerSideProps({
  query: { page, query = "", type = "" },
  preview = false,
}) {
  const allPosts = await getAllPosts({ page, preview, query, type });

  return {
    props: {
      allPosts,
      preview,
      query,
      type,
    },
  };
}
