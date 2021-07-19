import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "./anchor";
import Button from "./button";

const Container = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.padding.sm};
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: ${({ theme }) => theme.padding.lg};
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
`;

const Range = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.padding.sm};

  > * {
    grid-row: 1;
    padding: 0 ${({ theme }) => theme.padding.xxs};
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
            <Button as="a">Previous</Button>
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
            <Button as="a">Next</Button>
          </Link>
        ) : (
          <span />
        )}
      </Section>
    </Container>
  );
};

export default Pagination;
