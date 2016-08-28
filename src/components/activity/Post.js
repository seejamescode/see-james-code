import React, { Component, PropTypes } from 'react';

import Actions from './Post/Actions';
import moment from 'moment';
import styles from './post.css';
import Video from './Post/Video';

export class Post extends Component {

  static propTypes = {
    code: PropTypes.string,
    date: PropTypes.number,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    embed: PropTypes.object,
    homepage: PropTypes.string,
    position: PropTypes.string,
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
          <small>
            {
              this.props.date ? (
                <span>{this.props.dateContext} {moment(this.props.date).fromNow()}</span>
              ) : 'Currently...'
            }
          </small>
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
          <br />
          <span
            className={styles.subtitle}
          >
          {
            this.props.position ? this.props.position : ''
          }
          </span>
        </h4>
        <p
          className={this.props.embed ? styles.descriptionVideo : styles.description}
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
        {
          !this.props.embed ? (
            <Actions
              homepage={this.props.homepage}
              code={this.props.code}
            />
          ) : ''
        }
      </div>
    );
  }
}
export default Post;
