import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "./anchor";
import AspectRatio from "./aspect-ratio";

const Container = styled.a`
  display: grid;
  grid-gap: ${({ theme }) => theme.padding.sm};
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-gap: ${({ theme }) => theme.padding.md};
    grid-template-columns: 1fr 2fr;
  }

  :focus,
  :hover {
    .image-container {
      box-shadow: ${({ theme }) => theme.colors.backgroundShadowHover};
      transform: translate3d(0, -${({ theme }) => theme.padding.xs}, 0);
    }

    .text-container {
      color: ${({ theme }) => theme.colors.link};
    }
  }

  :active .image-container {
    box-shadow: none;
    transform: translate3d(0, 0, 0);
  }
`;

const ImageContainer = styled.div.attrs(() => ({
  className: "image-container",
}))`
  border-radius: ${({ theme }) => theme.padding.sm};
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  display: inline-block;
  height: 100%;
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: all 300ms ${({ theme }) => theme.animation.hover};
  width: 100%;

  :after {
    border-radius: ${({ theme }) => theme.padding.sm};
    content: "";
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  :focus {
    box-shadow: ${({ theme }) =>
      `inset 0px 0px 0px 3px ${theme.colors.focus}, ${theme.colors.backgroundShadow}`};
    outline: none;

    :after {
      box-shadow: ${({ theme }) =>
        `inset 0px 0px 0px 3px ${theme.colors.focus}`};
    }
  }
`;

const Text = styled.p.attrs(() => ({
  className: "text-container",
}))`
  color: ${({ theme }) => theme.colors.font};
  margin: 0;
  padding-bottom: ${({ theme }) => theme.padding.sm};
  text-decoration: none;

  :active {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.type.b.size};
  margin: 0;
`;

export default function PostPreview({
  title,
  coverImage,
  date,
  tagline,
  slug,
}) {
  return (
    <Link href={`/${slug}`} passHref>
      <Container>
        <div>
          <AspectRatio ratio={0.67}>
            <ImageContainer>
              <Image
                alt={`Cover Image for ${title}`}
                layout="fill"
                objectFit="cover"
                src={`https:${coverImage.fields.file.url}`}
              />
            </ImageContainer>
          </AspectRatio>
        </div>
        <div>
          <Title>
            <Anchor as="span">{title}</Anchor>
          </Title>
          <Text>
            <small>{date}</small>
          </Text>
          <Text>{tagline}</Text>
        </div>
      </Container>
    </Link>
  );
}
