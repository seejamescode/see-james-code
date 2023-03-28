import React from "react";
import styled from "styled-components";
import Document20 from "@carbon/icons-react/lib/document/20";
import Email20 from "@carbon/icons-react/lib/email/20";
import LinkedIn20 from "@carbon/icons-react/lib/logo--linkedin/20";
import Anchor from "./anchor";
import Locked20 from "@carbon/icons-react/lib/locked/20";

const List = styled.ul`
  list-style: none;
  margin: 0;
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
          href="https://www.linkedin.com/in/seejamesdesign/"
          icon={<LinkedIn20 />}
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect on LinkedIn
        </Anchor>
      </li>
      <li>
        <Anchor
          href="https://drive.google.com/file/d/1YtKEgIAPdBOm1fMSg5dpdLY65zTZFJLP/view?usp=sharing"
          icon={<Document20 />}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Resume
        </Anchor>
      </li>
      <li>
        <Anchor
          href={process.env.NEXT_PUBLIC_PORTFOLIO_LINK}
          icon={<Locked20 />}
          rel="noopener noreferrer"
          target="_blank"
        >
          Explore the portfolio
        </Anchor>
      </li>
      <li>
        <Anchor
          href="mailto:james@seejamesdesign.com"
          icon={<Email20 />}
          rel="noopener noreferrer"
          target="_blank"
        >
          Email Me
        </Anchor>
      </li>
    </List>
  );
}

export default PrimaryActions;
