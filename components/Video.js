import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const ResponsivePlayer = styled.div`
  background: ${({ theme }) => theme.colors.backdrop};
  border: none;
  border-radius: calc(${({ theme }) => theme.padding} / 2);
  box-shadow: 10px 10px 30px #d2d5d9, -10px -10px 30px #ffffff;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  transition: transform 300ms ${({ theme }) => theme.animation.hover};

  :hover {
    transform: scale(1.03);
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function Video({ url }) {
  return (
    <ResponsivePlayer>
      <ReactPlayer
        className="react-player"
        height="100%"
        url={url}
        width="100%"
      />
    </ResponsivePlayer>
  );
}
