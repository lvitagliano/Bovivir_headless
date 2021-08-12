const redis = require('../../../redis')
const Cookies = require('cookie')

module.exports = app => {
  //createCustomerM2
  app.post('/redis/setState', async (req, res) => {
    try {
      const cookies = Cookies.parse(req.headers.cookie)
      const userSessionId = cookies?.userSessionId || null

      if (userSessionId === null) res.status(404).send('No User Session ID')

      const result = await redis.setExState(userSessionId, JSON.stringify(req.body), 60 * 60 * 24)

      if (result !== 'OK') {
        res.status(404).send('Redux State can not be stored.')
      }

      res.status(202).send(result)
    } catch (err) {
      res.status(500).json(err)
    }
  })

  app.post('/redis/getState', async (req, res) => {
    try {
      if (req.headers.cookie === undefined) {
        res.status(401).send('NO cookie with session ID')
      }
      const cookies = Cookies.parse(req.headers.cookie)
      const userSessionId = cookies?.userSessionId || null
      if (userSessionId === null) {
        res.status(402).send('No User Session ID')
      }

      const state = await redis.getState(userSessionId)
      if (state === null) {
        res.status(403).send('Redux State not found.')
      }

      res.status(200).json(state)
    } catch (err) {
      res.status(500).json(err)
    }
  })

  app.post('/redis/delState', async (req, res) => {
    try {
      const cookies = Cookies.parse(req.headers.cookie)
      const userSessionId = cookies?.userSessionId || null

      if (userSessionId !== null) {
        const result = await redis.delState(userSessionId)
        if (result) {
          res.status(200).send('Redis Session deleted')
        }
      }
    } catch (err) {
      res.status(500).json(err)
    }
  })
}
