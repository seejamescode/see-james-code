import React, { Component } from 'react';

export class Logo extends Component {

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
    const percX = this.state.mousePos.x / window.innerWidth - 0.5;
    const percY = this.state.mousePos.y / window.innerWidth - 0.5;

    return (
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            margin: '3rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              background: '#18D8F0',
              boxSizing: 'content-box',
              border: 'none',
              borderRadius: '50%',
              height: '90%',
              position: 'absolute',
              textOverflow: 'clip',
              top: '5%',
              transform: `translate(${5 * percX}px, ${5 * percY}px) rotateZ(-10deg)`,
              width: '100%',
              zIndex: -1,
            }}
          />
          <h1
            style={{
              color: '#F090C0',
              margin: 0,
              padding: '0 5%',
              textAlign: 'center',
              textShadow: '2px 2px black',
              transform: `translate(${-2.5 * percX}px, ${-2.5 * percY}px)`,
              whiteSpace: 'nowrap',
              width: '90%',
            }}
          >
            James Y.
            <br />
            Rauhut
          </h1>
        </div>
      </section>
    );
  }
}

export default Logo;
