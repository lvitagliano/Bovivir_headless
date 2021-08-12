const axios = require('axios')
const https = require('https')

const kiwiApi = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

module.exports = app => {
  app.post('/KiwiAPI/token', async (req, res) => {
    try {
      const loginResponse = await login()

      if (loginResponse.status) {
        res.status(loginResponse.status).json({
          success: loginResponse.status === 200 ? true : false,
          result: loginResponse.data.token,
        })
      }
    } catch (error) {
      res.status(error.status || 400).json({
        success: false,
        result: error,
      })
    }
  })

  app.post('/KiwiAPI/standardize', async (req, res) => {
    const loginResponse = await login()

    if (loginResponse.status == 200) {
      const token = loginResponse.data.token

      if (!req.body.street || !req.body.doorNumber || !req.body.zipCode) {
        res.status(400).json({
          success: false,
          result: 'Calle, Nùmero y Codigo Postal son mandatorios.',
        })
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          street: req.body.street,
          doorNumber: req.body.doorNumber,
          zipCode: req.body.zipCode,
        },
      }

      try {
        const resp = await kiwiApi.get(
          process.env.KIWI_API_URL
            ? `${process.env.KIWI_API_URL}/standarized/address.json`
            : 'https://qa-api.covedisa.com/standarized/address.json',
          config
        )

        res.status(200).json({
          success: true,
          result: resp.data,
        })
      } catch (err) {
        res.status(err.response.status || 400).json({
          success: false,
          result: 'No se pudo validar la direcciòn.',
        })
      }
    } else {
      res.status(loginResponse.status).json({
        success: false,
        result: loginResponse.message,
      })
    }
  })

  app.post('/KiwiAPI/cardCLN', async (req, res) => {
    const loginResponse = await login()

    if (loginResponse.status == 200) {
      const token = loginResponse.data.token
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          cardNumber: req.body.covedisa_tarjeta_cln,
        },
      }

      try {
        const resp = await kiwiApi.get(
          process.env.KIWI_API_URL
            ? `${process.env.KIWI_API_URL}/cln/user.json`
            : 'https://qa-api.covedisa.com/cln/user.json',
          config
        )

        res.status(200).json({
          success: true,
          result: resp.data,
        })
      } catch (err) {
        res.status(err.response.status || 400).json({
          success: false,
          result: 'Tarjeta inválida.',
        })
      }
    } else {
      res.status(loginResponse.status).json({
        success: false,
        result: loginResponse.message,
      })
    }
  })
}

const login = () => {
  const params = new URLSearchParams()
  params.append('_username', process.env.KIWI_API_USERNAME || 'bonvivir')
  params.append('_password', process.env.KIWI_API_PASSWORD || 'C0v3D1z4!*4992')

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  return kiwiApi.post(
    process.env.KIWI_API_URL
      ? `${process.env.KIWI_API_URL}/login_check`
      : 'https://qa-api.covedisa.com/login_check',
    params,
    config
  )
}
