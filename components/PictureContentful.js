import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import styled from "styled-components";

const Img = styled.img`
  background: ${({ theme }) => theme.colors.backdrop};
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const getSrcSet = ({ extension, path, sizes }) =>
  sizes
    .map(({ screen, size }) => `${path}?fm=${extension}&w=${size} ${screen}w`)
    .join(", ");

export default function PictureContentful({
  alt,
  height,
  path,
  sizes = [{ screen: 1, size: 1200 }],
  style = {},
  title,
  width,
}) {
  const intersectionRef = useRef(null);
  // Root margin tells the intersection observer how much an item offscreen is allowed.
  const intersection = useIntersection(intersectionRef, {
    rootMargin: "50px",
  });
  const [srcSet, setSrcSet] = useState({});

  useEffect(() => {
    if (!srcSet.jpg && intersection && intersection.intersectionRatio >= 0) {
      setSrcSet({
        jpg: getSrcSet({ extension: "jpg", path, sizes }),
        webp: getSrcSet({ extension: "webp", path, sizes }),
      });
    }
  }, [intersection, sizes]);

  return (
    <picture ref={intersectionRef}>
      <source srcSet={srcSet.webp} type="image/webp" />
      <Img
        alt={alt}
        height={height}
        title={title}
        srcSet={srcSet.jpg}
        style={style}
        width={width}
      />
    </picture>
  );
}
