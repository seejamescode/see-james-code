import React, { PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';

const wiggle = keyframes`
  0% {transform: rotate(3deg);}
  50% {transform: rotate(-3deg);}
  100% {transform: rotate(3deg);}
`;

const Container = styled.li`
  padding: 1rem .75rem 0 .75rem;
`;

const Content = styled.div`
  background: #18D8F0;
  border-top: 6px dashed #ececec;
  display: inline-block;
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
