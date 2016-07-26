import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../Actions';
import Activity from '../components/Activity';
import Logo from '../components/Logo';
import '../typography.css';

class App extends Component {

  static defaultProps = {
    actions: {},
    posts: [],
    repos: [],
    tweets: [],
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array,
    repos: PropTypes.array,
    tweets: PropTypes.array,
  };

  componentDidMount() {
    this.props.actions.getGithubRepos();
    this.props.actions.getMediumPosts();
    this.props.actions.getTwitterTweets();
  }

  render() {
    return (
      <div>
        <Logo />
        <Activity
          posts={this.props.posts}
          repos={this.props.repos}
          tweets={this.props.tweets}
        />
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
