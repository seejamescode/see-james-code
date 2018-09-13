import React, { Component } from "react";
import styled from "styled-components";
import cursor from "./cursors/cursor.png";
import select from "./cursors/select.png";

const determineURL = function(url, supportsWebP) {
  let result = `background-image: url(${url});`;

  if (
    supportsWebP &&
    !url.includes("http") &&
    (url.includes("jpg") || url.includes("jpeg") || url.includes("png"))
  ) {
    result = `${result} background-image: url("${url.split(".")[0]}.webp");`;
  }

  return result;
};

const Content = styled.div`
  box-sizing: border-box;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const GoButton = styled.a`
  background: var(--highlight);
  bottom: 0;
  box-sizing: border-box;
  color: white;
  font-size: 1.125rem;
  display: ${props => (props.selected || props.size === 2 ? "flex" : "none")};
  margin: 0;
  opacity: ${props =>
    (props.selected && !props.transitioning) || props.size === 2 ? 1 : 0};
  padding: calc(var(--padding) - 0.3rem) var(--padding);
  position: absolute;
  right: 0;
  text-decoration: none;
  transition: opacity 300ms var(--curve);
  z-index: 2;

  @media (min-width: 40rem) {
    display: ${props => (props.selected ? "flex" : "none")};
    opacity: ${props => (props.selected && !props.transitioning ? 1 : 0)};
  }
`;

const GridItem = styled.div`
  background: white;
  ${props =>
    props.backgroundDownloaded && props.supportsWebP !== undefined
      ? determineURL(props.backgroundDownloaded, props.supportsWebP)
      : "background: #ededed;"} background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  grid-column: span ${props => (props.selected ? 2 : props.size)};
  grid-row: span ${props => (props.selected ? 2 : props.size)};
  margin: 0;
  padding: 0;
  position: relative;

  :before {
    ${props =>
      props.background && props.supportsWebP !== undefined
        ? determineURL(props.background, props.supportsWebP)
        : "background: #ededed;"} background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    content: "";
    display: block;
    padding-top: 100%;
  }

  @media (min-width: 40rem) {
    grid-column: span ${props => (props.selected ? 3 : props.size)};
    grid-row: span ${props => (props.selected ? 3 : props.size)};
  }
`;

const Likes = styled.p`
  background: var(--black);
  bottom: 0;
  box-sizing: border-box;
  color: white;
  font-size: ${props =>
    props.selected || props.size === 2 ? "1.125rem" : ".75rem"};
  display: ${props =>
    props.likes > 1 && (!props.transitioning || !props.selected)
      ? "initial"
      : "none"};
  left: 0;
  margin: 0;
  opacity: ${props => (props.transitioning !== props.identification ? 1 : 0)};
  padding: calc(var(--padding) - 0.3rem) var(--padding);
  position: absolute;
  text-decoration: none;
  transition: ${props =>
    props.selected ? "opacity 300ms var(--curve)" : "none"};
  z-index: 1;

  svg {
    fill: white;
    padding-right: 0.8rem;
    width: 0.9rem;
  }

  @media (min-width: 40rem) {
    font-size: ${props => (props.selected ? "1.125rem" : ".75rem")};
    padding: ${props =>
      props.selected
        ? "calc(var(--padding) - 0.3rem) var(--padding)"
        : "calc((var(--padding) - 0.3rem) * .25) calc(var(--padding) * .25)"};

    svg {
      padding-right: ${props => (props.selected ? ".8rem" : ".5rem")};
      width: ${props => (props.selected ? ".9rem" : ".6rem")};
    }
  }
`;

const SelectButton = styled.button`
  background: transparent;
  border: none;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  transition: outline 100ms var(--curve), outline-offset 100ms var(--curve);
  width: 100%;
  z-index: 1;

  :focus,
  :hover {
    cursor: ${props => (props.size === 2 ? `url(${cursor}) 6 0, auto` : null)};
    outline: ${props =>
      !props.selected && !props.transitioning && props.size !== 2
        ? "0.35rem solid var(--highlight)"
        : "none"};
    outline-offset: -0.35rem;
  }

  @media (min-width: 40rem) {
    :focus,
    :hover {
      cursor: url(${select}) 12 0, auto;
      outline: ${props =>
        !props.selected && !props.transitioning
          ? "0.35rem solid var(--highlight)"
          : "none"};
    }
  }
`;

const Title = styled.h2`
  background: var(--black);
  box-sizing: border-box;
  color: white;
  font-size: 1.125rem;
  display: ${props => (props.selected || props.size === 2 ? "flex" : "none")};
  opacity: ${props =>
    (props.selected && !props.transitioning) || props.size === 2 ? 1 : 0};
  margin: 0;
  padding: calc(var(--padding) - 0.3rem) var(--padding);
  position: relative;
  transition: opacity 300ms var(--curve);
  z-index: 1;

  @media (min-width: 40rem) {
    display: ${props => (props.selected ? "flex" : "none")};
    opacity: ${props => (props.selected && !props.transitioning ? 1 : 0)};
  }
`;

class Post extends Component {
  state = {
    background: undefined
  };

  componentDidMount() {
    if (this.props.supportsWebP !== undefined) {
      this.updateImage();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selected !== this.props.selected ||
      prevProps.supportsWebP !== this.props.supportsWebP
    ) {
      this.updateImage();
    }
  }

  onSelect = url => {
    this.setState({ background: url }, () => {
      this.props.onClick(this.props.id);
    });
  };

  updateImage() {
    console.log("updating");
    const componentHeight = document.getElementById(this.props.id).clientHeight;
    let matched = false;

    for (let i = 0; i < this.props.images.length; i++) {
      if (
        !matched &&
        (this.props.images[i].size > componentHeight ||
          i === this.props.images.length - 1)
      ) {
        matched = true;

        this.setState({
          background: this.props.images[i].url
        });
      }
    }
  }

  render() {
    return (
      <GridItem
        background={this.state.background}
        backgroundDownloaded={this.props.images[0].url}
        id={this.props.id}
        size={this.props.size}
        selected={this.props.selected}
        supportsWebP={this.props.supportsWebP}
      >
        <Content>
          <Title
            selected={this.props.selected}
            size={this.props.size}
            transitioning={this.props.transitioning}
          >
            {this.props.title}
          </Title>
          <Likes
            identification={this.props.id}
            likes={this.props.likes}
            selected={this.props.selected}
            size={this.props.size}
            transitioning={this.props.transitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
              <path d="M2 1c-.55 0-1.046.224-1.406.594-.37.36-.594.856-.594 1.406 0 .55.224 1.046.594 1.406l3.406 3.438 3.406-3.438c.37-.37.594-.856.594-1.406 0-.55-.224-1.046-.594-1.406-.36-.37-.856-.594-1.406-.594-.55 0-1.046.224-1.406.594-.37.36-.594.856-.594 1.406 0-.55-.224-1.046-.594-1.406-.36-.37-.856-.594-1.406-.594z" />
            </svg>
            {this.props.likes}
          </Likes>
          <SelectButton
            aria-label={this.props.title}
            onClick={() => this.onSelect(this.props.images)}
            selected={this.props.selected}
            size={this.props.size}
            transitioning={this.props.transitioning}
          />
          <GoButton
            href={this.props.linkPrimary}
            rel="noopener noreferrer"
            selected={this.props.selected}
            size={this.props.size}
            target="_blank"
            transitioning={this.props.transitioning}
          >
            {this.props.linkPrimaryText}
          </GoButton>
        </Content>
      </GridItem>
    );
  }
}

export default Post;
