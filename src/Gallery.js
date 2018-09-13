import { wrapGrid } from "animate-css-grid";
import React, { Component } from "react";
import smoothscroll from "smoothscroll-polyfill";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import Post from "./Post";
import checkSupportLocalStorage from "./functions/checkSupportLocalStorage";
import checkSupportWebP from "./functions/checkSupportWebP";

const apiVersion = "v1";
const gridAnimationDuration = 300;

const Grid = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: calc(2 * var(--padding));
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
`;

class Gallery extends Component {
  state = {
    filter: "all",
    posts: [],
    selected: undefined,
    supportsWebP: undefined,
    transitioning: false
  };

  componentDidMount() {
    smoothscroll.polyfill();
    const grid = document.querySelector(".grid");
    this.getPosts();

    checkSupportWebP((supportsWebP) => {
      this.setState({ supportsWebP }, () => {
        wrapGrid(grid, {
          duration: gridAnimationDuration
        });
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selected !== this.state.selected &&
      this.state.selected !== undefined
    ) {
      setTimeout(() => {
        const el = document.querySelector(`#${this.state.selected}`);

        if (el !== null) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, gridAnimationDuration * 2);
    }
  }

  getPosts = () => {
    const localStorageAvailable = checkSupportLocalStorage();

    if (
      localStorageAvailable &&
      localStorage.getItem(`${apiVersion}/posts`) !== null
    ) {
      this.setState({
        posts: JSON.parse(localStorage.getItem(`${apiVersion}/posts`))
      })
    }

    if (navigator.onLine) {
      fetch(`${apiVersion}/posts`, {
        credentials: "same-origin"
      })
        .then(response => response.json())
        .then(results => {
          const posts = results.map(function (post) {
            return { ...post, size: Math.random() < 0.6 ? 1 : 2 };
          });

          if (localStorageAvailable) {
            localStorage.setItem(`${apiVersion}/posts`, JSON.stringify(posts));
          }

          this.setState({
            posts
          });
        })
        .catch(err => {
          console.error("Error ", err);
        });
    }
  }

  onFilter = (filter) => {
    this.setState({ filter });
  }

  onSelect = (selected, id) => {
    this.setState(
      selected
        ? {
          selected: undefined,
          transitioning: id
        }
        : {
          selected: id,
          transitioning: id
        },
      () => {
        setTimeout(() => {
          this.setState({
            transitioning: false
          });
        }, gridAnimationDuration * 2);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <FilterButton onClick={() => this.onFilter("all")} onTouchStart={() => this.onFilter("all")} selected={this.state.filter === "all"} value="all">All</FilterButton>
        <FilterButton onClick={() => this.onFilter("blog")} onTouchStart={() => this.onFilter("blog")} selected={this.state.filter === "blog"} value="blog">Blogs</FilterButton>
        <FilterButton onClick={() => this.onFilter("project")} onTouchStart={() => this.onFilter("project")} selected={this.state.filter === "project"} value="project">Projects</FilterButton>
        <FilterButton onClick={() => this.onFilter("talk")} onTouchStart={() => this.onFilter("talk")} selected={this.state.filter === "talk"} value="talk">Talks</FilterButton>
        <Grid
          className="grid"
          ref={el => (this.grid = el)}
          selected={this.state.selected}
        >
          {this.state.posts
            .filter(item => this.state.filter === "all" || this.state.filter === item.type)
            .map(item => {
              const selected = item.id === this.state.selected;
              return (
                <Post
                  id={item.id}
                  images={item.images}
                  key={item.id}
                  likes={item.likes}
                  linkPrimary={item.linkPrimary}
                  linkPrimaryText={item.linkPrimaryText}
                  onClick={() => this.onSelect(selected, item.id)}
                  size={item.size}
                  selected={selected}
                  supportsWebP={this.state.supportsWebP}
                  timeSince={item.date}
                  title={item.title}
                  transitioning={this.state.transitioning}
                  type={item.type}
                />
              );
            })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Gallery;
