import styled from "styled-components";
import LockedIcon from "@carbon/icons-react/lib/locked/32";
import Button from "./button";

const Description = styled.p`
  margin: 0;
  max-width: 30ch;
  text-align: center;
`;

const ValidationBox = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.padding.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.sm};
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => `${theme.padding.xl} ${theme.padding.sm}`};
`;

export default function CaseStudyBlock({}) {
  return (
    <ValidationBox>
      <LockedIcon />
      <Description>
        The case studies in my design portfolio are password-protected.
      </Description>
      <Button
        as="a"
        href={process.env.NEXT_PUBLIC_PORTFOLIO_LINK}
        rel="noopener noreferrer"
        target="_blank"
      >
        View portfolio
      </Button>
    </ValidationBox>
  );
}
