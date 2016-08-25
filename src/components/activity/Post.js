import React, { Component, PropTypes } from 'react';

import Actions from './Post/Actions';
import moment from 'moment';
import styles from './post.css';
import Video from './Post/Video';

export class Post extends Component {

  static defaultProps = {
    date: 1,
    dateContext: '...',
    description: '...',
    title: 'Tweet',
  };

  static propTypes = {
    code: PropTypes.string,
    date: PropTypes.number.isRequired,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    embed: PropTypes.object,
    homepage: PropTypes.string,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        className={styles.post}
      >
        <p
          className={styles.date}
        >
          <small>{this.props.dateContext} {moment(this.props.date).fromNow()}</small>
        </p>
        {
          this.props.embed ? (
            <Video
              html={this.props.embed.html}
            />
          ) : ''
        }
        <h4
          className={styles.title}
        >
          {this.props.title}
        </h4>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
        <Actions
          homepage={this.props.homepage}
          code={this.props.code}
        />
      </div>
    );
  }
}
export default Post;
