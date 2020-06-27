import React from "react";
import SearchIcon from "@carbon/icons-react/lib/search/20";
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from "reakit/Popover";
import styled from "styled-components";
import Search from "./Search";

const SearchButton = styled(PopoverDisclosure)`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  padding: 0;

  :focus,
  :hover {
    svg {
      fill: ${({ theme }) => theme.colors.link};
    }
  }

  :active {
    svg {
      fill: ${({ theme }) => theme.colors.linkActive};
    }
  }
`;

const SearchArrow = styled(PopoverArrow)`
  fill: ${({ theme }) => theme.colors.link};
`;

const SearchPopover = styled(Popover)`
  z-index: 2;
`;

const SearchPopoverContent = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0px 50px ${({ theme }) => theme.colors.linkActive};
  transform: translateX(1rem);
`;

export default function SearchToggle() {
  const popover = usePopoverState({
    placement: "bottom-end",
    unstable_preventOverflow: true,
  });
  return (
    <>
      <SearchButton aria-label="Open Search" {...popover}>
        <SearchIcon />
      </SearchButton>
      <SearchPopover {...popover} aria-label="Search">
        <SearchArrow {...popover} size={20} />
        <SearchPopoverContent>
          <Search
            hideOuterBoxShadow
            isRequired
            onSubmit={popover.hide}
            shouldClearOnSubmit
          />
        </SearchPopoverContent>
      </SearchPopover>
    </>
  );
}
