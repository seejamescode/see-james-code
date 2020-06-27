import { css } from "styled-components";

const Font = css`
  /* cyrillic-ext */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Serif Light"), local("IBMPlexSerif-Light"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI5q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Serif Light"), local("IBMPlexSerif-Light"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi20-SIwq1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Serif Light"), local("IBMPlexSerif-Light"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI7q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Serif Light"), local("IBMPlexSerif-Light"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI6q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Serif Light"), local("IBMPlexSerif-Light"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi20-SI0q1vjitOh.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local("IBM Plex Serif SemiBold"), local("IBMPlexSerif-SemiBold"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI5q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local("IBM Plex Serif SemiBold"), local("IBMPlexSerif-SemiBold"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yIwq1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local("IBM Plex Serif SemiBold"), local("IBMPlexSerif-SemiBold"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI7q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local("IBM Plex Serif SemiBold"), local("IBMPlexSerif-SemiBold"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI6q1vjitOh3oc.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "IBM Plex Serif";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local("IBM Plex Serif SemiBold"), local("IBMPlexSerif-SemiBold"),
      url(https://fonts.gstatic.com/s/ibmplexserif/v8/jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q1vjitOh.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  /* cyrillic-ext */
  @font-face {
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Mono Light"), local("IBMPlexMono-Light"),
      url(https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl1FgsAXHNlYzg.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Mono Light"), local("IBMPlexMono-Light"),
      url(https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlRFgsAXHNlYzg.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Mono Light"), local("IBMPlexMono-Light"),
      url(https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl9FgsAXHNlYzg.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Mono Light"), local("IBMPlexMono-Light"),
      url(https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwl5FgsAXHNlYzg.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "IBM Plex Mono";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local("IBM Plex Mono Light"), local("IBMPlexMono-Light"),
      url(https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgsAXHNk.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
`;

export default Font;
