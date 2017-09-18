import React from 'react';
import styled from 'styled-components';
import Logo from './intro/Logo';

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
    padding-bottom: 0;
  }
`;

const Description = styled.p`
  @media (min-width: 640px) {
    max-width: 24rem;
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
      I love to code, research, and try my best for God.
      Reach me by <Link href="mailto:james@seejamescode.com" rel="noopener" target="_blank">email</Link> or <span><Link href="https://twitter.com/seejamescode" rel="noopener" target="_blank">Twitter</Link>.</span>
    </Description>
  </Container>
);

export default Intro;
