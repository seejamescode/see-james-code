import React from "react";
import styled from "styled-components";
import Anchor from "./Anchor";

const Aside = styled.aside`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column-end: -1;
    grid-row-start: 2;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;

  :last-child {
    padding-bottom: 0;
  }
`;

const ListP = styled.p`
  margin: 0;
`;

const ListTitle = styled.p`
  margin-bottom: 0;
  text-align: center;
`;

const P = styled.p`
  margin: 0;
  text-align: center;
`;

export default function Sidebar({ created, links }) {
  return (
    <Aside>
      <P>{created}</P>
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
    </Aside>
  );
}
