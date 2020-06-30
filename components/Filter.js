import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import Button from "./Button";
import Dropdown from "./Dropdown";

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.padding};
`;

const Desktop = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
    display: grid;
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    grid-gap: 1rem;
    justify-content: center;
  }
`;

const Mobile = styled.div`
  display: flex;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const P = styled.p`
  margin: 0;
`;

const FilterButton = ({ label, query: queryString, type, version }) => {
  let query = {};

  if (queryString) {
    query.query = queryString;
  }

  if (version) {
    query.type = version;
  }

  if (type === version || (!type && !version)) {
    return <P>{label}</P>;
  }

  return (
    <Link href={{ pathname: "/search", query }} passHref>
      <Button as="a" ghost>
        {label}
      </Button>
    </Link>
  );
};

export default function Filter({ query, type }) {
  return (
    <Container>
      <Mobile>
        <Dropdown
          label="Filter"
          onChange={(e) => {
            e.preventDefault();
            let query = {};
            if (e.target.value) {
              query.type = e.target.value;
            }

            if (query) {
              query.query = query;
            }
            Router.push({
              pathname: "/search",
              query,
            });
          }}
          options={[
            { label: "All", value: "" },
            { label: "Blog", value: "blog" },
            { label: "Open-Source", value: "open-source" },
            { label: "Talk", value: "talk" },
            { label: "Web App", value: "web-app" },
          ]}
          value={type}
        />
      </Mobile>
      <Desktop>
        <FilterButton label="All" query={query} type={type} />
        <FilterButton label="Blog" query={query} type={type} version="blog" />
        <FilterButton
          label="Open Source"
          query={query}
          type={type}
          version="open-source"
        />
        <FilterButton label="Talk" query={query} type={type} version="talk" />
        <FilterButton
          label="Web App"
          query={query}
          type={type}
          version="web-app"
        />
      </Desktop>
    </Container>
  );
}
