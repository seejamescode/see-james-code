import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 8rem;
  padding: 0 0 3rem 0;

  @media (min-width: 640px) {
    padding: 0 3rem 0 0;
  }
`;

const Content = styled.a`
  position: relative;
  text-decoration: none;
  &:hover, &:focus {
    > .oval {
      box-shadow: 8px 8px 20px rgba(0,0,0,0.25);
      padding-top: 2rem;
    }
    > .text {
      font-size: 5.06rem;
      line-height: 5.06rem;
    }
  }
`;

const Oval = styled.div`
  background: #18D8F0;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.25);
  box-sizing: content-box;
  border: none;
  border-radius: 50%;
  height: 90%;
  position: absolute;
  text-overflow: clip;
  top: 5%;
  transition: all 0.1s ease-in;
  width: 100%;
`;

const Text = styled.h2`
  color: #F090C0;
  margin: 0;
  padding: 0 5%;
  text-align: center;
  text-shadow: 2px 2px 5px black;
  transition: all 0.1s ease-in;
  white-space: nowrap;
  width: 90%;
`;

export default class Logo extends Component {

  state = {
    mousePos: {
      x: 0,
      y: 0,
    },
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.setState({ mousePos: {
      x: e.clientX,
      y: e.clientY,
    } });
  }

  render() {
    const percX = (this.state.mousePos.x / window.innerWidth) - 0.5;
    const percY = (this.state.mousePos.y / window.innerWidth) - 0.5;

    return (
      <Container>
        <Content
          href="./"
        >
          <Oval
            className={'oval'}
            style={{
              transform:
                `translate(${10 * percX}px, ${10 * percY}px) rotateZ(-10deg)`,
            }}
          />
          <Text
            className={'text'}
            style={{
              transform: `translate(${-5 * percX}px, ${-5 * percY}px)`,
            }}
          >
            James Y.
            <br />
            Rauhut
          </Text>
        </Content>
      </Container>
    );
  }
}
