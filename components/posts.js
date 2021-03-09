import styled from "styled-components";
import Card from "./card";

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.type.d.size};
  line-height: ${({ theme }) => theme.type.d.line};
  margin-top: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.padding.xl};
`;

export default function Posts({ posts, title }) {
  return (
    <section>
      {title ? <H2>{title}</H2> : null}
      <Grid>
        {posts.map((post) => (
          <Card
            coverImage={post.thumbnail}
            date={post.created}
            key={post.slug}
            title={post.title}
            slug={post.slug}
            tagline={post.tagline}
          />
        ))}
      </Grid>
    </section>
  );
}
