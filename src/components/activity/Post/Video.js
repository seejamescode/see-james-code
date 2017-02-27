import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  transform: translate(-1rem, -1rem);
  width: calc(100% + 2rem);
`;

const Content = styled.div`
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


const Video = props => (
  <Container>
    <Content
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  </Container>
);

Video.propTypes = {
  html: PropTypes.string.isRequired,
};

export default Video;
