import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../Actions';

import styles from '../app.css';
import Section from '../components/Section';

export class App extends Component {

  componentDidMount() {
    this.props.actions.getGithubRepos();
    this.props.actions.getMediumPosts();
    this.props.actions.getTwitterTweets();
  }

  render() {
    return (
      <div>
        <Section />
      </div>
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