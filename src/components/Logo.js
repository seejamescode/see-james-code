import React, { Component } from 'react';
import styles from './logo.css';

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
        className={styles.container}
      >
        <div
          className={styles.logo}
        >
          <div
            className={styles.oval}
            style={{
              transform: `translate(${10 * percX}px, ${10 * percY}px) rotateZ(-10deg)`,
            }}
          />
          <h1
            className={styles.text}
            style={{
              transform: `translate(${-5 * percX}px, ${-5 * percY}px)`,
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
