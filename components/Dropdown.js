import React from "react";
import styled from "styled-components";
import ChevronDown20 from "@carbon/icons-react/lib/chevron--down/20";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  margin: auto;
  position: relative;
  /* Magic number is width of search bar */
  width: 17.86rem;

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

const Label = styled.label`
  align-items: center;
  display: flex;
  padding-right: 1rem;
`;

const Select = styled(Input)`
  color: ${({ theme }) => theme.colors.background};
  padding-right: 2rem;
  width: 100%;
`;

export default function Dropdown({ label, onChange, options = [], value }) {
  return (
    <Container>
      <Label htmlFor={label}>{label}:</Label>
      <Select
        as="select"
        id={label}
        name={label}
        onChange={onChange}
        value={value}
      >
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
