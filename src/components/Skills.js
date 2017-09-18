import React from 'react';
import styled from 'styled-components';
import Skill from './skills/Skill';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
  transform: translateX(-.75rem);
`;

const Content = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  width: calc(100% + 1.5rem);
  @media (min-width: 888px) {
    justify-content: space-between;
  }
`;

const Skills = () => (
  <Container>
    <Content>
      <Skill text={'HTML5 & CSS3'} />
      <Skill text={'Design Thinking'} />
      <Skill text={'JavaScript'} />
      <Skill text={'React'} />
      <Skill text={'Redux'} />
      <Skill text={'Node'} />
      <Skill text={'User Research'} />
    </Content>
  </Container>
);

export default Skills;
