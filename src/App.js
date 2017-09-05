import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import * as api from './Api';
import * as format from './Format';
import Activity from './components/Activity';
import Intro from './components/Intro';
import Section from './components/Section';
import Skills from './components/Skills';

injectGlobal([`
  a, small, li, p, h3 {
    color: #2a2a2a;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }

  /* Golden Ratio */

  h2 {
    font-size: 3.375rem;
    font-family: 'Permanent Marker', cursive;
    line-height: 3.375rem;
    margin: 0;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 16px;
    line-height: 1.5rem;
  }

  small, li {
    font-size: .667rem;
    line-height: .667rem;
  }
`]);

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const Content = styled.div`
  margin: 0 1rem;
  max-width: 960px;
  width: calc(100% - 2rem);

  @media (min-width: 720px) {
    margin: 0 3rem;
    width: calc(100% - 6rem);
  }
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
    favicon: 'eyes',
    posts: [],
    repos: [],
    roles: [],
    title: 0,
    tweets: [],
    videos: [{
      date: 1497538496000,
      dateContext: "Video posted",
      description: "IBM Software Designer James Y. Rauhut shows what a normal work-day is like for FreeCodeCamp.",
      html: "<iframe src='https://www.youtube.com/embed/FXfYSn8qaUE' frameborder='0' allowfullscreen></iframe>",
      id: "FXfYSn8qaUE",
      title: "A Day at IBM with Designer James Rauhut"
    }],
  };

  componentDidMount() {
    api.github((data) => {
      format.github(data, (repos) => {
        this.setState({ repos });
      });
    });

    api.medium((data) => {
      format.medium(data, (posts) => {
        this.setState({ posts });
      });
    });

    api.twitter((data) => {
      format.twitter(data, (tweets) => {
        this.setState({ tweets });
      });
    });

    api.vimeo((data) => {
      format.vimeo(data, (videos) => {
        this.setState({ videos: [...this.state.videos, ...videos] });
      });
    });

    setInterval(this.changeTitle, 5000);
  }

  changeTitle = () => {
    const favicon = this.state.favicon === 'eyes'
      ? 'eyes-alt'
      : 'eyes';

    const title = this.state.title + 1 === actions.length
      ? 0
      : this.state.title + 1;

    this.setState({
      favicon,
      title,
    });
  }

  render() {
    return (
      <Container>
        <Helmet
          title={`See James ${actions[this.state.title]}`}
          link={[
              { rel: 'shortcut icon', href: `./${this.state.favicon}.ico` },
          ]}
        />
        <Content>
          <Section>
            <Intro />
          </Section>
          <Section title={'Favorite Tools'}>
            <Skills />
          </Section>
          <Section title={'Latest Stuff'}>
            <Activity
              posts={this.state.posts}
              repos={this.state.repos}
              roles={this.state.roles}
              tweets={this.state.tweets}
              videos={this.state.videos}
            />
          </Section>
        </Content>
      </Container>
    );
  }
}
