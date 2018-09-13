import styled from "styled-components";

const FilterButton = styled.button`
  background: transparent;
  border: none;
  margin-bottom: var(--padding);
  margin-right: var(--padding);
  outline: none;
  padding: calc(var(--padding) / 4) calc(var(--padding) / 2);
  position: relative;

  :before {
    background: var(--highlight);
    bottom: 0;
    content: "";
    height: ${props => props.selected ? '100%' : 0};
    left: 0;
    position: absolute;
    transition: height 150ms var(--curve);
    width: 100%;
    z-index: -1;
  }

  :focus, :hover {
    :before {
      height: 100%;
    }
  }
`;

export default FilterButton;