import React, { Component } from 'react';
import Activity from './Activity';
import Post from './Post';

const TimeSince = function(previous) {
  const current = new Date();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} months ago`;
  }
  return `${Math.round(elapsed / msPerYear)} years ago`;
}

export default class App extends Component {

  state = {
    posts: [],
  };

  componentDidMount() {
    fetch('/posts', {
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((posts) => {
      this.setState({
        posts: posts.map(item => <Post {...item} key={item.source + item.id} timeSince={TimeSince(item.date)} />)
      });
    })
    .catch((err) => {
      console.error('Error ', err);
    });
  }

  render() {
    return (
      <Activity
        posts={this.state.posts}
      />
    );
  }
}
