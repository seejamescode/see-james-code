import React, { Component } from 'react';
import styles from './about.css';

export class About extends Component {

  render() {
    return (
      <div
        className={styles.about}
      >
        <p
          className={styles.introduction}
        >
          ATX Designer working for IBM Design.
          I love coding, researching, and trying my best for God.
          <br />
          Reach me by <a className={styles.link} href="mailto:james@seejamescode.com">email</a> or <a className={styles.link} href="https://twitter.com/seejamescode">Twitter</a>.
        </p>
        <ul
          className={styles.skills}
        >
          <li
            className={styles.skill}
          >
            HTML5 & CSS3
          </li>
          <li
            className={styles.skill}
          >
            Design Thinking
          </li>
          <li
            className={styles.skill}
          >
            Javascript
          </li>
          <li
            className={styles.skill}
          >
            ReactJS
          </li>
          <li
            className={styles.skill}
          >
            Redux
          </li>
          <li
            className={styles.skill}
          >
            Node.js
          </li>
          <li
            className={styles.skill}
          >
            User Research
          </li>
        </ul>
      </div>
    );
  }
}
export default About;
