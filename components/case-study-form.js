import React from "react";
import styled from "styled-components";
import Button from "./button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CaseStudyForm() {
  return (
    <Container>
      <Button
        as="a"
        href={process.env.NEXT_PUBLIC_PORTFOLIO_LINK}
        rel="noopener noreferrer"
        target="_blank"
      >
        View portfolio
      </Button>
    </Container>
  );
}
