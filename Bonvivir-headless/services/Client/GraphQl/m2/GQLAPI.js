import { GraphQLClient, request } from 'graphql-request'
import {
  GET_CUSTOMER_CART,
  GET_CUSTOMER_ORDERS,
  SEARCH_PRODUCTS,
  GET_CUSTOMER_WISHLIST,
  GET_CUSTOMER_ADDRESSBOOK,
} from './query'
import {
  GENERATE_TOKEN,
  ADD_ITEM_TO_CART,
  UPDATE_ITEMS_IN_CART,
  REMOVE_ITEM_FROM_CART,
  CREATE_EMPTY_CART,
  MERGE_CARTS,
  ADD_COUPON_TO_CART,
  REMOVE_COUPON_FROM_CART,
  REMOVE_ITEM_WISHLIST,
  ADD_ITEM_WISHLIST,
  DELETE_CUSTOMER_ADDRESS,
} from './mutation'
import Cookies from 'js-cookie'

const uriM2 = `${process.env.M2_CONFIG_HOST || 'https://qa-tienda2.bonvivir.com'}/graphql`

const setToken = () => {
  const token = Cookies.getJSON('user')?.m2DataLogIn || ''

  if (token)
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
}

const m2HttpGQL = new GraphQLClient(uriM2, setToken())

export const generateToken = async variables => {
  let respuesta
  await request(uriM2, GENERATE_TOKEN, variables).then(res => {
    m2HttpGQL.setHeader('authorization', `Bearer ${res.generateCustomerToken.token}`)
    respuesta = res
  })
  return respuesta
}

export const searchProducts = variables => {
  return request(uriM2, SEARCH_PRODUCTS, variables)
}

export const createEmptyCart = () => {
  return request(uriM2, CREATE_EMPTY_CART)
}

export const getCustomerCart = () => {
  return m2HttpGQL.request(GET_CUSTOMER_CART)
}

export const mergeCarts = variables => {
  return m2HttpGQL.request(MERGE_CARTS, variables)
}

export const getCustomerOrders = () => {
  return m2HttpGQL.request(GET_CUSTOMER_ORDERS)
}

export const updateItems = variables => {
  return m2HttpGQL.request(UPDATE_ITEMS_IN_CART, variables)
}

export const addItem = variables => {
  return m2HttpGQL.request(ADD_ITEM_TO_CART, variables)
}

export const removeItem = variables => {
  return m2HttpGQL.request(REMOVE_ITEM_FROM_CART, variables)
}

export const addCoupon = variables => {
  return m2HttpGQL.request(ADD_COUPON_TO_CART, variables)
}

export const removeCoupon = variables => {
  return m2HttpGQL.request(REMOVE_COUPON_FROM_CART, variables)
}

export const getCustomerWishList = () => {
  return m2HttpGQL.request(GET_CUSTOMER_WISHLIST)
}

export const removeProductsFromWishlist = variables => {
  return m2HttpGQL.request(REMOVE_ITEM_WISHLIST, variables)
}

export const addProductsToWishlist = variables => {
  return m2HttpGQL.request(ADD_ITEM_WISHLIST, variables)
}

export const getCustomerAddressBook = () => {
  return m2HttpGQL.request(GET_CUSTOMER_ADDRESSBOOK)
}

export const deleteCustomerAddress = variables => {
  return m2HttpGQL.request(DELETE_CUSTOMER_ADDRESS, variables)
}
