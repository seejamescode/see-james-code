import React from "react";
import styled from "styled-components";
import Hearts from "./hearts";
import ShareLinks from "./share";

const Container = styled.footer`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row-start: 2;
  }
`;

const Content = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: ${({ theme }) => theme.padding.md};
  }
`;

const HeartsAndShare = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-gap: ${({ theme }) => theme.padding.md};
    grid-template-columns: 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-gap: 0;
  }
`;

export default function Footer({ slug }) {
  return (
    <Container>
      <Content>
        <HeartsAndShare>
          <Hearts slug={slug} />
          <ShareLinks />
        </HeartsAndShare>
      </Content>
    </Container>
  );
}
