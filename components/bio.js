import React, { useEffect, useState } from "react";
import Linkedin20 from "@carbon/icons-react/lib/logo--linkedin/20";
import styled from "styled-components";
import Anchor from "./anchor";

const NUMBERED_PORTRAITS = 3;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.padding.md};
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: ${({ theme }) => theme.padding.xl} 1fr;
  }
`;

const PortraitHover = styled.div`
  border-radius: 50%;
  margin: auto;
  max-width: ${({ theme }) => theme.padding.xl};
  overflow: hidden;
  position: relative;

  :after {
    background: ${({ portrait }) =>
      portrait ? `url(${portrait}-hover.png)` : "none"};
    background-size: 100% 100%;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity 300ms ${({ theme }) => theme.animation.hover};
    width: 100%;
  }

  :hover:after {
    opacity: 1;
  }
`;

const Portrait = styled.img`
  display: block;
  width: 100%;
`;

export default function Bio() {
  const [portrait, setPortrait] = useState(undefined);

  useEffect(() => {
    setPortrait(
      `/pictures/james-y-rauhut-${Math.ceil(
        Math.random() * NUMBERED_PORTRAITS
      )}`
    );
  }, []);

  return (
    <Container>
      <div>
        {portrait ? (
          <PortraitHover portrait={portrait}>
            <picture>
              <source srcSet={`${portrait}.webp`} type="image/webp" />
              <Portrait
                alt="Portrait of James Y Rauhut"
                title="Photo by David Avila"
                src={`${portrait}.jpg`}
              />
            </picture>
          </PortraitHover>
        ) : null}
      </div>
      <BioText>
        James loves to design, code, and talk about weird web apps from ATX. He
        also writes snippets from the third-person.
        <br />
        <Anchor
          href="https://www.linkedin.com/in/seejamesdesign/"
          icon={<Linkedin20 />}
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect on LinkedIn
        </Anchor>
      </BioText>
    </Container>
  );
}
