import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMeasure } from "react-use";
import styled from "styled-components";
import fullSize from "./FullSize";
import PictureContentful from "./PictureContentful";

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
  },
};

const Container = styled(motion.a)`
  border: none;
  border-radius: ${({ theme }) => theme.padding};
  box-shadow: 10px 10px 30px #d2d5d9, -10px -10px 30px #ffffff;
  display: block;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: transform 100ms ${({ theme }) => theme.animation.hover};

  :before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  :focus,
  :hover {
    transform: scale(1.02) !important;
  }

  :active {
    transform: scale(0.98) !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: calc(
      ${({ scale, theme }) => `${theme.padding} / 2 * ${scale}`}
    );
    grid-column: span ${({ scale }) => scale} / auto;
    grid-row: span ${({ scale }) => scale} / auto;
  }
`;

const PictureContainer = styled.div`
  ${fullSize}
`;

const Text = styled.div`
  ${fullSize}
  background: ${({ theme }) => theme.colors.backdrop};
  color: ${({ theme }) => theme.colors.white};
  height: auto;
  padding: calc(${({ theme }) => theme.padding} / 2);

  span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ lines }) => lines};
    overflow: hidden;
  }
`;

const Tile = ({ alt, lineHeight, scale, slug, title, url }) => {
  const [ref, { height }] = useMeasure();
  const lines = useMemo(() => Math.floor(height / 16 / lineHeight), [height]);

  return (
    <Link as={`/${slug}`} href="/[slug]" passHref>
      <Container ref={ref} scale={scale} variants={postVariants}>
        <PictureContainer>
          <PictureContentful
            alt={alt}
            path={url}
            sizes={[
              { screen: 640, size: scale > 1 ? 448 : 210 },
              { screen: 1, size: scale > 1 ? 575 : 272 },
            ]}
          />
        </PictureContainer>
        <Text lines={lines}>
          <span>{title}</span>
        </Text>
      </Container>
    </Link>
  );
};

export default Tile;
