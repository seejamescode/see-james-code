import React, { Component } from 'react';
import styles from './intro.css';
import Logo from './intro/Logo';

export class Intro extends Component {

  render() {
    return (
      <div
        className={styles.intro}
      >
        <Logo />
        <p
          className={styles.description}
        >
          ATX Designer working for IBM Design.
          I love coding, researching, and trying my best for God.
          <br />
          Reach me by <a className={styles.link} href="mailto:james@seejamescode.com">email</a> or <a className={styles.link} href="https://twitter.com/seejamescode">Twitter</a>.
        </p>
      </div>
    );
  }
}
export default Intro;
