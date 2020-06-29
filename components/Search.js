import React, { useEffect, useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";

const Form = styled.form`
  display: flex;
  justify-content: flex-end;
  max-width: 20rem;
`;

const SearchButton = styled(Button)`
  width: 100%;
`;
const SearchInput = styled(Input)`
  margin-right: -${({ theme }) => theme.borderRadius};
  padding-right: ${({ theme }) => theme.borderRadius};
`;

const PLACEHOLDER_QUERIES = [
  "Progressive Web App",
  "Component Library",
  "Design System",
  "Grid Design",
];

export default function Search({
  hideBoxShadow,
  isRequired,
  onSubmit = () => {},
  shouldClearOnSubmit,
  query = "",
}) {
  const [placeholder, setPlaceholder] = useState();
  const [value, setValue] = useState(query);

  useEffect(() => {
    setPlaceholder(
      PLACEHOLDER_QUERIES[
        Math.floor(Math.random() * PLACEHOLDER_QUERIES.length)
      ]
    );
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();

        Router.push({
          pathname: "/search",
          query: value && { query: value },
        });
        if (shouldClearOnSubmit) {
          setValue("");
        }
      }}
    >
      <SearchInput
        aria-label="Search Query"
        hideBoxShadow={hideBoxShadow}
        name="query"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
        type="text"
        value={value}
      />
      <SearchButton hideOuterBoxShadow type="submit">
        Search
      </SearchButton>
    </Form>
  );
}
