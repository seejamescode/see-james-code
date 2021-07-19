import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.header`
  min-height: 50vh;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.padding.md};
  padding-bottom: ${({ theme }) => theme.padding.md};
  position: relative;
`;

const ImageContainer = styled(motion.div)`
  filter: blur(${({ theme }) => theme.padding.xs});
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;

  && {
    grid-column: none;
  }

  :after {
    background: ${({ theme }) => theme.colors.backdrop};
    content: "";
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.type.c.size};
  line-height: ${({ theme }) => theme.type.c.line};
  margin: 0;
  max-width: ${({ theme }) => theme.maxWidthHeader};

  @media (min-height: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.d.size};
    line-height: ${({ theme }) => theme.type.d.line};
  }
`;

export default function PostHeader({ title, coverImage, date }) {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const scale = useMotionValue(1.25);
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, -0.1], {
    clamp: false,
  });

  useEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <Container className="full-bleed" ref={ref}>
      <ImageContainer style={{ scale, y }}>
        <Image
          alt={coverImage?.fields?.description}
          layout="fill"
          objectFit="cover"
          src={`https:${coverImage?.fields?.file?.url}`}
        />
      </ImageContainer>
      <Text>
        <Title>{title}</Title>
        <time>{date}</time>
      </Text>
    </Container>
  );
}
