import React, { Component, PropTypes } from 'react';

import Actions from './Post/Actions';
import moment from 'moment';
import styles from './post.css';
import Video from './Post/Video';

export class Post extends Component {

  static propTypes = {
    code: PropTypes.string,
    buttonContext: PropTypes.string,
    date: PropTypes.number,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    embed: PropTypes.object,
    image: PropTypes.string,
    likes: PropTypes.number,
    likesContext: PropTypes.string,
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
        {
          this.props.image ? (
            <img
              alt="project preview"
              className={styles.image}
              src={this.props.image}
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
        {
          this.props.likes && this.props.likes > 0 && this.props.likesContext ? (
            <p
              className={styles.likes}
            >
              {this.props.likes} {this.props.likesContext}
            </p>
          ) : ''
        }
        <p
          className={this.props.embed ? styles.descriptionVideo : styles.description}
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
        {
          !this.props.embed ? (
            <Actions
              buttonContext={this.props.buttonContext}
              code={this.props.code}
              homepage={this.props.homepage}
            />
          ) : ''
        }
      </div>
    );
  }
}
export default Post;
