import React, { Component, PropTypes } from 'react';

import styles from './tweet.css';

export class Tweet extends Component {

  static defaultProps = {
    date: 1,
    dateContext: '...',
    description: '...',
  };

  static propTypes = {
    date: PropTypes.number.isRequired,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string,
  };

  render() {
    return (
      <a
        className={styles.tweet}
        href={this.props.homepage}
        target="_blank"
      >
        {
          this.props.image && !this.props.video ? (
            <div
              className={styles.mediaContainer}
            >
              <img
                alt="tweet media"
                className={styles.media}
                src={this.props.image}
              />
            </div>
          ) : ''
        }
        {
          this.props.video ? (
            <div
              className={styles.mediaContainer}
            >
              <video
                autoPlay
                className={styles.media}
                loop
                muted
                src={this.props.video}
              />
            </div>
          ) : ''
        }
        <svg
          className={styles.logo}
          version="1.1"
          viewBox="0 0 375 304.7"
          x="0px"
          y="0px"
        >
          <g>
            <path
              d="M141.1,254c94.3,0,145.9-78.2,145.9-145.9c0-2.2,
                0-4.4-0.1-6.6c10-7.2,18.7-16.3,25.6-26.6
                c-9.2,4.1-19.1,6.8-29.5,8.1c10.6-6.3,18.7-16.4,
                22.6-28.4c-9.9,5.9-20.9,10.1-32.6,
                12.4c-9.4-10-22.7-16.2-37.4-16.2
                c-28.3,0-51.3,23-51.3,51.3c0,4,0.5,7.9,
                1.3,11.7c-42.6-2.1-80.4-22.6-105.7-53.6C75.5,
                67.8,73,76.6,73,86 c0,17.8,9.1,33.5,22.8,
                42.7c-8.4-0.3-16.3-2.6-23.2-6.4c0,0.2,0,0.4,0,
                0.7c0,24.8,17.7,45.6,41.1,50.3c-4.3,1.2-8.8,
                1.8-13.5,1.8 c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.4,
                25.5,35.2,47.9,35.6c-17.6,13.8-39.7,22-63.7,
                22c-4.1,0-8.2-0.2-12.2-0.7
                C85.2,245.5,112.2,254,141.1,254"
            />
          </g>
        </svg>
        <p
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
      </a>
    );
  }
}
export default Tweet;
