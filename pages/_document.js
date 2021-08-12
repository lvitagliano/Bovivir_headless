import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet } from 'styled-components'
import theme from '../components/theme'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.ico" rel="icon" />
          <link rel="apple-touch-icon" href="/icon.png" sizes="192x192"></link>
          <link rel="apple-touch-icon" href="/icon.png" sizes="512x512"></link>
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="2048x2732" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="1668x2224" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="1536x2048" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="1125x2436" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="1242x2208" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="750x1334" />
          <link rel="apple-touch-startup-image" href="/splash.png" sizes="640x1136" />

          <meta rel="apple-touch-icon" href="/icon.png" sizes="192x192"></meta>
          <meta rel="apple-touch-icon" href="/icon.png" sizes="512x512"></meta>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
          <meta name="apple-mobile-web-app-title" content="Bonvivir" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="2048x2732" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="1668x2224" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="1536x2048" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="1125x2436" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="1242x2208" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="750x1334" />
          <meta rel="apple-touch-startup-image" href="/splash.png" sizes="640x1136" />

          <meta charSet="utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Passion+One&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const materialSheets = new ServerStyleSheets()
  const styledComponentsSheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = async () => {
    const document = originalRenderPage({
      enhanceApp: App => props =>
        materialSheets.collect(styledComponentsSheet.collectStyles(<App {...props} />)),
    })

    return document
  }

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <>
        {initialProps.styles}
        {materialSheets.getStyleElement()}
        {styledComponentsSheet.getStyleElement()}
      </>
    ),
  }
}

export default MyDocument
