import React from "react";
import styled from "styled-components";
import Hearts from "./hearts";
import ShareLinks from "./share";

const Container = styled.footer`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row: ${({ allRows }) => (allRows ? "1 / -1" : "2 / -1")};
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
    gap: ${({ theme }) => theme.padding.md};
    grid-template-columns: 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 0;
  }
`;

export default function Footer({ allRows, slug }) {
  return (
    <Container allRows={allRows}>
      <Content>
        <HeartsAndShare>
          <Hearts slug={slug} />
          <ShareLinks />
        </HeartsAndShare>
      </Content>
    </Container>
  );
}
