import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import Tile from "./Tile";

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: ${({ theme }) => theme.padding};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
`;

const Grid = ({ posts = [] }) => {
  const themeContext = useContext(ThemeContext);
  const lineHeight = useMemo(
    () => parseFloat(themeContext.type.a.line.split("rem")[0]),
    [themeContext.type.a.line]
  );

  return (
    <Container>
      {posts.map(
        ({
          thumbnail: {
            fields: {
              description: alt,
              file: { url },
            },
          },
          slug,
          title,
          scale,
        }) => (
          <Tile
            alt={alt}
            key={slug}
            lineHeight={lineHeight}
            scale={scale}
            slug={slug}
            title={title}
            url={url}
          />
        )
      )}
    </Container>
  );
};

export default Grid;
