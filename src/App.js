import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from './Actions';

export class App extends Component {

  componentDidMount() {
    this.props.actions.getGithubRepos();
    this.props.actions.getMediumPosts();
    this.props.actions.getTwitterTweets();
  }

  render() {
    return (
      <Radium.StyleRoot>
        <div>
          hello world
        </div>
      </Radium.StyleRoot>
    );
  }
}

function mapState(state) {
  return {
    ...state
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);