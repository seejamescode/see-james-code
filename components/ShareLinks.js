import React, { useEffect, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";

const Container = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: auto;
    max-width: 15rem;
  }
`;

const Shares = styled.div`
  display: flex;
  justify-content: space-between;
  /* Negative margin accounts for svg padding of icons */
  margin: 0 -0.5rem;

  svg {
    height: ${({ theme }) => theme.padding};
    width: ${({ theme }) => theme.padding};
  }

  path {
    fill: ${({ theme }) => theme.colors.font};
  }

  rect {
    fill: none;
  }

  .email {
    :focus,
    :hover {
      path {
        fill: ${({ theme }) => theme.colors.link};
      }
    }
  }
  .facebook {
    :focus,
    :hover {
      path {
        fill: ${({ theme }) => theme.colors.brands.facebook};
      }
    }
  }
  .linkedin {
    :focus,
    :hover {
      path {
        fill: ${({ theme }) => theme.colors.brands.linkedin};
      }
    }
  }
  .reddit {
    :focus,
    :hover {
      path {
        fill: ${({ theme }) => theme.colors.brands.reddit};
      }
    }
  }
  .twitter {
    :focus,
    :hover {
      path {
        fill: ${({ theme }) => theme.colors.brands.twitter};
      }
    }
  }
`;

const Title = styled.p`
  margin: 0;
  text-align: center;
`;

export default function Sidebar(props) {
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Container>
      <Title>
        {" "}
        <small>
          <strong>Share with Other Humans</strong>
        </small>
      </Title>
      <Shares>
        <EmailShareButton className="email" url={url}>
          <EmailIcon />
        </EmailShareButton>
        <FacebookShareButton className="facebook" url={url}>
          <FacebookIcon />
        </FacebookShareButton>
        <LinkedinShareButton className="linkedin" url={url}>
          <LinkedinIcon />
        </LinkedinShareButton>
        <RedditShareButton className="reddit" url={url}>
          <RedditIcon />
        </RedditShareButton>
        <TwitterShareButton className="twitter" url={url}>
          <TwitterIcon />
        </TwitterShareButton>
      </Shares>
    </Container>
  );
}