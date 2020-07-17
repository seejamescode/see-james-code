import React from "react";
import styled from "styled-components";
import Hearts from "./Hearts";
import ShareLinks from "./ShareLinks";

const Container = styled.footer`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row-start: 3;
  }
`;

const Content = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: ${({ theme }) => theme.padding};
  }
`;

const HeartsAndShare = styled.div`
  display: grid;
  grid-gap: calc(${({ theme }) => theme.padding} * 2);
  grid-template-columns: min-content 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: unset;
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
