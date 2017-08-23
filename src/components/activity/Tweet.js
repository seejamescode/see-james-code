import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

const Container = styled.a`
  background: white;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.25);
  color: initial;
  margin: 0 1.5rem 1.5em;
  text-decoration: none;
  transition: box-shadow 0.1s ease-in;
  width: calc(100% - 5rem);
  border: 2px solid #F090C0;
  padding: 0 calc(1rem - 2px);
  &:hover, &:focus {
    box-shadow: 8px 8px 20px rgba(0,0,0,0.25);
  }
  @media (min-width: 540px) {
    margin: 0 1.5rem 3em;
    width: calc(50% - 5rem);
  }
  @media (min-width: 850px) {
    width: calc(33.33% - 5rem);
  }
`;

const Logo = styled.svg`
  float: left;
  height: 1rem;
  margin: 1rem .25rem 0 0;
`;

const MediaContainer = styled.div`
  align-items: center;
  background: #939393;
  display: flex;
  max-height: 150px;
  overflow: hidden;
  transform: translateX(calc(-1rem + 2px));
  width: calc(100% + 2rem - 4px);
`;

const media = `
  margin-bottom: -5px;
  width: 100%;
`;

const Image = styled.img`
  ${media}
`;

const Video = styled.video`
  ${media}
`;

const Content = styled.div`
  padding: calc(.75rem - 2px) 0 1rem 0;
`;

export default class Tweet extends Component {

  static defaultProps = {
    description: '...',
    homepage: '',
    image: undefined,
    video: undefined,
  };

  static propTypes = {
    description: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string,
  };

  render() {
    return (
      <Container
        href={this.props.homepage}
        rel="noopener noreferrer"
        target="_blank"
      >
        {
          this.props.image && !this.props.video ? (
            <MediaContainer>
              <LazyLoad height={150} offset={100} once >
                <Image
                  alt="tweet media"
                  src={this.props.image}
                />
              </LazyLoad>
            </MediaContainer>
          ) : ''
        }
        {
          this.props.video ? (
            <MediaContainer>
              <LazyLoad height={150} offset={100} once>
                <Video
                  autoPlay
                  loop
                  muted
                  src={this.props.video}
                />
              </LazyLoad>
            </MediaContainer>
          ) : ''
        }
        <Logo
          version="1.1"
          viewBox="0 0 375 304.7"
          x="0px"
          y="0px"
        >
          <g>
            <path
              d="M141.1,254c94.3,0,145.9-78.2,145.9-145.9c0-2.2,
                0-4.4-0.1-6.6c10-7.2,18.7-16.3,25.6-26.6
                c-9.2,4.1-19.1,6.8-29.5,8.1c10.6-6.3,18.7-16.4,
                22.6-28.4c-9.9,5.9-20.9,10.1-32.6,
                12.4c-9.4-10-22.7-16.2-37.4-16.2
                c-28.3,0-51.3,23-51.3,51.3c0,4,0.5,7.9,
                1.3,11.7c-42.6-2.1-80.4-22.6-105.7-53.6C75.5,
                67.8,73,76.6,73,86 c0,17.8,9.1,33.5,22.8,
                42.7c-8.4-0.3-16.3-2.6-23.2-6.4c0,0.2,0,0.4,0,
                0.7c0,24.8,17.7,45.6,41.1,50.3c-4.3,1.2-8.8,
                1.8-13.5,1.8 c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.4,
                25.5,35.2,47.9,35.6c-17.6,13.8-39.7,22-63.7,
                22c-4.1,0-8.2-0.2-12.2-0.7
                C85.2,245.5,112.2,254,141.1,254"
            />
          </g>
        </Logo>
        <Content>
          <small
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.props.description }}
          />
        </Content>
      </Container>
    );
  }
}