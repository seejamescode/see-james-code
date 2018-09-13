import styled from "styled-components";

const Link = styled.a`
  color: inherit;
  font-size: 0.875rem;
  outline: none;
  text-decoration: none;
  position: relative;

  :before {
    background: var(--highlight);
    bottom: -2px;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    transition: height 100ms var(--curve);
    width: 100%;
    z-index: -1;
  }

  :focus:before,
  :hover:before {
    height: calc(100% + 6px);
  }

  svg {
    fill: transparent;
    padding-right: .5rem;
    transform: translateY(.4rem);
    width: 1.5rem;

    &.mail, &.resume {
      height: 1.5rem;
      padding: 0 .82rem 0 .25rem;
      width: .94rem;

      &.resume {
        padding: 0 .72rem 0 .35rem;
      }
    }

    path {
      fill: var(--black);
    }
  }

  @media (min-width: 40rem) {
    font-size: 1rem;
  }
`

export const LinkButton = Link.withComponent('button').extend`
  background: none;
  border: none;
  padding: 0;

  :focus:before,
  :hover:before {
    height: calc(100% - 3px);
  }
`

export default Link;