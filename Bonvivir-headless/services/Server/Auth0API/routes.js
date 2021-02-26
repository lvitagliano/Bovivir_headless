const axios = require('axios')

module.exports = app => {
  
  app.post('/Auth0API/login', async (req, res) => {
    try{
        const loginResp = await login(req)
      if (loginResp.status) {
          res.status(loginResp.status).json({
          success: loginResp.status === 200 ? true : false,
          result: loginResp.data,
        })
      }
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
          password: req.body.password,
          connection: 'Username-Password-Authentication',
        },
        headers: {
          Authorization: req.body.bearer,
        },
      })
      if (resp.status === 201) {
            req.body.email = req.body.username
            const loginResp = await login(req)
          if (loginResp.status) {
              res.status(loginResp.status).json({
              success: loginResp.status === 200 ? true : false,
              result: loginResp.data,
            })
          }
        }
    } catch (err) {
        res.status(error.response.status || 400).json({
        success: false,
        result: error.response.data.error_description,
      })
    }
  })
}

const login = (req) => {
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
