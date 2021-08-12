import axios from 'axios'
import Cookies from 'js-cookie'

const { GraphQLClient, gql } = require('graphql-request')
const url = process.env.M2_CONFIG_HOST
  ? `${process.env.M2_CONFIG_HOST}/graphql`
  : 'https://qa-tienda2.bonvivir.com/graphql'

const graphqlHttp = new GraphQLClient(url)

const axiosM2GQLInstance = axios.create()

//Add a request interceptor
axiosM2GQLInstance.interceptors.request.use(
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
axiosM2GQLInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error?.response?.status) {
      console.log('ERROR EN EL SERVIDOR', error)
      return Promise.reject(error)
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      console.log('API Error Unauthorized:', error.response)
      return Promise.reject(error.response)
    } else if (
      error.response &&
      error.response.status === 400 &&
      error.response.statusText === 'Bad Request'
    ) {
      console.log('API Error Bad Request:', error.response.data.result)
      return Promise.reject(error.response.data.result)
    } else console.log('axiosM2GQLInstance Error response:', error.response)
  }
)

export const deleteCustomerAddressClient = data =>
  axiosM2GQLInstance.post('/m2GQL/deleteCustomerAddressServer', { ID: data })
export const addCustomerAddressClient = data =>
  axiosM2GQLInstance.post('/m2GQL/addCustomerAddressServer', data)
export const updateCustomerAddressClient = data =>
  axiosM2GQLInstance.post('/m2GQL/updateCustomerAddressServer', data)
export const getProductBySku = data => axiosM2GQLInstance.post('/m2GQL/products', data)
export const generateTokenClient = data =>
  axiosM2GQLInstance.post('/m2GQL/generateTokenServer', data)
export const updateCustomerLogedPassword = data =>
  axiosM2GQLInstance.post('/m2GQL/updateCustomerLogedPassword', data)
export const getProductsClient = data => axiosM2GQLInstance.post('/m2GQL/getProductsServer', data)
export const getCustomAttributes = data => axiosM2GQLInstance.post('/m2GQL/customAttributes', data)
export const addProductStockAlert = data =>
  axiosM2GQLInstance.post('/m2GQL/productStockAlert', data)

const GET_PRODUCTS_FOR_INDEXGOTIENDA = gql`
  query {
    products(search: "") {
      items {
        id
        html_wide
        url_key
        url_suffix
        image {
          label
          url
        }
        name
        envio_gratis
        contenido
        cantidad
        dos_por_uno
        special_date
        qty
        descuento_socios
        thumbnail {
          url
        }
        description {
          html
        }
        sku
        media_gallery {
          label
          url
        }
        only_x_left_in_stock
        stock_status
        short_description {
          html
        }
        vino_cepa
        vino_bodega
        vino_variedad
        vino_seleccion
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            discount {
              amount_off
              percent_off
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`
export const getProductsForIndexGOTIENDAClient = async () => {
  try {
    const { data, errors } = await graphqlHttp.rawRequest(GET_PRODUCTS_FOR_INDEXGOTIENDA)
    return data.products
  } catch (error) {
    return error.response?.data?.products || null
  }
}

export const updateCustomerDataClient = data =>
  axiosM2GQLInstance.post('/m2GQL/updateCustomerDataServer', data)

export const updateCustomerDataCLNClient = data =>
  axiosM2GQLInstance.post('/m2GQL/updateCustomerDataCLNServer', data)

export const updateCustomerEmailM2Client = data =>
  axiosM2GQLInstance.post('/m2GQL/updateCustomerEmailM2Server', {
    email: data.email,
  })

export const validateEmailIsAvailableM2Client = data =>
  axiosM2GQLInstance.post('/m2GQL/validateEmailIsAvailableM2Server', { email: data.email })

  export const getListMenuM2 = () =>
  axiosM2GQLInstance.post('/m2GQL/getListMenuM2')
