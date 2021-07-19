import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import styled from "styled-components";
import Aside from "../components/aside";
import Bio from "../components/bio";
import Footer from "../components/footer";
import Header from "../components/header";
import Cards from "../components/cards";
import RichText from "../components/rich-text";
import { getAllPosts, getAllPostSlugs, getPost } from "../lib/contentful";
import { TITLE_SUFFIX } from "../lib/constants";

const Article = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.padding.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-rows: min-content 1fr;
    grid-template-columns: ${({ theme }) => theme.maxWidth} 1fr;
  }
`;

const RichTextContainer = styled.section`
  grid-row: span 2;
`;

export default function Post({ post = {}, posts }) {
  const hasLinks = post?.links?.length;
  const router = useRouter();
  const pageTitle = `${post.title}${TITLE_SUFFIX}`;

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <Head>
            <title key="title">{pageTitle}</title>
            <meta key="og:title" property="og:title" content={pageTitle} />
            <meta key="description" name="description" content={post.tagline} />
            <meta
              key="og:description"
              property="og:description"
              content={post.tagline}
            />
            <meta
              key="og:image"
              property="og:image"
              content={`${
                process.env.VERCEL_URL
                  ? `https://${process.env.VERCEL_URL}`
                  : "http://localhost:3000"
              }/api/social/${encodeURIComponent(
                `https:${post?.thumbnail?.fields?.file?.url}?fm=jpg&w=1200&h=630&fit=crop`
              )}`}
            />
            <meta
              key="og:image:alt"
              property="og:image:alt"
              content={post?.thumbnail?.fields?.description}
            />
            <meta
              key="og:image:width"
              property="og:image:width"
              content={1200}
            />
            <meta
              key="og:image:height"
              property="og:image:height"
              content={630}
            />
          </Head>
          <Header
            title={post.title}
            coverImage={post.thumbnail}
            date={post.created}
          />
          <Article>
            <RichTextContainer>
              <RichText content={post.description} />
            </RichTextContainer>
            {hasLinks ? <Aside links={post.links} /> : null}
            <Footer allRows={!hasLinks} slug={post.slug} />
          </Article>
          <Bio />
          <Cards posts={posts.entries} title="More Stuff" />
        </>
      )}
    </>
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
