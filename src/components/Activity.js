import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import Post from './activity/Post';
import styles from './activity.css';
import Tweet from './activity/Tweet';

export class Activity extends Component {

  static defaultProps = {
    posts: [],
    repos: [],
    roles: [],
    tweets: [],
    videos: [],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    repos: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
    tweets: PropTypes.array.isRequired,
    videos: PropTypes.array.isRequired,
  };

  render() {
    // I am given an array of info on
    // Github repos, Medium posts, Twitter tweets, and a Vimeo video.

    // I needed to sort the array by most recent,
    // but never display more than two tweets in a row.
    // The two tweets in the row should be the most popular.
    let data = [
      ...this.props.posts,
      ...this.props.repos,
      ...this.props.roles,
      ...this.props.tweets,
      ...this.props.videos]
      .sort((a, b) => b.date - a.date)
      .map((item, index) => Object.assign({ index }, item));

    // Group tweets that are sorted together
    // and filter the two most popular for each series
    let arrayTweetGroupings = data.filter(item => item.source !== 'twitter')
      .map((item) => item.index)
      .map((item, index, array) => [item + 1, array[index + 1]])
      .filter((item) => item[1] !== undefined)
      .map((array) => data.slice(array[0], array[1]))
      .filter((array) => array.length > 0)
      .map((array) => {
        // filter the tweet arrays here
        let filteredTweets = array;
        const maxTweetsInARow = 2;
        if (array.length > maxTweetsInARow) {
          filteredTweets = filteredTweets.sort((a, b) => b.popularity - a.popularity)
            .slice(0, maxTweetsInARow);
        }
        return filteredTweets;
      });

    // Flatten the arrays of tweets together
    arrayTweetGroupings = [].concat(...arrayTweetGroupings);

    // Remove the tweets and add the filtered ones
    data = data.filter((item) => item.source !== 'twitter');
    data = [...data, ...arrayTweetGroupings]
      .sort((a, b) => b.date - a.date)
      .map((item) => item.source === 'twitter' // eslint-disable-line no-confusing-arrow
        ? <Tweet {...item} key={item.source + item.id} />
        : <Post {...item} key={item.source + item.id} />
      );
    return (
      <div
        className={styles.container}
      >
        <h3
          className={styles.header}
        >
          Latest Stuff
        </h3>
        <Masonry
          className={styles.activity}
        >
          {data}
        </Masonry>
      </div>
    );
  }
}
export default Activity;
