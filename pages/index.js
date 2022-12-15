import Head from "next/head";
import styled from "styled-components";
import Filter from "../components/filter";
import Intro from "../components/intro";
import Pagination from "../components/pagination";
import Cards from "../components/cards";
import { getAllPosts } from "../lib/contentful";
import { DESCRIPTION, TYPES } from "../lib/constants";
import { useEffect, useState } from "react";
import { getAuthenticatedPosts } from "../lib/checkAuth";

const TYPES_KEYS = Object.keys(TYPES);
const TITLE = `James Y Rauhut`;

const FeaturedSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.padding.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.padding.lg};
    grid-template-rows: max-content;
    grid-template-columns: 3fr 1fr;
  }
`;

const FeaturedArticle = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const FeaturedCases = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const FeaturedSidebar = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 2;
    grid-row: 1 / 3;
  }
`;

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.padding.xxl};
`;

export default function Index({
  allPosts: initialAllPosts,
  isAuthenticated,
  latestArticles: { entries: articleEntries = [] },
  latestProjects: { entries: projectEntries = [] },
  preview,
}) {
  const [caseStudyEntries, setCaseStudyEntries] = useState();
  const [allPosts, setAllPosts] = useState(initialAllPosts);

  useEffect(async () => {
    if (isAuthenticated) {
      const caseStudyResults = await getAuthenticatedPosts({
        limit: 2,
        preview,
        type: TYPES_KEYS[0],
      });
      const allResults = await getAuthenticatedPosts({
        preview,
      });

      if (
        caseStudyResults?.posts?.entries?.length &&
        allResults?.posts?.entries?.length
      ) {
        setCaseStudyEntries(caseStudyResults.posts.entries);
        setAllPosts(allResults?.posts);
      }
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Head>
        <title key="title">{TITLE}</title>
        <meta property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={TITLE} />
        <meta name="twitter:title" content={TITLE} />
        <meta key="description" name="description" content={DESCRIPTION} />
        <meta
          key="og:description"
          property="og:description"
          content={DESCRIPTION}
        />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          key="og:image"
          property="og:image"
          content="https://seejamesdesign.com/graphics/open-graph.png"
        />
        <meta
          name="twitter:image"
          content="https://seejamesdesign.com/graphics/open-graph.png"
        />
        <meta
          key="og:image:alt"
          property="og:image:alt"
          content="James Y Rauhut, Product Designer"
        />
        <meta key="og:image:width" property="og:image:width" content="120" />
        <meta key="og:image:height" property="og:image:height" content="630" />
      </Head>
      <Intro />
      <FeaturedSection>
        <FeaturedArticle>
          <Cards isValidated posts={articleEntries} title="Latest Article" />
        </FeaturedArticle>
        <FeaturedSidebar>
          <Cards
            directionLg="row"
            directionMd="column"
            gap="lg"
            gapLg="md"
            gapMd="md"
            hideDates
            hideDescriptions
            isCardsVertical
            isValidated
            posts={projectEntries}
            title="Recent Personal Projects"
            titleSize="small"
          />
        </FeaturedSidebar>
        <FeaturedCases>
          <Cards
            directionMd="column"
            directionLg="column"
            gapLg="md"
            gapMd="md"
            isCardsVertical
            isValidated={isAuthenticated}
            hideDates
            posts={caseStudyEntries}
            title="Case Studies"
            textSize="small"
            titleSize="a"
          />
        </FeaturedCases>
      </FeaturedSection>
      <section>
        <Filter />
        <Cards isCardsCentered isValidated posts={allPosts?.entries} />
        <Pagination
          page={allPosts?.page}
          totalPages={allPosts?.totalPages}
          url="/search"
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPosts({ preview });
  const latestArticles = await getAllPosts({
    limit: 1,
    preview,
    type: TYPES_KEYS[1],
  });
  const latestProjects = await getAllPosts({
    limit: 3,
    preview,
    type: TYPES_KEYS[2],
  });

  return {
    props: {
      allPosts,
      latestArticles,
      latestProjects,
      preview,
    },
  };
}
