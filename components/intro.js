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
  font-size: ${({ theme }) => theme.type.c.size};
  line-height: ${({ theme }) => theme.type.c.line};
  margin: 0;
  max-width: 37ch;

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
          <HoverCursor cursor="pencil">Product Designer</HoverCursor> in{" "}
          <HoverCursor cursor="taco">Austin, Texas</HoverCursor>
        </Title>
      </section>
      <IntroSection>
        <Tagline>
          I'm a product designer that loves making delightful and helpful
          experiences for <i>everyone</i>.
        </Tagline>
        <IntroGrid>
          <div>
            <p>
              I enjoy product design and user research. During free time, I make{" "}
              <Link href="/search?type=project" passHref>
                <Anchor>light-hearted products</Anchor>
              </Link>
              , collect posters, and pet my dog.
            </p>
            <p>
              I currently work at{" "}
              <Anchor
                href="https://guideline.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Guideline
              </Anchor>
              , helping small business owners overcome the complexity of
              offering retirement benefits. At{" "}
              <Anchor
                href="https://pingboard.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pingboard
              </Anchor>
              , I designed data-driven UI experiences on the Growth Team. At
              IBM, I used front-end engineering skills to help all business
              units align on the{" "}
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
