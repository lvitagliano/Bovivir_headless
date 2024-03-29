import axios from 'axios'
import Cookies from 'js-cookie'

const axiosM2ApiInstance = axios.create()

//Add a request interceptor
axiosM2ApiInstance.interceptors.request.use(
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
axiosM2ApiInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error?.response?.status) {
      return Promise.reject(error)
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      return Promise.reject(error.response)
    } else if (
      error.response &&
      error.response.status === 400 &&
      error.response.statusText === 'Bad Request'
    ) {
      return Promise.reject(error.response)
    } else {
      return Promise.reject(error.response)
    }
  }
)

export const createCustomerM2 = async data => {
  let newCustomerM2 = {
    customer: {
      email: data.email,
      firstname: data.name,
      lastname: data.lastname,
      dob: data.dob,
      taxvat: data.taxvat,
      gender: data.gender
    },
  }
  try {
    const res = await axiosM2ApiInstance.post(`/m2API/createCustomerM2`, newCustomerM2)
    if (res && res.status === 200) {
      return res
    }
  } catch (err) {
    return err
  }
}

export const auth0token = async token => {
  try {
    const auth = await axiosM2ApiInstance.post('/m2API/auth0token', token)
    return auth
  } catch (error) {
    return error
  }
}

export const createCart = () => axiosM2ApiInstance.post(`/m2API/createCart`)
export const addItem = item => axiosM2ApiInstance.post(`/m2API/addItem`, item)
export const removeItem = (id, item) => axiosM2ApiInstance.delete(`/m2API/removeItem`, { id, item })
export const clearCart = () => axiosM2ApiInstance.delete(`/m2API/clearCart`)
export const getCart = () => axiosM2ApiInstance.get(`/m2API/getCart`)
export const customerData = () => axiosM2ApiInstance.get(`/m2API/customerData`)
export const selectPayment = paymentMthd =>
  axiosM2ApiInstance.post('/m2API/selectPayment', paymentMthd)

export const setBillingAddress = async (personalData, data) => {
  const address = {
    addressInformation: {
      shipping_address: normalizeAddress(personalData, data),
    },
  }
  try {
    let res = await axiosM2ApiInstance.post(`/m2API/setBillingAddress`, address)
    if (res && res.status === 200) {
      console.log(res.data)
    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}

export const getPointHoP = async () => {
  try {
    let res = await axiosM2ApiInstance.get(`/hop/pickup_points`)
    if (res && res.status === 200) {
      return res.data[0]
    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}

export const setShippingAddress = async (personalData, data) => {
  const address = {
    addressInformation: {
      shipping_address: normalizeAddress(personalData, data),
    },
  }
  try {
    let res = await axiosM2ApiInstance.post(`/m2API/setShippingAddress`, address)
    if (res && res.status === 200) {
      console.log(res.data)
    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}

export const setBillingAndShippingAddress = (addresses, types, hop) => {
  let extension_attributes = types?.carrier_code === 'hop' ? hop : {}

  const address = {
    addressInformation: {
      shipping_address: {
        country_id: 'AR',
        street: addresses?.street || '',
        telephone: addresses?.telephone || '',
        city: addresses?.city || '',
        postcode: addresses?.postcode || '',
        email: addresses?.email || '',
        firstname: addresses?.firstname || '',
        lastname: addresses?.lastname || '',
        same_as_billing: 0,
        save_in_address_book: 0,
      },
      shipping_method_code: types?.method_code,
      shipping_carrier_code: types?.carrier_code,
      extension_attributes,
    },
  }
  return axiosM2ApiInstance.post(`/m2API/setBillingAndShippingAddress`, address)
}

export const estimateShippingMethods = async personalData => {
  const address = {
    addressId: personalData,
  }
  try {
    let res = await axiosM2ApiInstance.post(`/m2API/estimateShippingMethodsById`, address)
    if (res && res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const estimateShippingMethodsByPostCode = async postcode => {
  const address = {
    address: {
      postcode,
      country_id: 'AR',
    },
  }
  try {
    let res = await axiosM2ApiInstance.post(`/m2API/estimateShippingMethodsByPostcode`, address)
    if (res && res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const setPaymentInformation = async (paymentMethod, billingAddr) => {
  const data = {
    paymentMethod: {
      method: paymentMethod,
    },
    billing_address: {
      ...billingAddr,
    },
  }

  try {
    let res = await axiosM2ApiInstance.post(`/m2API/setPaymentInformation`, data)
    if (res && res.status === 200) {
      return res.data
    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}

export const getRegions = async () => {
  try {
    let res = await axiosM2ApiInstance.get(`/m2API/getRegions`)
    if (res && res.data) {
      return res.data
    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}

export const subscribeEmailToNewsletterClient = data =>
  axiosM2ApiInstance.post(`/m2API/subscribeEmailToNewsletterServer`, data)

const normalizeAddress = (personalData, data) => {
  return {
    region: 'BUENOS AIRES',
    country_id: 'AR', //ver si se agregan mas
    street: [data.street || '', data.number || '', data.floor || '', data.apartm || ''],
    postcode: data.postcode || '',
    city: data.city || '',
    firstname: data.firstname,
    lastname: data.lastname,
    email: personalData?.email || '',
    telephone: `${data.telephone} `,
  }
}
