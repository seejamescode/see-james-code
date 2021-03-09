import Head from "next/head";
import Filter from "../components/filter";
import Intro from "../components/intro";
import Pagination from "../components/pagination";
import Posts from "../components/posts";
import { getAllPosts } from "../lib/contentful";
import { DESCRIPTION, TITLE_SUFFIX } from "../lib/constants";

const TITLE = `Home${TITLE_SUFFIX}`;

export default function Index({
  allPosts: { entries = [], page, totalPages },
}) {
  return (
    <>
      <Head>
        <title key="title">{TITLE}</title>
        <meta key="og:title" property="og:title" content={TITLE} />
        <meta key="description" name="description" content={DESCRIPTION} />
        <meta
          key="og:description"
          property="og:description"
          content={DESCRIPTION}
        />
        <meta
          key="og:image"
          property="og:image"
          content="https://seejamescode.com/graphics/open-graph.png"
        />
        <meta
          key="og:image:alt"
          property="og:image:alt"
          content="Superhero, robot, zombie, rockstar, and dinosaur all dancing together."
        />
        <meta key="og:image:width" property="og:image:width" content="1201" />
        <meta key="og:image:height" property="og:image:height" content="630" />
      </Head>
      <Intro />
      <div>
        <Filter />
        <Posts posts={entries} />
      </div>
      <Pagination page={page} totalPages={totalPages} url="/search" />
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPosts({ preview });

  return {
    props: { preview, allPosts },
  };
}
