import React, { Component, PropTypes } from 'react';

const moment = require('moment');

export class Post extends Component {

  static defaultProps = {
    date: 1,
    dateContext: '...',
    description: '...',
    title: 'Tweet',
  };

  static propTypes = {
    date: PropTypes.number.isRequired,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div
        style={{
          background: '#ececec',
          margin: '1rem',
          width: 'calc(100% - 4rem)',
          padding: '1rem',
        }}
      >
        <h3>
          {this.props.title}
        </h3>
        <p>{this.props.description}</p>
        <p
          style={{
            marginBottom: 0,
          }}
        ><small>{this.props.dateContext} {moment(this.props.date).fromNow()}</small></p>
      </div>
    );
  }
}
export default Post;
