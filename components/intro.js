import Link from "next/link";
import styled from "styled-components";
import Anchor from "../components/anchor";
import PrimaryActions from "../components/primary-actions";

const HoverCursor = styled.span`
  :hover {
    cursor: url(/cursors/${({ cursor }) => cursor}.png), auto;
  }
`;

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 50vh;

  > * {
    max-width: ${({ theme }) => theme.maxWidth};
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.type.a.size};
  line-height: ${({ theme }) => theme.type.a.line};
  margin: 0;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.c.size};
    line-height: ${({ theme }) => theme.type.c.line};
  }
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
        <p>
          I have a love for <i>making</i> at every step of the process. My joy
          comes from collaborating with others on successful user outcomes.
          During free time, I write{" "}
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
          My strongest skills involve{" "}
          <strong>product design, user research, and web development</strong>.
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
        <PrimaryActions />
      </IntroSection>
    </>
  );
}
