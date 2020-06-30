import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "./Anchor";
import Button from "./Button";

const Container = styled.nav`
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: ${({ theme }) => theme.padding};
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
`;

const Range = styled.div`
  display: grid;
  grid-gap: 0.125rem;

  > * {
    grid-row: 1;
    padding: 0 0.125rem;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: ${({ align }) => align};
`;

const Pagination = ({ page, query, totalPages, url }) => {
  const delta = 2;
  const queryText = query ? `&query=${encodeURI(query)}` : "";
  const hasNextPage = totalPages > page;
  const hasPrevPage = page > 1;

  let range = [];
  for (
    let i = Math.max(2, page - delta);
    i <= Math.min(totalPages - 1, page + delta);
    i += 1
  ) {
    range.push(i);
  }

  if (page - delta > 1) {
    range.unshift("...");
  }
  if (page + delta < totalPages - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (totalPages !== 1) range.push(totalPages);
  range = range.map((item, index) => {
    if (typeof item !== "number") {
      return <span key={"..." + index}>...</span>;
    }

    if (item === page) {
      return <span key={item}>{item}</span>;
    }

    return (
      <Link href={`${url}?page=${item}${queryText}`} key={item} passHref>
        <Anchor aria-label={`Page ${item}`}>{item}</Anchor>
      </Link>
    );
  });

  return (
    <Container>
      <Section align="flex-start">
        {hasPrevPage ? (
          <Link href={`${url}?page=${page - 1}${queryText}`} passHref>
            <Button as="a" ghost>
              Previous
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </Section>
      <Section align="center">
        <Flex>
          <Range>{range}</Range>
        </Flex>
      </Section>
      <Section align="flex-end">
        {hasNextPage ? (
          <Link href={`${url}?page=${page + 1}${queryText}`} passHref>
            <Button as="a" ghost>
              Next
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </Section>
    </Container>
  );
};

export default Pagination;
