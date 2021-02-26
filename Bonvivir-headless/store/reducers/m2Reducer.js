import * as types from '../actionTypes'
import { normalizeError } from './utils/normalizer'

const initialState = {
  //Datos Personales
  step1: {
    firstname: '',
    lastname: '',
    gender: 1,
    email: '',
    areacod: '',
    days: '',
    months: '',
    years: '',
    is_subscribed: false,
  },
  //Datos de facturacion
  step2: {
    region: '',
    region_id: '',
    region_code: '',
    country_id: '',
    street: '',
    telephone: '',
    city: '',
    postcode: '',
    email: '',
    firstname: '',
    lastname: '',
    same_as_billing: '',
    save_in_address_book: '',
  },
  step3: {
    region: '',
    region_id: '',
    region_code: '',
    country_id: '',
    street: '',
    telephone: '',
    city: '',
    postcode: '',
    email: '',
    firstname: '',
    lastname: '',
    save_in_address_book: '',
  },
  step4: {
    paymentMethod: 'checkmo',
  },
  cart: {
    id: null,
    applied_coupons: [],
    items: [],
  },
  step5: {},
  customerData: {},
  customerWishList: {},
  customerBoughtList: {},
  paymentMethodData: {},
  paymentURL: '',
  currentStep: '',
  loading: true,
  formError: {},
  error: null,
}

const m2Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_M2_STEP:
      return set_m2_step(state, payload)
    case types.SET_REQUEST:
      return set_request(state, payload)
    case types.SET_ERROR:
      return set_error(state, payload)
    case types.SET_FORM_ERROR:
      return set_form_error(state, payload)
    case types.SET_CART_SUCCESS:
      return set_cart_success(state, payload)
    case types.SET_EMPTY_CART_SUCCESS:
      return set_empty_cart_success(state, payload)
    case types.SET_ITEM_SUCCESS:
      return set_item_success(state, payload)
    case types.DELETE_ITEM_SUCCESS:
      return delete_item_success(state, payload)
    case types.SET_CART_AND_ITEMS_SUCCESS:
      return set_cart_and_items_success(state, payload)
    case types.SET_CUSTOMER_DATA_SUCCESS:
      return set_customer_data_success(state, payload)
    case types.SET_CUSTOMER_WISHLIST_SUCCESS:
      return set_customer_wishlist_success(state, payload)
    case types.SET_CUSTOMER_ORDER_SUCCESS:
      return set_customer_order_success(state, payload)
    case types.SET_PAYMENT_METHOD_OPS_SUCCESS:
      return set_payment_method_ops_success(state, payload)
    case types.SET_PAYMENT_URL_SUCCESS:
      return set_payment_url_success(state, payload)

    case types.SET_SHIPPING_ADDRESS:
      return set_shipping_address(state, payload)
    case types.SET_BILLING_ADDRESS:
      return set_billing_address(state, payload)
    case types.SET_PAYMENT_METHOD:
      return set_payment_methods(state, payload)

    case types.SET_APPLIED_COUPONS:
      return set_applied_coupons(state, payload)
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}

const set_shipping_address = (state, data) => ({ ...state, step2: data })
const set_billing_address = (state, data) => ({ ...state, step3: data })
const set_payment_methods = (state, data) => ({ ...state, step4: data })

const set_m2_step = (state, data) => {
  const step = data.step
  const currentStep = data.currentStep
  delete data['step']
  delete data['currentStep']
  return {
    ...state,
    [step]: data,
    currentStep,
    loading: false,
    error: null,
  }
}

const set_request = (state, data) => ({ ...state, loading: true })

const set_error = (state, data) => ({ ...state, loading: false, error: normalizeError(data) })

const set_form_error = (state, data) => ({ ...state, formError: data })

const set_cart_success = (state, data) => {
  const clonedCart = { ...state.cart, quote_id: data }
  return { ...state, cart: clonedCart, loading: false, error: null }
}

const set_empty_cart_success = (state, data) => {
  return { ...state, cart: data, loading: false, error: null }
}

const set_item_success = (state, data) => {
  const clonedCart = { ...state.cart, items: [...state.cart.items, data] }
  return { ...state, cart: clonedCart, loading: false, error: null }
}

const delete_item_success = (state, data) => {
  const clonedCart = { ...state.cart, items: items.reduce(item => data.id !== item.id) }
  return { ...state, cart: clonedCart, loading: false, error: null }
}

const set_customer_data_success = (state, data) => {
  return { ...state, customerData: data, loading: false, error: null }
}

const set_customer_wishlist_success = (state, data) => {
  return { ...state, customerWishList: data, loading: false, error: null }
}

const set_customer_order_success = (state, data) => {
  return { ...state, customerBoughtList: data.customerOrders, loading: false, error: null }
}

const set_cart_and_items_success = (state, data) => {
  return { ...state, cart: data, loading: false, error: null }
}

const set_payment_method_ops_success = (state, data) => {
  return { ...state, paymentMethodData: data, loading: false, error: null }
}

const set_payment_url_success = (state, data) => {
  return { ...state, paymentURL: data[1], loading: false, error: null }
}

export { m2Reducer }
