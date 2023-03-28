import React from "react";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";
import { Portal } from "reakit/Portal";
import LockedIcon from "@carbon/icons-react/lib/locked/20";
import styled from "styled-components";
import ButtonToggle from "./button-toggle";
import { TooltipArrowStyled, TooltipStyled } from "./hearts";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

export default function CaseStudyAccess() {
  const tooltip = useTooltipState({
    animated: true,
    baseId: `case-study-unlocked`,
    placement: "top-end",
  });

  return (
    <Container>
      <TooltipReference
        aria-label="Access design portfolio"
        as={ButtonToggle}
        {...tooltip}
      >
        <a
          href={process.env.NEXT_PUBLIC_PORTFOLIO_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LockedIcon />
        </a>
      </TooltipReference>
      <Portal>
        <Tooltip {...tooltip}>
          <TooltipStyled>
            <TooltipArrowStyled {...tooltip} size={24} />
            My design portfolio is password-protected, but reach out if you want
            to learn more about my process.
          </TooltipStyled>
        </Tooltip>
      </Portal>
    </Container>
  );
}
