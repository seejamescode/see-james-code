import React, { Component, PropTypes } from 'react';

import FlipMove from 'react-flip-move';
import Post from './activity/Post';

export class Activity extends Component {

  static defaultProps = {
    posts: [],
    repos: [],
    tweets: [],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    repos: PropTypes.array.isRequired,
    tweets: PropTypes.array.isRequired,
  };

  render() {
    const posts = this.props.posts.map(post => <Post {...post} key={post.id} />);
    const repos = this.props.repos.map(repo => <Post {...repo} key={repo.id} />);
    const tweets = this.props.tweets.map(tweet => <Post {...tweet} key={tweet.id} />);
    const data = [...posts, ...repos, ...tweets].sort((a, b) => b.props.date - a.props.date);

    return (
      <section>
        <FlipMove
          easing="cubic-bezier(0, 0.7, 0.8, 0.1)"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            transform: 'translateY(-1rem)',
          }}
        >
          {data}
        </FlipMove>
      </section>
    );
  }
}
export default Activity;
