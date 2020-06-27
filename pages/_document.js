import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            <link rel="manifest" href="/manifest.json" />
            <meta charSet="utf-8" />
            <meta name="theme-color" content="#E366FF" />
            <link rel="shortcut icon" href="/graphics/icon-114.png" />
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/graphics/icon-57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/graphics/icon-72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/graphics/icon-114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/graphics/icon-144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="512x512"
              href="/graphics/icon-512.png"
            />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="white"
            />
            <link
              href="/graphics/launch-2048x2732.png"
              media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-1668x2224.png"
              media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-1536x2048.png"
              media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-1125x2436.png"
              media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-1242x2148.png"
              media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-750x1294.png"
              media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image"
            />
            <link
              href="/graphics/launch-640x1136.png"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
              rel="apple-touch-startup-image"
            />
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
