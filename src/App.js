import React, { Component } from "react";
import styled from "styled-components";
import Gallery from "./Gallery";
import HoverCursor from "./HoverCursor";
import Link from "./Link";
import computer from "./cursors/computer.png";
import pencil from "./cursors/pencil.png";
import taco from "./cursors/taco.png";

const Section = styled.section`
  margin-bottom: 25vh;

  :last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  font-size: calc(2rem + 5vw);
  font-weight: var(--weight-bold);
  line-height: 0.98;
  margin: 0;
  position: relative;
  transform: translate(calc(-0.15rem - .25vw),calc(-0.15rem - 1vw));

  :hover:after {
    bottom: calc(-0.15rem + 0.5vw);
    content: "[raw-hoot]";
    font-size: 1rem;
    font-weight: var(--weight-normal);
    position: absolute;
    transform: translateY(-0.5rem);
    width: 6rem;
  }

  span {
    letter-spacing: calc(0.75rem + 1vw);
  }
`;

class App extends Component {
  state = {
    showResume: false,
  }

  render() {
    return (
      <React.Fragment>
        <Section>
          <Title>
            James Y<br />Rauhut
          </Title>
          <p>
            <HoverCursor cursor={computer}>Front-End Dev</HoverCursor> and <HoverCursor cursor={pencil}>UX Designer</HoverCursor>{" "}<br />
            <HoverCursor cursor={taco}>in Austin, Texas</HoverCursor>
          </p>
          <br />
          <br />
          <Link
            href="https://drive.google.com/file/d/1YtKEgIAPdBOm1fMSg5dpdLY65zTZFJLP/view?usp=sharing"
            rel="noopener noreferrer"
            target="_blank"
          ><svg className="resume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><path d="M0 0v8h7v-4h-4v-4h-3zm4 0v3h3l-3-3zm-3 2h1v1h-1v-1zm0 2h1v1h-1v-1zm0 2h4v1h-4v-1z" /></svg>Review my life with a resume.</Link>
          <br />
          <br />
          <Link
            href="mailto:james@seejamescode.com"
            rel="noopener noreferrer"
            target="_blank"
          ><svg className="mail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><path d="M0 1v1l4 2 4-2v-1h-8zm0 2v4h8v-4l-4 2-4-2z"></path></svg>Email me about opportunities.</Link>
          <br />
          <br />
          <Link
            href="https://twitter.com/seejamescode"
            rel="noopener noreferrer"
            target="_blank"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" /></svg>Follow me in a non-creepy way.</Link>
        </Section>
        <Section>
          <Gallery />
        </Section>
      </React.Fragment>
    );
  }
}

export default App;
