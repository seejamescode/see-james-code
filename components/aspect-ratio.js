import styled from "styled-components";

const Container = styled.div`
  position: relative;

  :before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${({ $ratio }) => $ratio * 100}%;
  }
  :after {
    /* to clear float */
    content: "";
    display: table;
    clear: both;
  }
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const AspectRatio = ({ ratio, children }) => {
  return (
    <Container $ratio={ratio}>
      <Content>{children}</Content>
    </Container>
  );
};

export default AspectRatio;
