import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "./anchor";
import AspectRatio from "./aspect-ratio";

const AllText = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.sm};
`;

const Container = styled.a`
  display: grid;
  grid-auto-rows: min-content;
  gap: ${({ theme }) => theme.padding.sm};
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ isVertical, theme }) =>
      isVertical ? theme.padding.sm : theme.padding.lg};
    grid-template-columns: ${({ isVertical }) =>
      isVertical ? "1fr" : "1fr 2fr"};
  }

  :focus,
  :hover {
    .image-container {
      box-shadow: ${({ theme }) => theme.colors.backgroundShadowHover};
    }

    .text-container {
      color: ${({ theme }) => theme.colors.link};
    }

    .title {
      span {
        background-position: 0 0%;
      }

      color: ${({ theme }) => theme.colors.background};
    }
  }

  :active .image-container {
    box-shadow: none;
  }
`;

const ImageContainer = styled.div.attrs(() => ({
  className: "image-container",
}))`
  background: ${({ theme }) => theme.colors.background};
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
  text-decoration: none;

  :active {
    color: ${({ theme }) => theme.colors.linkActive};
  }
`;

const Date = styled(Text)`
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
`;

const Description = styled(Text)`
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme, textSize }) => theme.type[textSize].size};
    line-height: ${({ theme, textSize }) => theme.type[textSize].line};
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme, titleSize }) => theme.type[titleSize].size};
    line-height: ${({ theme, titleSize }) => theme.type[titleSize].line};
  }
`;

export default function Card({
  coverImage,
  date,
  isVertical,
  slug,
  tagline,
  title,
  textSize = "a",
  titleSize = "b",
}) {
  return (
    <Link href={`/${slug}`} passHref>
      <Container isVertical={isVertical}>
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
        <AllText>
          <div>
            <Title titleSize={titleSize}>
              <Anchor as="span" className="title">
                {title}
              </Anchor>
            </Title>
            {date ? <Date>{date}</Date> : null}
          </div>
          {tagline ? (
            <Description textSize={textSize}>{tagline}</Description>
          ) : null}
        </AllText>
      </Container>
    </Link>
  );
}
