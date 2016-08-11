import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import Post from './activity/Post';
import styles from './activity.css';

export class Activity extends Component {

  static defaultProps = {
    posts: [],
    repos: [],
    tweets: [],
    videos: [],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    repos: PropTypes.array.isRequired,
    tweets: PropTypes.array.isRequired,
    videos: PropTypes.array.isRequired,
  };

  render() {
    const posts = this.props.posts.map(post => <Post {...post} key={post.id} />);
    const repos = this.props.repos.map(repo => <Post {...repo} key={repo.id} />);
    const tweets = this.props.tweets.map(tweet => <Post {...tweet} key={tweet.id} />);
    const videos = this.props.videos.map(video => <Post {...video} key={video.id} />);
    const data = [...posts, ...repos, ...tweets, ...videos]
      .sort((a, b) => b.props.date - a.props.date);

    return (
      <Masonry
        className={styles.activity}
      >
        {data}
      </Masonry>
    );
  }
}
export default Activity;
