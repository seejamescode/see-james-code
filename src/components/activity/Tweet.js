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
  };

  render() {
    return (
      <a
        className={styles.tweet}
        href={this.props.homepage}
        target="_blank"
      >
        <p
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
      </a>
    );
  }
}
export default Tweet;
