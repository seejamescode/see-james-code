import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

const Container = styled.div`
  transform: translateX(-1.5rem);
  width: calc(100% + 3rem);
`;

export default class Activity extends Component {

  static defaultProps = {
    posts: [],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Container>
        <Masonry
          options={{
            transitionDuration: 0,
          }}
        >
          {this.props.posts}
        </Masonry>
      </Container>
    );
  }
}