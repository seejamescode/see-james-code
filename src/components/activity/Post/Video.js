import React, { Component, PropTypes } from 'react';
import styles from './video.css';

export class Video extends Component {

  static propTypes = {
    html: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className={styles.container}
      >
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
        />
      </div>
    );
  }
}
export default Video;
