import React, { Component, PropTypes } from 'react';
import styles from './actions.css';

export class Actions extends Component {

  static defaultProps = {
    code: '',
    homepage: '',
  };

  static propTypes = {
    code: PropTypes.string,
    homepage: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className={styles.actions}
      >
        <a
          className={styles.link}
          href={this.props.code}
          style={{
            display: !this.props.code ? 'none' : '',
          }}
          target="_blank"
        >
          <div
            className={styles.background}
          />
          Code
        </a>
        <a
          className={styles.link}
          href={this.props.homepage}
          style={{
            display: !this.props.homepage ? 'none' : '',
          }}
          target="_blank"
        >
          View
        </a>
      </div>
    );
  }
}
export default Actions;
