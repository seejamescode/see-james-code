import React, { Component } from 'react';
import styles from './skills.css';

export class Skills extends Component {

  render() {
    return (
      <div
        className={styles.about}
      >
        <h3
          className={styles.header}
        >
          Favorite Tools
        </h3>
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
export default Skills;
