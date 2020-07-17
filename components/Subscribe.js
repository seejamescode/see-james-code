import React, { useEffect, useState } from "react";
import CircleDash20 from "@carbon/icons-react/lib/circle-dash/20";
import Checkmark24 from "@carbon/icons-react/lib/checkmark/24";
import Twitter20 from "@carbon/icons-react/lib/logo--twitter/20";
import styled, { keyframes } from "styled-components";
import Anchor from "./Anchor";
import Button from "./Button";
import Input from "./Input";

const NUMBERED_PORTRAITS = 3;

const Bio = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: calc(3 * ${({ theme }) => theme.padding}) 1fr;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: calc(4 * ${({ theme }) => theme.padding}) 1fr;
  }
`;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 30rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 2;
    margin: calc(2 * ${({ theme }) => theme.padding}) auto;
  }
`;

const Error = styled.p`
  color: red;
  margin: 0;
`;

const Follow = styled.div`
  text-align: center;
`;

const Form = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  display: flex;
  margin: 0 auto calc(${({ theme }) => theme.padding} / 2) auto;
  max-width: 30rem;
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem;

  svg {
    animation: ${spin} 2.5s infinite linear;
  }
`;

const PortraitHover = styled.div`
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  position: relative;

  :after {
    background: url(${({ portrait }) => portrait}-hover.png);
    background-size: 100% 100%;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity 300ms ${({ theme }) => theme.animation.hover};
    width: 100%;
  }

  :hover:after {
    opacity: 1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: calc(4 * ${({ theme }) => theme.padding});
  }
`;

const Portrait = styled.img`
  display: block;
  width: 100%;
`;

const SubscribeButton = styled(Button)`
  flex: 0;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: unset;
  }
`;

const SubscribeInput = styled(Input)`
  margin-right: -${({ theme }) => theme.borderRadius};
  padding-right: ${({ theme }) => theme.borderRadius};
  width: 100%;
`;

const Success = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100%;

  svg {
    fill: green;
    margin-right: 0.5rem;
  }
`;

const PLACEHOLDER_EMAILS = [
  "liz.lemon@tgs.com",
  "c.kent@dailyplanet.com",
  "n.fury@shield.com",
  "darth.vader@empire.gov",
];

export default function Subscribe() {
  const [isError, setIsError] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [placeholder, setPlaceholder] = useState();
  const [portrait, setPortrait] = useState(undefined);

  useEffect(() => {
    setPortrait(
      `/pictures/james-y-rauhut-${Math.ceil(
        Math.random() * NUMBERED_PORTRAITS
      )}`
    );
  }, []);

  useEffect(() => {
    setPlaceholder(
      PLACEHOLDER_EMAILS[Math.floor(Math.random() * PLACEHOLDER_EMAILS.length)]
    );
  }, []);

  const subscribe = async (e) => {
    e.preventDefault();
    setIsError();
    setIsSubmitting(true);

    const response = await fetch("/api/subscribe", {
      body: JSON.stringify({ email: e.target.elements.email.value }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    setIsSubmitting(false);
    if (response.ok) {
      setIsSuccess(true);
    } else {
      console.error(response.statusText);
      setIsError(true);
    }
  };

  return (
    <Container>
      <Bio>
        <div>
          <PortraitHover portrait={portrait}>
            <picture>
              <source srcSet={`${portrait}.webp`} type="image/webp" />
              <Portrait
                alt="Portrait of James Y Rauhut"
                title="Photo by David Avila"
                src={`${portrait}.jpg`}
              />
            </picture>
          </PortraitHover>
        </div>
        <BioText>
          James loves to design, code, and talk about weird web apps from ATX.
          He also writes snippets from the third-person.{" "}
          <strong>
            Want a first-person view of what he is learning? Join the
            newsletter:
          </strong>
        </BioText>
      </Bio>
      <Form onSubmit={subscribe}>
        <SubscribeInput
          aria-label="Email"
          disabled={isSuccess || isSubmitting}
          placeholder={placeholder}
          name="email"
          required
          type="email"
        />
        {!isSubmitting && !isSuccess && (
          <SubscribeButton hideOuterBoxShadow type="submit">
            Subscribe
          </SubscribeButton>
        )}
        {isSubmitting && (
          <Loader>
            <CircleDash20 />
          </Loader>
        )}
        {isSuccess && (
          <Success>
            <Checkmark24 />
            <small>Successfully subscribed!</small>
          </Success>
        )}
        {isError && (
          <Error>
            <small>
              Sorry, something went wrong on my end or that email is already
              subscribed.
            </small>
          </Error>
        )}
      </Form>
      <Follow>
        <Anchor
          href="https://twitter.com/SeeJamesCode?ref_src=twsrc%5Etfw"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter20 />
          Follow @seejamescode
        </Anchor>
      </Follow>
    </Container>
  );
}
