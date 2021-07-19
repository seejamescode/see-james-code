import styled from "styled-components";
import Card from "./card";

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.type.c.size};
  line-height: ${({ theme }) => theme.type.c.line};
  margin-bottom: ${({ theme }) => theme.padding.md};
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.small.size};
    line-height: ${({ theme }) => theme.type.small.line};
    margin-bottom: ${({ theme }) => theme.padding.sm};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ gap, theme }) => theme.padding[gap]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ gapMd, theme }) => theme.padding[gapMd]};
    grid-auto-flow: ${({ directionMd }) => directionMd};
    grid-auto-columns: 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ gapLg, theme }) => theme.padding[gapLg]};
    grid-auto-flow: ${({ directionLg }) => directionLg};
  }
`;

export default function Cards({
  directionLg = "row",
  directionMd = "row",
  gap = "xl",
  gapLg = "xl",
  gapMd = "xl",
  isCardsVertical,
  isHorizontal,
  hideDates,
  hideDescriptions,
  posts,
  title,
  textSize,
  titleSize,
}) {
  return (
    <div>
      {title ? <H2>{title}</H2> : null}
      <Grid
        directionLg={directionLg}
        directionMd={directionMd}
        gap={gap}
        gapMd={gapMd}
        gapLg={gapLg}
        isHorizontal={isHorizontal}
      >
        {posts.map((post) => (
          <Card
            coverImage={post.thumbnail}
            date={!hideDates && post.created}
            key={post.slug}
            isVertical={isCardsVertical}
            title={post.title}
            slug={post.slug}
            tagline={!hideDescriptions && post.tagline}
            textSize={textSize}
            titleSize={titleSize}
          />
        ))}
      </Grid>
    </div>
  );
}
