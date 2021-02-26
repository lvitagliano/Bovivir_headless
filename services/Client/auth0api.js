import axios from 'axios'

export const createCustomerAuth0 = async data => {
  try {
    const auth0Token = await axios.post('/Auth0API/token')
    const res = await axios.post('/Auth0API/createCustomer', {
      username: data.email,
      password: data.password,
      bearer: `Bearer ${auth0Token.data.result}`,
    })
    return res
  } catch (err) {
    return err
  }
}

export const loginCustomerAuth0 = async req => {
  try {
    const res = await axios.post('/Auth0API/login', req)
    return res
  } catch (err) {
    return err
  }
}

export const logOutCustomerAuth0 = async () => {
  try {
    const res = await axios.post('/Auth0API/logOut')
    return res
  } catch (err) {
    return err
  }
}
