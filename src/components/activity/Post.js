import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import Actions from './Post/Actions';

const Container = styled.div`
  background: white;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.25);
  color: initial;
  margin: 0 1.5rem 1.5em;
  padding: 1rem;
  text-decoration: none;
  transition: box-shadow 0.1s ease-in;
  width: calc(100% - 5rem);
  @media (min-width: 540px) {
    margin: 0 1.5rem 3em;
    width: calc(50% - 5rem);
  }
  @media (min-width: 850px) {
    width: calc(33.33% - 5rem);
  }
`;

const Footer = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`

const Image = styled.img`
  background: #fff;
  flex-shrink: 0;
  max-width: 150%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
`;

const ImageResponsiveness = styled.div`
  align-items: flex-start;
  display: flex;
  height: 0;
  justify-content: center;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
`

const ImageContainer = styled.div`
  background: #ececec;
  transform: translate(-1rem, -1rem);
  width: calc(100% + 2rem);
`;


const text = `
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const Likes = styled.p`
  ${text}
  font-size: .75rem;
  padding-top: .25rem;
`;

const HeaderText = styled.h3`
  ${text}
  font-weight: bold;
  font-size: 1.333rem;
  line-height: 1.75;
  margin-top: -.5rem;
`;

const Description = styled.p`
  padding-top: 2rem;
  line-height: 1.75;
  word-wrap: break-word;
`;

const Time = styled.p`
  background: #18D8F0;
  box-sizing: border-box;
  font-size: .75rem;
  line-height: 1rem;
  margin: 0;
  padding: 1rem;
  transform: translate(-1rem, -1rem);
  width: calc(100% + 2rem);
`;

const Video = styled.div`
  height: 0;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  > iframe {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export default class Post extends Component {

  static defaultProps = {
    buttonContext: '',
    code: '',
    date: '',
    dateContext: '',
    description: '',
    html: '',
    image: '',
    likes: 0,
    likesContext: '',
    homepage: '',
    position: '',
    title: '',
  };

  static propTypes = {
    buttonContext: PropTypes.string,
    code: PropTypes.string,
    date: PropTypes.number,
    dateContext: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    html: PropTypes.string,
    image: PropTypes.string,
    likes: PropTypes.number,
    likesContext: PropTypes.string,
    homepage: PropTypes.string,
    position: PropTypes.string,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Container>
        <Time>
          {this.props.dateContext} {this.props.timeSince}
        </Time>
        {
          this.props.html ? (
            <LazyLoad
              height={150}
              offset={300}
              once
            >
              <ImageContainer>
                <Video
                  dangerouslySetInnerHTML={{ __html: this.props.html }}
                />
              </ImageContainer>
            </LazyLoad>
          ) : ''
        }
        {
          this.props.image ? (
            <LazyLoad
              height={150}
              offset={300}
              once
            >
              <ImageContainer>
                <ImageResponsiveness>
                  <Image
                    alt="project preview"
                    src={this.props.image}
                  />
                </ImageResponsiveness>
              </ImageContainer>
            </LazyLoad>
          ) : ''
        }
        <HeaderText>
          {this.props.title}
          <br />
          {
            this.props.position ? this.props.position : ''
          }
        </HeaderText>
        <Description
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
        <Footer>
          {
            this.props.likes > 0
              ? (
                <Likes>
                  {this.props.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Like{this.props.likes > 1 ? 's' : null}
                </Likes>
              ) : ''
          }
          <Actions
            buttonContext={this.props.buttonContext}
            code={this.props.code}
            homepage={this.props.homepage}
          />
        </Footer>
      </Container>
    );
  }
}