import React, { Component, PropTypes } from 'react';
import styles from './actions.css';

export class Actions extends Component {

  static defaultProps = {
    homepage: '',
  };

  static propTypes = {
    buttonContext: PropTypes.string,
    code: PropTypes.string,
    homepage: PropTypes.string,
  };

  render() {
    let buttonContext;
    if (this.props.buttonContext) {
      buttonContext = this.props.buttonContext;
    } else if (this.props.homepage) {
      buttonContext = 'View';
    } else {
      buttonContext = 'Code';
    }

    return (
      <div
        className={styles.actions}
      >
        <a
          className={styles.link}
          href={this.props.code}
          style={{
            display: !this.props.code || (this.props.code && !this.props.homepage) ? 'none' : '',
          }}
          rel="noopener"
          target="_blank"
        >
          <div
            className={styles.background}
          />
          Code
        </a>
        <a
          className={styles.link}
          href={this.props.homepage ? this.props.homepage : this.props.code}
          style={{
            display: !this.props.homepage && !this.props.code ? 'none' : '',
          }}
          rel="noopener"
          target="_blank"
        >
          {buttonContext}
        </a>
      </div>
    );
  }
}
export default Actions;
