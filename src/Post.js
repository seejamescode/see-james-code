import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad, { forceCheck } from 'react-lazyload';
import styled from 'styled-components';
import Actions from './Actions';

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
  height: 100%;
  left: 0;
  min-width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  position: absolute;
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
  
  componentDidMount() {
    setTimeout(() => forceCheck(), 100);
  }

  render() {
    return (
      <Container>
        <Time>
          {this.props.dateContext} {this.props.timeSince}
        </Time>
        {
          this.props.image ? (
            <ImageContainer>
              <ImageResponsiveness>
                <LazyLoad
                  height={'100%'}
                  offset={1000}
                  once
                >
                  <Image
                    alt="project preview"
                    src={this.props.image}
                  />
                </LazyLoad>
              </ImageResponsiveness>
            </ImageContainer>
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