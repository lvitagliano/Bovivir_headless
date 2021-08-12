import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import theme from '../components/theme'
import { useTheme } from '@material-ui/core/styles'
import Header from '../components/Header'
import Main from '../components/Main'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import PWA from 'react-storefront/PWA'
import AppBar from '../components/AppBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import useAppStore from 'react-storefront/hooks/useAppStore'
import Context from '../services/Client/context/Context'
import Container from '@material-ui/core/Container'
import Footer from '../components/Footer'
import { useMediaQuery } from '@material-ui/core'
import { parseCookies } from '../utils/libs/pareseCookie'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/alerts/Alerts'
import { useStore } from '../store/store'
import { getDataFooter } from '../services/Client/GraphQl/wp/GQLAPI'
import { Workbox } from 'workbox-window'
import { getCategoriesShop } from '../services/Client/GraphQl/m2/GQLAPI'
import { getMenu } from '../constants/menu'
import { getListMenuM2 } from '../services/Client/GraphQl/m2GQL'

function MyApp({ Component, pageProps, persistState }) {
  const MaterialTheme = useTheme()
  const isDesktop = useMediaQuery(MaterialTheme.breakpoints.up('sm'))
  const store = useStore(persistState)
  const [menus, setMenus] = useState([])

  useJssStyles()
  const [appData] = useAppStore(pageProps || {})

  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
      console.warn('Progressive Web App support is disabled')
      return
    }
    const wb = new Workbox('sw.js')
    wb.register()
  }, [])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)

      //Menu tienda
    ;(async () => {
      // try {
      const resMenu = await getListMenuM2()
      const categoryList = resMenu.data?.categoryList?.reduce(function(preValue, curValue) {
        if (curValue.include_in_menu === 1 && curValue.url_path !== null) {
          return [
            ...preValue,
            {
              id: curValue.id,
              title: curValue.name,
              text: curValue.name,
              as: `/tienda/${curValue.url_path}`,
              href: `/tienda/${curValue.url_path}`,
            },
          ]
        }
        return preValue
      }, [])
      setMenus(getMenu(categoryList))
    })()

    !menus.lenght && setMenus(getMenu())
  }, [])

  return (
    <PWA errorReporter={reportError}>
      <Head>
        <title>BONVIVIR</title>
        <script
          type="text/javascript"
          src="https://api.wcx.cloud/widget/?id=854c0e7cca2e4a1ba2144fb0273390ae"
        ></script>
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
          *:not(.MuiIcon-root) {
            font-family: Montserrat !important;
            line-height: 1.2;
          }
        `}
      </style>
      <Context.Provider>
        <Provider store={store}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {isDesktop && menus.length ? <AppBar tabs={menus} /> : null}
              {/* Menu de navegacion en mobile */}
              <Header persistState={persistState} menu={{ items: menus }} />
              <Main>
                <main
                  style={{
                    marginTop: `${isDesktop ? '111px' : '72px'}`,
                    marginBottom: '-110px',
                  }}
                >
                  <Container
                    maxWidth="xl"
                    disableGutters="true"
                    style={{
                      minHeight: '100vh',
                    }}
                  >
                    <Component {...pageProps} />
                    <Alerts />
                  </Container>
                </main>
                <Footer data={menus} />
              </Main>
            </ThemeProvider>
          </StylesProvider>
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
