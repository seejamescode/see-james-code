import React from 'react';
import styled from 'styled-components';
import Logo from './intro/Logo';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
    padding-bottom: 0;
  }
`;

const Description = styled.p`
  align-self: center;
  max-width: 24rem;
  padding-top: 3rem;
  text-align: center;
  @media (min-width: 720px) {
    text-align: left;
  }
`;

const Link = styled.a`
  display: inline-block;
  position: relative;
  text-decoration: none;
  &:after {
    background: #F090C0;
    content: '';
    display: block;
    height: 2px;
    transform: translateY(-3px);
    width: 100%;
  }
`;

const Intro = () => (
  <Container>
    <Logo />
    <Description>
      ATX Designer working for IBM Design.
      I love coding, researching, and trying my best for God.
      Reach me by <Link href="mailto:james@seejamescode.com" rel="noopener" target="_blank">email</Link> or <span><Link href="https://twitter.com/seejamescode" rel="noopener" target="_blank">Twitter</Link>.</span>
    </Description>
  </Container>
);

export default Intro;
