import Head from 'next/head'
import React, { useEffect } from 'react'
import theme from '../components/theme'
import { useTheme } from '@material-ui/core/styles'
import Header from '../components/Header'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from 'styled-components'
import PWA from 'react-storefront/PWA'
import AppBar from '../components/AppBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import useAppStore from 'react-storefront/hooks/useAppStore'
import Context from '../services/Client/context/Context'
import Container from '@material-ui/core/Container'
import Footer from '../components/Footer'
import { MENU } from '../constants/menu'
import { useMediaQuery } from '@material-ui/core'
import { parseCookies } from '../utils/libs/pareseCookie'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/alerts/Alerts'
import { useStore } from '../store/store'

function MyApp({ Component, pageProps, persistState }) {
  const MaterialTheme = useTheme()
  const isDesktop = useMediaQuery(MaterialTheme.breakpoints.up('sm')) || true
  const store = useStore(persistState)

  useJssStyles()
  const [appData] = useAppStore(pageProps || {})

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles)
  }, [])

  return (
    <PWA errorReporter={reportError}>
      <Head>
        <title>Bonvivir</title>
      </Head>
      <style jsx global>
        {`
          input:focus {
            outline: none;
          }
          textarea:focus {
            outline: none;
          }
          select:focus {
            outline: none;
          }
          button:focus {
            outline: none;
          }
          body {
            font-family: Montserrat !important;
          }
        `}
      </style>
      <Context.Provider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header persistState={persistState} menu={{ items: MENU }} />
            <main style={{ transform: 'translateY(110px)' }}>
              {isDesktop ? (
                <Container maxWidth="lg">
                  <div style={{ minHeight: '90vh' }}>
                    <Component {...pageProps} />
                    <Alerts />
                  </div>
                  <Footer />
                </Container>
              ) : (
                <>
                  <div style={{ minHeight: '90vh' }}>
                    <Component {...pageProps} />
                    <Alerts />
                  </div>
                  <Footer />
                </>
              )}
            </main>
            <AppBar tabs={MENU} />
          </ThemeProvider>
        </Provider>
      </Context.Provider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}
  let { req, res, store } = ctx

  let persistState = {}
  const cookies = parseCookies(req)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  try {
    const response = await import('./api/redis/getState').then(mod =>
      mod.getStore(cookies.userSessionId)
    )
    if (response) {
      persistState = JSON.parse(response)
    }
  } catch (err) {
    console.log('ERROR _app', err)
  }

  return { pageProps, persistState }
}

export default MyApp
