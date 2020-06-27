import React from "react";
import styled from "styled-components";
import Document20 from "@carbon/icons-react/lib/document/20";
import Email20 from "@carbon/icons-react/lib/email/20";
import Twitter20 from "@carbon/icons-react/lib/logo--twitter/20";
import Anchor from "./Anchor";

const List = styled.ul`
  list-style: none;
  margin: calc(2 * ${({ theme }) => theme.padding}) 0;
  padding: 0;

  > li {
    margin-bottom: 1rem;
  }
`;

function PrimaryActions() {
  return (
    <List>
      <li>
        <Anchor
          href="https://drive.google.com/file/d/1YtKEgIAPdBOm1fMSg5dpdLY65zTZFJLP/view?usp=sharing"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Document20 />
          Review my life with a resume.
        </Anchor>
      </li>
      <li>
        <Anchor
          href="mailto:james@seejamescode.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Email20 />
          Email me about opportunities.
        </Anchor>
      </li>
      <li>
        <Anchor
          href="https://twitter.com/seejamescode"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter20 />
          Follow me in a non-creepy way.
        </Anchor>
      </li>
    </List>
  );
}

export default PrimaryActions;
