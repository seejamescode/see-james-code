import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.padding.xl} 0;
  grid-template-columns:
    1fr
    min(${({ theme }) => theme.breakpoints.max}, 100%)
    1fr;

  > * {
    grid-column: 2;
    padding-left: ${({ theme }) => theme.padding.md};
    padding-right: ${({ theme }) => theme.padding.md};
  }

  .full-bleed {
    grid-column: 1 / 4;
    padding-left: 0;
    padding-right: 0;
    width: 100%;

    display: grid;
    gap: ${({ theme }) => theme.padding.xl} 0;
    grid-template-columns:
      1fr
      min(${({ theme }) => theme.breakpoints.max}, 100%)
      1fr;

    > * {
      grid-column: 2;
      padding-left: ${({ theme }) => theme.padding.md};
      padding-right: ${({ theme }) => theme.padding.md};
    }
  }
`;

export default Layout;
