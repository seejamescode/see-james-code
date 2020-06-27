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
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0%;
  transform: translate(-0.5rem, 0.5rem);
`;

const Select = styled(Input)`
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff;

  padding-right: 2rem;
  width: 100%;

  :hover {
    box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff;
  }

  :focus {
    box-shadow: 0px 0px 0px 2px blue, 5px 5px 15px #d9d9d9,
      -5px -5px 15px #ffffff;
    outline: none;
  }
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
