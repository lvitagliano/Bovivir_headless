const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
require('dotenv').config()

module.exports = withReactStorefront({
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
})
