import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";
import cursor from "./cursors/cursor.png";
import select from "./cursors/select.png";

injectGlobal`
  :root {
    --black: #180619;
    --curve: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    --highlight: #E057FF;
    --padding: 1rem;
    --weight-normal: 400;
    --weight-bold: 700;

    @media (min-width: 40rem) {
    --padding: 2rem;
    }
  }

  @font-face {
  font-family: 'IBM Plex Mono';
  font-style: normal;
  font-weight: 400;
  src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/complete/woff/IBMPlexMono-Regular.woff") format("woff"); }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Cyrillic.woff2") format("woff2");
    unicode-range: U+0400-045F, U+0472-0473, U+0490-049D, U+04A0-04A5, U+04AA-04AB, U+04AE-04B3, U+04B6-04BB, U+04C0-04C2, U+04CF-04D9, U+04DC-04DF, U+04E2-04E9, U+04EE-04F5, U+04F8-04F9; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Pi.woff2") format("woff2");
    unicode-range: U+03C0, U+0E3F, U+2070, U+2074-2079, U+2080-2089, U+2113, U+2116, U+2126, U+212E, U+2150-2151, U+2153-215E, U+2190-2199, U+21A9-21AA, U+21B0-21B3, U+21B6-21B7, U+21BA-21BB, U+21C4, U+21C6, U+2202, U+2206, U+220F, U+2211, U+221A, U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+2713, U+274C, U+2B0E-2B11, U+EBE1, U+EBE3-EBE4, U+EBE6-EBE7, U+ECE0, U+EFCC; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: local("IBM Plex Mono"), local("IBMPlexMono"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular-Latin1.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FB01-FB02; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/complete/woff/IBMPlexMono-Bold.woff") format("woff"); }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Bold-Cyrillic.woff2") format("woff2");
    unicode-range: U+0400-045F, U+0472-0473, U+0490-049D, U+04A0-04A5, U+04AA-04AB, U+04AE-04B3, U+04B6-04BB, U+04C0-04C2, U+04CF-04D9, U+04DC-04DF, U+04E2-04E9, U+04EE-04F5, U+04F8-04F9; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Bold-Pi.woff2") format("woff2");
    unicode-range: U+03C0, U+0E3F, U+2070, U+2074-2079, U+2080-2089, U+2113, U+2116, U+2126, U+212E, U+2150-2151, U+2153-215E, U+2190-2199, U+21A9-21AA, U+21B0-21B3, U+21B6-21B7, U+21BA-21BB, U+21C4, U+21C6, U+2202, U+2206, U+220F, U+2211, U+221A, U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+2713, U+274C, U+2B0E-2B11, U+EBE1, U+EBE3-EBE4, U+EBE6-EBE7, U+ECE0, U+EFCC; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Bold-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Bold-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02; }

  @font-face {
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 700;
    src: local("IBM Plex Mono Bold"), local("IBMPlexMono-Bold"), url("../IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Bold-Latin1.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FB01-FB02; }

  * {
    -moz-osx-font-smoothing: grayscale;
    font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;    font-size: 16px;
    font-weight: var(--weight-normal);
    font-smoothing: antialiased;
    line-height: 1.4;
    text-rendering: optimizeLegibility;
  }

  body {
    color: var(--black);
    cursor: url(${cursor}) 6 0, auto;
    font-size: 16px;
  }

  a, button {
    cursor: url(${select}) 12 0, auto;
  }

  p {
    margin: 0;
  }

  #root {
    box-sizing: border-box;
    height: calc(100vh - (100vh - 100%));
    padding: var(--padding);
    position: relative;
    width: calc(100vw - (100vw - 100%));
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
