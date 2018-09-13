import styled from "styled-components";

const HoverCursor = styled.span`
  :hover {
    cursor: url(${props => props.cursor}), auto;
  }
`;

export default HoverCursor;