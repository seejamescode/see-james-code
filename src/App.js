import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import Activity from './components/Activity';
import Intro from './components/Intro';
import Post from './components/activity/Post';
import Skills from './components/Skills';

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

injectGlobal([`
  a, small, li, p, h3 {
    color: #2a2a2a;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }

  h2 {
    font-size: 3.375rem;
    font-family: 'Permanent Marker', cursive;
    line-height: 3.375rem;
    margin: 0;
  }

  p {
    font-size: 16px;
    line-height: 1.5rem;
  }
`]);

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  padding-top: 3rem;
`;

const Content = styled.div`
  margin: 0 1rem;
  max-width: 960px;
  width: calc(100% - 2rem);

  @media (min-width: 640px) {
    margin: 0 3rem;
    width: calc(100% - 6rem);
  }
`;

const Section = styled.section`
  padding: 2rem 0 4rem 0;
`;

const actions = [
  'Code',
  'Write',
  'Design',
  'Run',
  'Code',
  'D̶a̶n̶c̶e̶ ̶',
  'Live',
  'Jump',
  'Code',
  'Teach',
  'Confused',
  'Tweet',
];

export default class App extends Component {

  state = {
    posts: [],
    roles: [],
    title: 0,
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

    setInterval(this.changeTitle, 5000);
  }

  changeTitle = () => {
    const title = this.state.title + 1 === actions.length
      ? 0
      : this.state.title + 1;

    this.setState({
      title,
    });
  }

  render() {
    return (
      <Container>
        <Helmet
          title={`See James ${actions[this.state.title]}`}
        />
        <Content>
          <Section>
            <Intro />
          </Section>
          <Section>
            <Skills />
          </Section>
          <Section>
            <Activity
              posts={this.state.posts}
            />
          </Section>
        </Content>
      </Container>
    );
  }
}
