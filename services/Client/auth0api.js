import axios from 'axios'

export const createCustomerAuth0 = async data => {
  try {
    const auth0Token = await axios.post('/Auth0API/token')
    const res = await axios.post('/Auth0API/createCustomer', {
      username: data.email,
      password: data.password,
      name: data.firstname,
      family_name: data.lastname,
      bearer: `Bearer ${auth0Token.data.result}`,
      verify_email: data?.verify_email || true,
      email_verified: data?.email_verified || false,
    })
    return res
  } catch (err) {
    return err.response
  }
}

export const verifyEmailAuth0 = async req => {
  try {
    const auth0Token = await axios.post('/Auth0API/token')
    const res = await axios.post('/Auth0API/verify', {
      email: req.email,
      bearer: `Bearer ${auth0Token.data.result}`,
    })
    return res.data.result
  } catch (err) {
    return err.response
  }
}

export const loginCustomerAuth0 = async req => {
  try {
    const res = await axios.post('/Auth0API/login', req)
    return res
  } catch (err) {
    return err.response
  }
}

export const logOutCustomerAuth0 = async () => {
  try {
    const res = await axios.post('/Auth0API/logOut')
    return res
  } catch (err) {
    return err.response
  }
}

export const forgotPasswordAuth0 = async data => {
  try {
    return await axios.post('/Auth0API/forgotPassword', { email: data.email })
  } catch (err) {
    return err
  }
}

export const sendEmailVerification = async data => {
  try {
    return await axios.post('/Auth0API/sendEmailVerification', {
      email: data.email,
      password: data.password,
    })
  } catch (err) {
    return err
  }
}

export const updateCustomerEmailAuth0Client = async data => {
  return await axios.post('/Auth0API/updateCustomerEmailAuth0Server', data)
}
