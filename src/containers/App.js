import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import * as Actions from '../Actions';
import Activity from '../components/Activity';
import Intro from '../components/Intro';
import Skills from '../components/Skills';
import styles from './app.css';

const JamesYRauhut = require('../images/JamesYRauhut.png');

class App extends Component {

  static defaultProps = {
    actions: {},
    posts: [],
    repos: [],
    roles: [],
    tweets: [],
    videos: [],
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array,
    repos: PropTypes.array,
    roles: PropTypes.array,
    tweets: PropTypes.array,
    videos: PropTypes.array,
  };

  componentDidMount() {
    this.props.actions.getGithubRepos();
    this.props.actions.getLocalRoles();
    this.props.actions.getMediumPosts();
    this.props.actions.getTwitterTweets();
    this.props.actions.getVimeoVideos();
  }

  render() {
    return (
      <div
        className={styles.container}
      >
        <Helmet
          title="James Y Rauhut"
          meta={[
            {
              name: 'description',
              content: 'ATX Designer working for IBM Design.' +
              ' I love coding, researching, and trying my best for God.',
            },
            {
              property: 'og:image',
              content: JamesYRauhut,
            },
          ]}
        />
        <div
          className={styles.content}
        >
          <Intro />
          <Skills />
          <Activity
            posts={this.props.posts}
            repos={this.props.repos}
            roles={this.props.roles}
            tweets={this.props.tweets}
            videos={this.props.videos}
          />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    ...state,
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(App);
