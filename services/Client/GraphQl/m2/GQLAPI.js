import { GraphQLClient, request } from 'graphql-request'
import axios from 'axios'
import {
  GET_CUSTOMER_CART,
  GET_GUEST_CART,
  GET_CUSTOMER_ORDERS,
  SEARCH_PRODUCTS,
  GET_CUSTOMER_WISHLIST,
  GET_CUSTOMER_ADDRESSBOOK,
  CATEGORIES_OF_MENU_SHOP,
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

const uriM2 = `${process.env.M2_CONFIG_HOST ||
  process.env.NEXT_PUBLIC_M2_CONFIG_HOST ||
  'https://qa-tienda2.bonvivir.com'}/graphql`

export const setToken = () => {
  const token = Cookies.getJSON('user')?.m2DataLogIn || ''
  if (token)
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
}

let m2HttpGQL = new GraphQLClient(uriM2)

export const removeBearerToken = () => (m2HttpGQL = new GraphQLClient(uriM2))

export const searchProducts = variables => {
  return request(uriM2, SEARCH_PRODUCTS, variables)
}

export const createEmptyCart = () => {
  return request(uriM2, CREATE_EMPTY_CART)
}

export const getCustomerCart = async () => {
  m2HttpGQL = new GraphQLClient(uriM2, await setToken())
  return m2HttpGQL.request(GET_CUSTOMER_CART)
}

export const getGuestCart = async variables => {
  return m2HttpGQL.request(GET_GUEST_CART, { cart_id: variables })
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

export const getCategoriesShop = async () => {
  const resp = await axios.post(uriM2, {
    query: CATEGORIES_OF_MENU_SHOP,
  })
  return resp
}
