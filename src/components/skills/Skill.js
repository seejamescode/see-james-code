import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const wiggle = keyframes`
  0% {transform: translateX(5%);}
  50% {transform: translateX(-5%);}
  100% {transform: translateX(5%);}
`;

const Container = styled.li`
  padding: 1rem .75rem 0 .75rem;
`;

const Content = styled.div`
  background: #18D8F0;
  display: inline-block;
  font-size: 0.75rem;
  padding: 1rem;
  &:hover {
    animation: ${wiggle} .25s infinite;
  }
`;

const Skill = props => (
  <Container>
    <Content>
      {props.text}
    </Content>
  </Container>
);

Skill.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Skill;
