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
          I am a web designer in ATX, currently at IBM Design.
          With a business degree in MIS and a certificate in digital media studies,
          I like to give a new perspective on web development.
          Passions include user needs, mobile-first design, and design thinking.
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
          <li
            className={styles.skill}
          >
            Creative Cloud
          </li>
        </ul>
      </div>
    );
  }
}
export default About;
