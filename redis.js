const redis = require('redis')

const redisHost = (process.env.REDIS_HOST || '127.0.0.1:6379').split(':')

const client = redis
  .createClient({
    port: redisHost[1],
    host: redisHost[0],
    retry_strategy: function(options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection')
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted')
      }
      if (options.attempt > 10) {
        return undefined
      }

      return Math.min(options.attempt * 100, 3000)
    },
  })
  .on('error', err => {
    console.log('error:', err)
  })

const setState = (key, state) => {
  return new Promise((resolve, reject) => {
    client.set(key, state, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

const setExState = (key, state, duration) => {
  return new Promise((resolve, reject) => {
    client.set(key, state, 'EX', duration, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

const getState = userSessionId => {
  if (!client) return ''
  return new Promise((resolve, reject) => {
    client.get(userSessionId, (err, reply) => {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

const delState = userSessionId => {
  return new Promise((resolve, reject) => {
    client.del(userSessionId, function(err, reply) {
      if (err) reject(err)
      resolve(reply)
    })
  })
}

module.exports = { getState, setState, setExState, delState }
