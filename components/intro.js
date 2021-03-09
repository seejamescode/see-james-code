import styled from "styled-components";
import Anchor from "../components/anchor";
import PrimaryActions from "../components/primary-actions";

const HoverCursor = styled.span`
  :hover {
    cursor: url(/cursors/${({ cursor }) => cursor}.png), auto;
  }
`;

const IntroSection = styled.section`
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
        <p>Hi there,</p>
        <p>
          I enjoy doing{" "}
          <strong>
            product design, user research, workshop facilitation, and web
            development
          </strong>{" "}
          for the Growth Team at{" "}
          <Anchor
            href="https://pingboard.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Pingboard
          </Anchor>
          . Before that, I was helping{" "}
          <Anchor
            href="https://www.ibm.com/design/language/"
            rel="noopener noreferrer"
            target="_blank"
          >
            IBM
          </Anchor>{" "}
          elevate the quality of design across business units.
        </p>
        <p>
          <Anchor
            href="https://poster.party"
            rel="noopener noreferrer"
            target="_blank"
          >
            Poster.Party
          </Anchor>{" "}
          was my first personal start-up. It was a community and marketplace for
          collectors of limited edition prints. I have since disabled the
          marketplace-aspect to focus on a{" "}
          <Anchor
            href="https://bruuunch.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            new idea
          </Anchor>
          .
        </p>
        <p>
          Sincerely,
          <br />
          James
        </p>
        <PrimaryActions />
      </IntroSection>
    </>
  );
}
