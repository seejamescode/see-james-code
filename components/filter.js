import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Button from "./button";
import { FILTERS } from "../lib/constants";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.padding.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const ButtonStyled = styled(Button)`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.type.small.size};
  justify-content: flex-end;
  padding: ${({ theme }) => theme.padding.xs};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.type.a.size};
    padding: ${({ theme }) => `${theme.padding.xs} ${theme.padding.sm}`};
  }
`;

const FilterButton = ({ label, query: queryString, type, version }) => {
  let query = {};

  if (queryString) {
    query.query = queryString;
  }

  if (version) {
    query.type = version;
  }

  return (
    <Link href={{ pathname: "/search", query }} passHref>
      <ButtonStyled
        as="a"
        isSelected={type === version || (!type && !version)}
        underline
      >
        {label}
      </ButtonStyled>
    </Link>
  );
};

export default function Filter({ query, type }) {
  return (
    <Container>
      {Object.entries(FILTERS).map(([key, { isNoFiltering, label }]) => (
        <FilterButton
          key={key}
          label={label}
          query={query}
          type={type}
          version={!isNoFiltering && key}
        />
      ))}
    </Container>
  );
}
