import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './post.css';

export class Post extends Component {

  static defaultProps = {
    date: 1,
    dateContext: '...',
    description: '...',
    title: 'Tweet',
    url: '...',
  };

  static propTypes = {
    date: PropTypes.number.isRequired,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  render() {
    return (
      <a
        className={this.props.title === 'Tweet' ? styles.post__tweet : styles.post}
        href={this.props.url}
        target="_blank"
      >
        <h4
          className={styles.title}
        >
          {this.props.title}
        </h4>
        <p
          className={styles.description}
          className={this.props.title === 'Tweet' ? styles.description__tweet : styles.description}
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
        <p
          className={styles.date}
        ><small>{this.props.dateContext} {moment(this.props.date).fromNow()}</small></p>
      </a>
    );
  }
}
export default Post;
