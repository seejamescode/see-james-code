import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './post.css';

export class Post extends Component {

  static defaultProps = {
    date: 1,
    dateContext: '...',
    description: '...',
    title: 'Tweet',
  };

  static propTypes = {
    date: PropTypes.number.isRequired,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className={styles.post}
      >
        {
          this.props.title !== 'Tweet' ? (
            <h4
              className={styles.title}
            >
              {this.props.title}
            </h4>
          ) : ''
        }
        <p
          className={styles.description}
        >{this.props.description}</p>
        <p
          className={styles.date}
        ><small>{this.props.dateContext} {moment(this.props.date).fromNow()}</small></p>
      </div>
    );
  }
}
export default Post;
