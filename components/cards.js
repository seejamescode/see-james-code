import styled, { css } from "styled-components";
import Card from "./card";
import CaseStudyBlock from "./case-study-block";

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.type.c.size};
  line-height: ${({ theme }) => theme.type.c.line};
  margin-bottom: ${({ theme }) => theme.padding.md};
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.a.size};
    line-height: ${({ theme }) => theme.type.a.line};
    text-align: ${({ isCentered }) => isCentered && "center"};
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
    ${({ isCardsCentered }) =>
      isCardsCentered &&
      css`
        grid-template-columns: max-content;
        justify-content: center;
      `}
  }
`;

const ValidationBox = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.padding.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.md};
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => `${theme.padding.xl} ${theme.padding.sm}`};
`;

export default function Cards({
  aspectRatio,
  directionLg = "row",
  directionMd = "row",
  gap = "xl",
  gapLg = "xl",
  gapMd = "xl",
  isCardsCentered,
  isCardsVertical,
  hideDates,
  hideDescriptions,
  posts,
  title,
  textSize,
  titleSize,
}) {
  return (
    <div>
      {title ? <H2 isCentered={isCardsCentered}>{title}</H2> : null}
      {title && title === "Case Studies" ? (
        <CaseStudyBlock />
      ) : posts?.length ? (
        <Grid
          directionLg={directionLg}
          directionMd={directionMd}
          gap={gap}
          gapMd={gapMd}
          gapLg={gapLg}
          isCardsCentered={isCardsCentered}
        >
          {posts.map((post) => (
            <Card
              aspectRatio={aspectRatio}
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
      ) : (
        <></>
      )}
    </div>
  );
}
