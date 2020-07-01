import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Footer from "../components/Footer";
import Grid from "../components/Grid";
import Pagination from "../components/Pagination";
import RichText from "../components/RichText";
import Sidebar from "../components/Sidebar";
import Subscribe from "../components/Subscribe";
import { getAllPosts, getAllPostSlugs, getPost } from "../lib/contentful";

const textVariants = {
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.175, 0.85, 0.42, 0.96] },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: [0.175, 0.85, 0.42, 0.96] },
  },
};

const CoverImage = styled.div`
  left: 0;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translateX(-${({ theme }) => theme.padding});
  width: calc(100% + 2 * ${({ theme }) => theme.padding});

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: translateX(calc(2 * -${({ theme }) => theme.padding}));
    width: calc(100% + 4 * ${({ theme }) => theme.padding});
  }

  :after,
  :before {
    content: "";
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  :after {
    background: ${({ theme }) => theme.colors.backdrop};
  }

  :before {
    background: url(${({ thumbnail }) => thumbnail});
    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.padding} 0;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
    min-height: 15rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 20rem;
  }

  * {
    z-index: 1;
  }
`;

const Layout = styled(motion.div)`
  display: grid;
  grid-gap: ${({ theme }) => theme.padding}
    calc(${({ theme }) => theme.padding} * 2);
  padding-top: ${({ theme }) => theme.padding};
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-rows: min-content min-content 1fr;
    grid-template-columns: 2fr 1fr;
  }
`;

const Main = styled.main`
  /* Prevents grid blowout: https://css-tricks.com/preventing-a-grid-blowout/ */
  min-width: 0;

  /* Just covering alignment on first and last rich text */
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-row: span 2;
  }

  h1 {
    font-size: ${({ theme }) => theme.type.d.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.d.line};
    margin-top: calc(${({ theme }) => theme.padding} * 2);
  }

  h2 {
    font-size: ${({ theme }) => theme.type.c.size};
    font-weight: 600;
    line-height: ${({ theme }) => theme.type.c.line};
    margin-top: calc(${({ theme }) => theme.padding} * 1.5);
  }

  h3 {
    font-size: ${({ theme }) => theme.type.c.size};
    line-height: ${({ theme }) => theme.type.c.line};
  }
`;

const Recommendations = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
`;

const RecommendationsTitle = styled.h2`
  font-size: ${({ theme }) => theme.type.c.size};
  line-height: ${({ theme }) => theme.type.c.line};
  margin: ${({ theme }) => theme.padding} 0;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.font};
  font-size: ${({ theme }) => theme.type.b.size};
  line-height: ${({ theme }) => theme.type.b.line};
  margin: 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.font};
  font-size: ${({ theme }) => theme.type.d.size};
  font-weight: 600;
  line-height: ${({ theme }) => theme.type.d.line};
  margin: 0 0 calc(${({ theme }) => theme.padding} / 2) 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.d.size};
    line-height: ${({ theme }) => theme.type.d.line};
  }
`;

export default function Post(props) {
  // getStaticProps tries generating a page without a slug at build
  // Build will fail if this check is removed
  if (!props.slug) {
    return null;
  }

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <NextSeo
        description={props.post.tagline}
        title={props.post.title}
        openGraph={{
          description: props.post.tagline,
          images: [
            {
              alt: props.post.thumbnail.fields.description,
              height: props.post.thumbnail.fields.file.details.image.height,
              url: props.post.thumbnail.fields.file.url,
              width: props.post.thumbnail.fields.file.details.image.width,
            },
          ],
        }}
      />
      <Layout variants={textVariants}>
        <Header>
          <CoverImage thumbnail={props.post.thumbnail.fields.file.url} />
          <Title>{props.post.title}</Title>
          <Tagline>{props.post.tagline}</Tagline>
        </Header>
        <Sidebar created={props.post.created} links={props.post.links} />
        {props.post.description.nodeType && (
          <Main>
            <RichText content={props.post.description} />
          </Main>
        )}
        <Footer slug={props.post.slug} />
        <Subscribe />
        <Recommendations>
          <RecommendationsTitle>More Cool Stuff</RecommendationsTitle>
          <Grid posts={props.posts.entries} />
          <Pagination
            page={props.posts.page}
            totalPages={props.posts.totalPages}
            url="/search"
          />
        </Recommendations>
      </Layout>
    </motion.div>
  );
}

export async function getStaticProps({ params: { slug }, preview = false }) {
  const [post, posts] = await Promise.all([
    getPost({ preview, slug }),
    getAllPosts({ preview }),
  ]);

  // Explaination for stringify and parse:
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        post,
        posts: {
          ...posts,
          entries: posts.entries.filter(
            ({ slug: curSlug }) => curSlug !== slug
          ),
        },
        slug,
      })
    ),
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs();

  return {
    paths,
    fallback: true,
  };
}