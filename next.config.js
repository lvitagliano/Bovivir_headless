const withPlugins = require('next-compose-plugins')
const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
const withWorkbox = require('next-with-workbox')

require('dotenv').config()

module.exports = withPlugins([
  [
    withWorkbox({
      workbox: {
        dest: 'static',
        swDest: 'service-worker.js',
      },
    }),
  ],
  [
    withReactStorefront,
    {
      async rewrites() {
        return [
          {
            source: '/:sluganio(\\d{1,})/:slugmes(\\d{1,})/:slugdia(\\d{1,})/:slug',
            destination: '/wordpress',
          },
          {
            source: '/:wordpress',
            destination: '/wordpress',
          },
          {
            source: '/:sku/p/:productId',
            destination: '/p/:sku/:productId',
          },
          {
            source: '/eventos/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/beneficios/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/vinos/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/selecciones/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/bodegas/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/maridajes/:slugDescription',
            destination: '/wordpress',
          },
          {
            source: '/club/que-es-el-club',
            destination: '/club/queeselclub',
          },
          {
            source: '/suscripcion',
            destination: '/wordpress',
          },
          {
            source: '/tienda/images/:slugImages',
            destination: '/images/:slugImages',
          },
          {
            source: '/club/images/:slugImages',
            destination: '/images/:slugImages',
          },
        ]
      },

      target: 'serverless',
      connector: 'm2-simple-connector',
      webpack: config => {
        config.plugins.push(
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          })
        )
        return config
      },
      api: {
        externalResolver: true,
      },
    },
  ],
])
