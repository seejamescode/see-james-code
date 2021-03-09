import React from "react";
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover";
import SeachIcon from "@carbon/icons-react/lib/search/20";
import styled from "styled-components";
import ButtonToggle from "./button-toggle";
import Search from "./search";

const Container = styled.div`
  position: relative;
`;

const PopoverArrowStyled = styled(PopoverArrow)`
  fill: ${({ theme }) => theme.colors.background};
  filter: ${({ theme }) => theme.colors.dropShadow};
  z-index: -1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const PopoverDisclosureContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const PopoverStyled = styled(Popover)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: initial !important;
    position: relative !important;
    transform: none !important;
  }
`;

export default function SearchToggle({}) {
  const popover = usePopoverState({
    unstable_offset: 16,
    unstable_fixed: true,
    unstable_preventOverflow: true,
  });
  return (
    <Container>
      <PopoverDisclosureContainer>
        <PopoverDisclosure aria-label="Search" as={ButtonToggle} {...popover}>
          <SeachIcon />
        </PopoverDisclosure>
      </PopoverDisclosureContainer>
      <PopoverStyled {...popover} aria-label="Welcome">
        <PopoverArrowStyled {...popover} />
        <Search />
      </PopoverStyled>
    </Container>
  );
}
