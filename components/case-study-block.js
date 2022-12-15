import styled from "styled-components";
import LockedIcon from "@carbon/icons-react/lib/locked/32";
import CaseStudyForm from "./case-study-form";

const Description = styled.p`
  margin: 0;
`;

const ValidationBox = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.padding.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.md};
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => `${theme.padding.xl} ${theme.padding.sm}`};
`;

export default function CaseStudyBlock({}) {
  return (
    <ValidationBox>
      <LockedIcon />
      <Description>
        The case studies are private. Access them with a password below:
      </Description>
      <CaseStudyForm />
    </ValidationBox>
  );
}
