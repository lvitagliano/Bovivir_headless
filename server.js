if (process.env.preact === 'true') {
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('react', 'preact/compat')
  moduleAlias.addAlias('react-dom', 'preact/compat')
  moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')
}

const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { parse } = require('url')
const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()
const { stringify } = require('querystring')
const getConfig = require('next/config').default
const { serverRuntimeConfig } = getConfig()
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const Cookies = require('cookie')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid')
const port = process.env.PORT || 443

const userSessionId = async (req, res, next) => {
  if (!Object.keys(req.cookies).length || !req.cookies.userSessionId) {
    res.header(
      'Set-Cookie',
      Cookies.serialize('userSessionId', uuidv4(), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      })
    )
  }
  next()
}

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())

  require('./services/Server/m2GQL/routes')(server)

  require('./services/Server/m2API/routes')(server)

  require('./services/Server/Auth0API/routes')(server)

  require('./services/Server/redis/routes')(server)

  require('./services/Server/KiwiAPI/routes')(server)

  server.use(cookieParser())

  server.use(userSessionId)

  // server.get('/service-worker.js', (req, res) => {
  //   app.serveStatic(req, res, path.join(__dirname, '.next', 'static', 'service-worker.js'))
  // })

  server.get('/pages-manifest.json', (req, res) => {
    app.serveStatic(req, res, path.join(__dirname, '.next', 'server', 'pages-manifest.json'))
  })

  const connector = serverRuntimeConfig.reactStorefront.connector
  const routes = connector && require(connector).routes

  if (routes) {
    for (let route of routes) {
      console.log(`> Route: ${route.source}`)

      // add SSR route
      server.get(route.source, (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { query } = parsedUrl
        app.render(req, res, route.destination, query)
      })

      // and corresponding API route
      server.get(`/api${route.source.replace(/\/$/, '')}`, (req, res) => {
        const search = stringify({ ...req.params, ...req.query })
        const url = `/api${route.destination.replace(/\/$/, '')}${
          search.length ? `?${search}` : ''
        }`
        const parsedUrl = parse(url, true)
        handle(req, res, parsedUrl)
      })
    }
  }

  if (dev) {
    server.use(
      createProxyMiddleware('/rest', {
        target: process.env.M2_CONFIG_HOST || 'https://qa-tienda2.bonvivir.com/',
        changeOrigin: true,
      })
    )
  }

  let wordPressPages = (
    process.env.WP_PAGES ||
    '/bonvivir|/quienes-somos|/selecciones-actual|/notas|/maridajes|/eventos|/bodegas|/beneficios'
  ).split('|')

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    if (wordPressPages.includes(req.url)) {
      parsedUrl.pathname = '/wordpress'
    }
    handle(req, res, parsedUrl)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
