import axios from 'axios'
import Cookies from 'js-cookie'

const axiosKiwiApiInstance = axios.create()

//Add a request interceptor
axiosKiwiApiInstance.interceptors.request.use(
  config => {
    const token = Cookies.getJSON('user')?.m2DataLogIn || ''
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

//Add a response interceptor
axiosKiwiApiInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error?.response?.status) {
      return Promise.reject(error)
    } else {
      return Promise.reject(error.response)
    }
  }
)

export const standardizeKiwiApiClient = async obj => {
  try {
    const res = await axiosKiwiApiInstance.post('/KiwiAPI/standardize', obj)
    if (res && res.status === 200) {
      return res
    }
  } catch (err) {
    return err
  }
}

export const kiwiValidationCardCLNClient = async data => {
  try {
    const res = await axiosKiwiApiInstance.post('/KiwiAPI/cardCLN', data)
    if (res && res.status === 200) {
      return res
    }
  } catch (err) {
    return err
  }
}
