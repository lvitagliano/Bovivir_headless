const axios = require('axios')
const jwt_decode = require('jwt-decode')

module.exports = app => {
  app.post('/Auth0API/login', async (req, res) => {
    try {
      const resp = await login(req)
      if (resp.status) {
        res.status(resp.status).json({
          success: resp.status === 200 ? true : false,
          result: resp.data,
        })
      }
    } catch (error) {
      res.status(error.response.status).send({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  app.post('/Auth0API/verify', async (req, res) => {
    try {
      const config = {
        headers: { Authorization: `${req.body.bearer}` },
        params: {
          email: req.body.email.toLowerCase(),
        },
      }

      const resp = await axios.get('https://dev-rhj39xip.auth0.com/api/v2/users-by-email', config)

      res.status(resp.status).json({
        success: resp.status === 200 ? true : false,
        result: resp.data.length ? true : false,
      })
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  app.post('/Auth0API/sendEmailVerification', async (req, res) => {
    try {
      const {
        data: { access_token },
      } = await APIToken()

      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          email: req.body.email.toLowerCase(),
        },
      }

      const resp = await axios.get('https://dev-rhj39xip.auth0.com/api/v2/users-by-email', config)

      const user = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      const sendEmailVerify = await axios.post(
        'https://dev-rhj39xip.auth0.com/api/v2/jobs/verification-email',
        { user_id: resp.data[0].user_id, client_id: 'tFfBtlhvL7jsadza00fhedSMDGZ64gLT' },
        user
      )

      res.status(resp.status).json({
        success: resp.status === 200 ? true : false,
        result: 'ok',
      })
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  app.post('/Auth0API/logout', async (req, res) => {
    try {
      const resp = await axios.get('https://dev-rhj39xip.auth0.com/v2/logout', {
        client_id: 'tFfBtlhvL7jsadza00fhedSMDGZ64gLT',
      })

      if (resp.status) {
        res.status(resp.status).json({
          success: resp.status === 200 ? true : false,
          result: resp.data,
        })
      }
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })

  app.post('/Auth0API/token', async (req, res) => {
    axios
      .post('https://dev-rhj39xip.auth0.com/oauth/token', {
        client_id: 'tFfBtlhvL7jsadza00fhedSMDGZ64gLT',
        client_secret: '3j3uIz7Cq8hcyDrJAAvvQx4WNddGlSLpKJkjlhbzgjg2CGlcPPXTo_cR6XJk0E65',
        audience: `https://dev-rhj39xip.auth0.com/api/v2/`,
        grant_type: 'client_credentials',
      })
      .then(resp => {
        res.status(200).json({
          success: true,
          result: resp.data.access_token,
        })
      })
      .catch(error => {
        res.status(error.status || 400).json({
          success: false,
          result: error,
        })
      })
  })

  app.post('/Auth0API/createCustomer', async (req, res) => {
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://dev-rhj39xip.auth0.com/api/v2/users',
        data: {
          email: req.body.username,
          name: req.body.name,
          family_name: req.body.family_name,
          password: req.body.password,
          verify_email: req.body.verify_email,
          email_verified: req.body.email_verified,

          connection: 'Username-Password-Authentication',
        },
        headers: {
          Authorization: req.body.bearer,
        },
      })

      res.status(resp.status).json({
        success: true,
        result:
          'Se ha creado el usuario con éxito. Hemos enviado un email para confirmar su cuenta.',
      })
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.message,
      })
    }
  })

  app.post('/Auth0API/forgotPassword', async (req, res) => {
    try {
      const resp = await axios({
        method: 'POST',
        url: `${process.env.AUTH0_DOMAIN ||
          'https://dev-rhj39xip.auth0.com'}/dbconnections/change_password`,
        data: {
          client_id: process.env.AUHT0_CLIENT_ID,
          email: req.body.email,
          connection: 'Username-Password-Authentication',
        },
        headers: { 'content-type': 'application/json' },
      })
      if (resp.status && resp.status == 200) {
        res.status(resp.status).json({
          success: true,
          result: 'Hemos enviado un correo para completar el restablecimiento de su contraseña.',
        })
      }
    } catch (error) {
      res.status(error.response.status || 400).json({
        success: false,
        message: 'Hubo un error al querer enviar el correo para restablecer su contraseña.',
      })
    }
  })

  app.post('/Auth0API/updateCustomerEmailAuth0Server', async (req, res) => {
    try {
      const {
        data: { access_token },
      } = await APIToken()

      const { sub } = jwt_decode(req.body.userAccessToken)

      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      }

      const demo = axios.patch(
        `${process.env.AUTH0_DOMAIN || 'https://dev-rhj39xip.auth0.com'}/api/v2/users/${sub}`,
        { email: req.body.email, verify_email: false, email_verified: true },
        config
      )

      res.status(200).json({
        success: true,
        result: 'Hemos enviado un correo para completar el restablecimiento de su contraseña.',
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        result: 'Hemos enviado un correo para completar el restablecimiento de su contraseña.',
      })
      console.log('error upd', error)
    }
  })
}

const login = req => {
  return axios.post('https://dev-rhj39xip.auth0.com/oauth/token', {
    client_id: 'tFfBtlhvL7jsadza00fhedSMDGZ64gLT',
    client_secret: '3j3uIz7Cq8hcyDrJAAvvQx4WNddGlSLpKJkjlhbzgjg2CGlcPPXTo_cR6XJk0E65',
    username: req.body.email,
    password: req.body.password,
    realm: 'Username-Password-Authentication',
    grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
    scope: 'openid offline_access',
    audience: 'https://bonvivir-api/',
  })
}

const APIToken = async () => {
  return axios.post('https://dev-rhj39xip.auth0.com/oauth/token', {
    client_id: 'tFfBtlhvL7jsadza00fhedSMDGZ64gLT',
    client_secret: '3j3uIz7Cq8hcyDrJAAvvQx4WNddGlSLpKJkjlhbzgjg2CGlcPPXTo_cR6XJk0E65',
    audience: `https://dev-rhj39xip.auth0.com/api/v2/`,
    grant_type: 'client_credentials',
  })
}
