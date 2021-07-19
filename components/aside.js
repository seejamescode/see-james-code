import React, { useMemo } from "react";
import styled from "styled-components";
import Anchor from "./anchor";
import Button from "./button";

const Container = styled.aside`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.md};
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row-start: 1;
  }
`;

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.padding.xs};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 0;

  * {
    font-size: ${({ theme }) => theme.type.small.size};
    line-height: ${({ theme }) => theme.type.small.line};
  }
`;

const ListP = styled.p`
  margin: 0;
`;

const ListTitle = styled.p`
  margin: 0;
  text-align: center;
`;

const PrimaryLink = styled(Button)`
  max-width: ${({ theme }) => theme.maxWidthHeader};
  text-align: center;
  width: 100%;
`;

export default function Aside({ links }) {
  const primaryLinks = useMemo(
    () => links.filter(({ fields: { primary } }) => primary),
    [links]
  );
  const secondaryLinks = useMemo(
    () => links.filter(({ fields: { primary } }) => !primary),
    [links]
  );

  return (
    <Container>
      {links && links.length ? (
        <>
          {primaryLinks?.length ? (
            <>
              {primaryLinks.map(({ fields: { link, title } }) => (
                <PrimaryLink
                  as="a"
                  href={link}
                  key={link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {title}
                </PrimaryLink>
              ))}
            </>
          ) : null}
          {secondaryLinks?.length ? (
            <div>
              <ListTitle>
                <small>
                  <strong>Related Links</strong>
                </small>
              </ListTitle>
              <List>
                {secondaryLinks.map(({ fields: { link, title } }) => (
                  <ListItem key={link}>
                    <ListP>
                      <Anchor
                        href={link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {title}
                      </Anchor>
                    </ListP>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </>
      ) : null}
    </Container>
  );
}
