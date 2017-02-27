import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding-bottom: 4rem;
`;

const Content = styled.div`
  padding-top: 2rem;
`;

const Title = styled.h3`
  border-bottom: 1px #bdbdbd solid;
  display: flex;
`;

export default class Section extends Component {

  static defaultProps = {
    title: null,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
  };

  render() {
    return (
      <Container>
        <Title
          style={{
            display: this.props.title
              ? null
              : 'none',
          }}
        >
          {this.props.title}
        </Title>
        <Content>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}
