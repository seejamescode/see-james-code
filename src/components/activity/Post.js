import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Actions from './Post/Actions';
import Video from './Post/Video';

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

const Image = styled.img`
  transform: translate(-1rem, -1rem);
  width: calc(100% + 2rem);
`;

const text = `
  overflow-x: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const Likes = styled.small`
  ${text}
`;

const HeaderText = styled.h3`
  ${text}
  font-weight: 600;
`;

const Description = styled.p`
  padding: 1rem 0 2rem;
  word-wrap: break-word;
`;

const DescriptionVideo = styled.p`
  margin-bottom: 0;
  padding-top: 1rem;
`;

const Time = styled.p`
  background: #18D8F0;
  line-height: 1rem;
  margin: 0;
  padding: .5rem 0 1rem 1rem;
  transform: translate(-1rem, -1rem);
  width: calc(100% + 1rem + .5px);
  :before {
    background: url("./pattern.png") repeat;
    background-size: 50px;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
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

  timeSince = (previous) => {
    const current = new Date();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    } else if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    } else if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    } else if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay)} days ago`;
    } else if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth)} months ago`;
    }
    return `${Math.round(elapsed / msPerYear)} years ago`;
  }

  render() {
    return (
      <Container>
        <Time>
          <small>
            {
              this.props.date ? (
                <span>
                  {this.props.dateContext} {this.timeSince(this.props.date)}
                </span>
              ) : 'Currently...'
            }
          </small>
        </Time>
        {
          this.props.html ? (
            <Video
              html={this.props.html}
            />
          ) : ''
        }
        {
          this.props.image ? (
            <Image
              alt="project preview"
              src={this.props.image}
            />
          ) : ''
        }
        <HeaderText>
          {this.props.title}
          <br />
          {
            this.props.position ? this.props.position : ''
          }
        </HeaderText>
        {
          this.props.likes && this.props.likes > 0 && this.props.likesContext
            ? (
              <Likes>
                {this.props.likes} {this.props.likesContext}
              </Likes>
            ) : ''
        }
        {
          this.props.html
            ? (
              <DescriptionVideo
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              />
            )
            : (
              <Description
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              />
            )
        }
        {
          !this.props.html ? (
            <Actions
              buttonContext={this.props.buttonContext}
              code={this.props.code}
              homepage={this.props.homepage}
            />
          ) : ''
        }
      </Container>
    );
  }
}
