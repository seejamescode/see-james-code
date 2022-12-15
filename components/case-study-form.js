import React, { useEffect, useState } from "react";
import SubmitIcon from "@carbon/icons-react/lib/send/20";
import Router from "next/router";
import styled from "styled-components";
import ButtonToggle from "./button-toggle";
import Input from "./input";
import checkAuthenticated from "../lib/checkAuth";

const Absolute = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  right: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.xs};
`;

const Error = styled.p`
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  margin: 0;
`;

const Form = styled.form`
  border: ${(props) =>
    props.hideOutline ? "none" : `1px solid ${props.theme.colors.font}`};
  border-radius: ${({ theme }) => theme.padding.xs};
  display: flex;
  justify-content: flex-end;
  position: relative;
  max-width: 20rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    box-shadow: none;
  }
`;

export default function CaseStudyForm({ hideOutline, isRequired, query = "" }) {
  const [error, setError] = useState();
  const [value, setValue] = useState(query);

  return (
    <Container>
      <Form
        hideOutline={hideOutline}
        onSubmit={async (e) => {
          e.preventDefault();
          setError();
          const result = await checkAuthenticated({
            accessCode: value,
          });

          if (result) {
            localStorage.setItem("accessCode", value);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            setError("Hmm, I don't recognize that password.");
          }
        }}
      >
        <Input
          aria-label="Password"
          hasTrailingIcon
          name="accessCode"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password"
          required={isRequired}
          type="password"
          value={value}
        />
        <Absolute>
          <ButtonToggle
            aria-label="Submit password"
            hideOuterBoxShadow
            type="submit"
          >
            <SubmitIcon />
          </ButtonToggle>
        </Absolute>
      </Form>
      {error ? <Error>{error}</Error> : null}
    </Container>
  );
}
