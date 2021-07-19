import React from "react";
import styled from "styled-components";
import Anchor from "./anchor";

const Container = styled.aside`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row-start: 1;
  }
`;

const List = styled.ul`
  display: grid;
  grid-gap: ${({ theme }) => theme.padding.xs};
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

export default function Aside({ links }) {
  return (
    <Container>
      {links && links.length ? (
        <>
          <ListTitle>
            <small>
              <strong>Related Links</strong>
            </small>
          </ListTitle>
          <List>
            {links.map(({ fields: { link, primary, title } }) => (
              <ListItem key={title}>
                <ListP>
                  <Anchor href={link} rel="noopener noreferrer" target="_blank">
                    {title}
                  </Anchor>
                </ListP>
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </Container>
  );
}
