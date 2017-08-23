import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Link = styled.a`
  background: #F090C0;
  border-width: 2px;
  border-style: solid;
  border-color: #FFFFFF #808080 #808080 #FFFFFF;
  margin: 0 0 0 1rem;
  padding: .1rem 1rem .35rem 1rem;
  text-align: center;
  text-decoration: none;
  &:nth-child(odd) {
    background: transparent;
    border-color: #F090C0;
  }
  &::before {
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: box-shadow 0.1s ease-in;
    width: 100%;
    z-index: -1;
  }
  &:focus::before, &:hover::before {
    box-shadow: 8px 8px 20px rgba(0,0,0,0.25);
  }
`;

export default class Actions extends Component {

  static defaultProps = {
    buttonContext: '',
    code: '',
    homepage: '',
  };

  static propTypes = {
    buttonContext: PropTypes.string,
    code: PropTypes.string,
    homepage: PropTypes.string,
  };

  render() {
    let buttonContext;
    if (this.props.buttonContext) {
      buttonContext = this.props.buttonContext;
    } else if (this.props.homepage) {
      buttonContext = 'View';
    } else {
      buttonContext = 'Code';
    }

    return (
      <Container>
        <Link
          href={this.props.code}
          style={{
            display: !this.props.code || (this.props.code && !this.props.homepage) ? 'none' : '',
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <small>Code</small>
        </Link>
        <Link
          href={this.props.homepage ? this.props.homepage : this.props.code}
          style={{
            display: !this.props.homepage && !this.props.code ? 'none' : '',
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <small>{buttonContext}</small>
        </Link>
      </Container>
    );
  }
}