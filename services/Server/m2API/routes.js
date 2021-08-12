const axios = require('axios')

module.exports = app => {
  // Auth0 Token
  app.post('/m2API/auth0token', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/V1/api/auth0/authorize`,
        req.body
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.message,
      })
    }
  })

  //createCustomerM2
  app.post('/m2API/createCustomerM2', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/V1/customers`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.message,
      })
    }
  })

  //createCart
  app.post('/m2API/createCart', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/V1/carts/mine`,
        {},
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.message,
      })
    }
  })

  //addItem
  app.post('/m2API/addItem', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/items`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //removeItem
  app.delete('/m2API/removeItem', async (req, res) => {
    try {
      const m2ApiResp = await axios.delete(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/items/${req.body.id}`,
        req.body.item,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //clearCart
  app.delete('/m2API/clearCart', async (req, res) => {
    try {
      const m2ApiResp = await axios.delete(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine`,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //getCart
  app.get('/m2API/getCart', async (req, res) => {
    try {
      const m2ApiResp = await axios.get(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine`,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //customerData
  app.get('/m2API/customerData', async (req, res) => {
    try {
      const m2ApiResp = await axios.get(`${process.env.M2_CONFIG_HOST}/rest/V1/customers/me`, {
        headers: {
          Authorization: `${req.headers.authorization}`,
        },
      })
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //selectPayment
  app.post('/m2electPayment', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/selected-payment-method`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //setBillingAddress
  app.post('/m2API/setBillingAddress', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/shipping-information`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //setShippingAddress
  app.post('/m2API/setShippingAddress', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/shipping-information`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //setBillingAndShippingAddress
  app.post('/m2API/setBillingAndShippingAddress', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/shipping-information`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //points hop
  app.get('/hop/pickup_points', async (req, res) => {
    try {
      const m2ApiResp = await axios.get(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/hop/pickup_points`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //estimateShippingMethodsByPostcode
  app.post('/m2API/estimateShippingMethodsByPostcode', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/estimate-shipping-methods`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //estimateShippingMethodsById
  app.post('/m2API/estimateShippingMethodsById', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/estimate-shipping-methods-by-address-id`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //setPaymentInformation
  app.post('/m2API/setPaymentInformation', async (req, res) => {
    try {
      const m2ApiResp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/carts/mine/payment-information`,
        req.body,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  //getRegions
  app.get('/m2API/getRegions', async (req, res) => {
    try {
      const m2ApiResp = await axios.get(
        `${process.env.M2_CONFIG_HOST}/rest/V1/directory/countries/AR`,
        {
          headers: {
            Authorization: `${req.headers.authorization}`,
          },
        }
      )
      res.json(m2ApiResp.data)
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  // SUBSCRIBE_EMAIL_TO_NEWSLETTER
  app.post('/m2API/subscribeEmailToNewsletterServer', async (req, res) => {
    try {
      const resp = await axios.post(
        `${process.env.M2_CONFIG_HOST}/rest/default/V1/newsletter/subscribe`,
        req.body
      )
      if (resp.data.success) {
        res.status(resp.status).json({
          success: resp.data.success,
          result: resp.data.message,
        })
      } else {
        res.status(400).json({
          success: resp.data.success,
          result: resp.data.message,
        })
      }
    } catch (err) {
      res.status(err.response.status || 400).json({
        success: false,
        result: err,
      })
    }
  })
}
