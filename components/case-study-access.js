import React from "react";
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover";
import {
  Tooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from "reakit/Tooltip";
import { Portal } from "reakit/Portal";
import LockedIcon from "@carbon/icons-react/lib/locked/20";
import UnlockedIcon from "@carbon/icons-react/lib/unlocked/20";
import styled from "styled-components";
import ButtonToggle from "./button-toggle";
import CaseStudyForm from "./case-study-form";
import { TooltipArrowStyled, TooltipStyled } from "./hearts";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ContentContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.padding.xs};
  box-shadow: ${({ hideBoxShadow, theme }) =>
    hideBoxShadow ? "none" : theme.colors.backgroundShadowLarge};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding.sm};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0;
  padding-bottom: ${({ theme }) => theme.padding.xs};
`;

const PopoverArrowStyled = styled(PopoverArrow)`
  fill: ${({ theme }) => theme.colors.background};
  filter: ${({ theme }) => theme.colors.dropShadow};
  z-index: -1;
`;

export default function CaseStudyAccess({ isAuthenticated }) {
  const popover = usePopoverState({
    baseId: "case-study-locked",
    placement: "top-end",
    unstable_offset: 16,
    unstable_fixed: true,
    unstable_preventOverflow: true,
  });
  const tooltip = useTooltipState({
    animated: true,
    baseId: `case-study-unlocked`,
    placement: "top-end",
  });

  if (isAuthenticated) {
    return (
      <Container>
        <TooltipReference
          aria-label="Case studies unlocked"
          as={ButtonToggle}
          {...tooltip}
        >
          <UnlockedIcon />
        </TooltipReference>
        <Portal>
          <Tooltip {...tooltip}>
            <TooltipStyled>
              <TooltipArrowStyled {...tooltip} size={24} />
              You've unlocked access to case studies.
            </TooltipStyled>
          </Tooltip>
        </Portal>
      </Container>
    );
  }

  return (
    <Container>
      <PopoverDisclosure
        aria-label="Enter password for case studies"
        as={ButtonToggle}
        {...popover}
      >
        <LockedIcon />
      </PopoverDisclosure>

      <Portal>
        <Popover {...popover} aria-label="Case study access">
          <PopoverArrowStyled {...popover} />
          <ContentContainer>
            <Description>
              Provide a password to access case studies:
            </Description>
            <CaseStudyForm hideOutline />
          </ContentContainer>
        </Popover>
      </Portal>
    </Container>
  );
}
