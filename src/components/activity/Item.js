import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.25);
  color: initial;
  display: inline-block;
  margin: 0 0 1.5em;
  transition: box-shadow 0.1s ease-in;
  width: 100%;
  // @media (min-width: 540px) {
  //   margin: 0 1.5rem 3em;
  //   width: calc(50% - 3rem);
  // }
  // @media (min-width: 850px) {
  //   width: calc(33.33% - 3rem);
  // }
`;

export default function Item(props) {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

Item.propTypes = {
  children: PropTypes.element.isRequired,
};
