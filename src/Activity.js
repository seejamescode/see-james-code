import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

const actions = [
  'Code',
  'Write',
  'Design',
  'Run',
  'Code',
  'D̶a̶n̶c̶e̶ ̶',
  'Live',
  'Jump',
  'Code',
  'Teach',
  'Confused',
  'Tweet',
];

const Container = styled.div`
  transform: translateX(-1.5rem);
  width: calc(100% + 3rem);
`;

export default class Activity extends Component {
  state = {
    title: 0,
  };

  static defaultProps = {
    posts: [],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
  };
  
  componentDidMount() {
    setInterval(this.changeTitle, 5000);
  }

  changeTitle = () => {
    const title = this.state.title + 1 === actions.length
      ? 0
      : this.state.title + 1;

    this.setState({
      title,
    });
  }

  render() {
    return (
      <Container>
        <Helmet
          title={`See James ${actions[this.state.title]}`}
        />
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