import React from "react";
import styled from "styled-components";
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";
import Input from "./Input";

const Container = styled.div`
  max-width: 20rem;
  position: relative;

  :hover {
    svg {
      fill: ${({ theme }) => theme.colors.link};
    }
  }
`;

const Icon = styled(ChevronDown20)`
  fill: ${({ theme }) => theme.colors.link};
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0%;
  transform: translate(-0.5rem, 0.75rem);
`;

const Select = styled(Input)`
  padding-right: 2rem;
  width: 100%;
`;

export default function Dropdown({ onChange, options = [], value }) {
  return (
    <Container>
      <Select as="select" onChange={onChange} value={value}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Icon />
    </Container>
  );
}
