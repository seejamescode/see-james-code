import Link from "next/link";
import styled from "styled-components";
import Anchor from "../components/anchor";
import PrimaryActions from "../components/primary-actions";

const HoverCursor = styled.span`
  :hover {
    cursor: url(/cursors/${({ cursor }) => cursor}.png), auto;
  }
`;

const IntroGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.padding.xl};
  justify-content: flex-start;

  p {
    margin-top: 0;
    max-width: ${({ theme }) => theme.maxWidth};

    :last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.padding.lg};
    grid-auto-flow: row;
    grid-template-columns: 3fr 1fr;
  }

  p {
    margin-bottom: ${({ theme }) => theme.padding.lg};
    max-width: ${({ theme }) => theme.maxWidth};
  }
`;

const IntroSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.padding.xxl};
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.type.b.size};
  line-height: ${({ theme }) => theme.type.b.line};
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.d.size};
    line-height: ${({ theme }) => theme.type.d.line};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.type.e.size};
    line-height: ${({ theme }) => theme.type.e.line};
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};
  margin: 0;
  width: 100%;
`;

export default function Intro() {
  return (
    <>
      <section>
        <Title>
          <HoverCursor cursor="pencil">UX Designer</HoverCursor> and{" "}
          <HoverCursor cursor="computer">Engineer</HoverCursor> <br />
          in <HoverCursor cursor="taco">Austin, Texas</HoverCursor>
        </Title>
      </section>
      <IntroSection>
        <Tagline>
          I'm a designer and coder that loves making delightful experiences for{" "}
          <i>everyone</i> using user-centered processes.
        </Tagline>
        <IntroGrid>
          <div>
            <p>
              I enjoy{" "}
              <strong>
                product design, user research, and web development
              </strong>
              . During free time, I write{" "}
              <Link href="/search?type=article" passHref>
                <Anchor>blog articles</Anchor>
              </Link>
              , collect posters, and make{" "}
              <Link href="/search?type=project" passHref>
                <Anchor>light-hearted products</Anchor>
              </Link>
              .
            </p>
            <p>
              At{" "}
              <Anchor
                href="https://pingboard.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pingboard
              </Anchor>
              , I collaborated on data-driven UI experiences on the Growth Team.
              Previously, I was helping every business unit a IBM align on the{" "}
              <Anchor
                href="https://www.ibm.com/design/language/"
                rel="noopener noreferrer"
                target="_blank"
              >
                IBM Design Language
              </Anchor>{" "}
              and{" "}
              <Anchor
                href="https://www.carbondesignsystem.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Carbon Design System
              </Anchor>
              .
            </p>
          </div>
          <div>
            <PrimaryActions />
          </div>
        </IntroGrid>
      </IntroSection>
    </>
  );
}
