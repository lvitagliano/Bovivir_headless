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
  addressView: {},
  customerData: {},
  customerWishList: {},
  customerBoughtList: {},
  customerAddresses: {},
  paymentMethodData: {},
  paymentURL: '',
  currentStep: '',
  loading: true,
  formError: {},
  error: null,
  success: null,
  pointHOP: [],
  selectedShipping: {},
  openTooWeak: false,
}

const m2Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CLEAR_ALERTS:
      return set_clear_alerts(state, payload)
    case types.SET_M2_STEP:
      return set_m2_step(state, payload)
    case types.SET_REQUEST:
      return set_request(state, payload)
    case types.SET_ERROR:
      return set_error(state, payload)
    case types.SET_SUCCESS:
      return set_success(state, payload)
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
    case types.SET_SHIPPING_VIEW_ADDRESS:
      return set_shipping_view_address(state, payload)
    case types.SET_BILLING_ADDRESS:
      return set_billing_address(state, payload)
    case types.SET_POINT_HOP:
      return set_shipping_methods(state, payload)
    case types.SET_PAYMENT_METHOD:
      return set_payment_methods(state, payload)
    case types.SET_APPLIED_COUPONS:
      return set_applied_coupons(state, payload)
    case types.SET_SELECTED_SHIPPING_METHOD:
      return set_selected_shipping_method(state, payload)
    case types.LOGOUT:
      return initialState
    case types.OPENTOOWEAK:
      return set_opentooweak(state, payload)
    default:
      return state
  }
}

const set_opentooweak = (state, data) => ({ ...state, openTooWeak: data })
const set_shipping_address = (state, data) => ({ ...state, step2: data })
const set_shipping_view_address = (state, data) => ({ ...state, addressView: data })
const set_billing_address = (state, data) => ({ ...state, step3: data })
const set_shipping_methods = (state, data) => ({ ...state, step5: data })
const set_payment_methods = (state, data) => ({ ...state, step4: data })
const set_selected_shipping_method = (state, data) => ({ ...state, selectedShipping: data })

const set_m2_step = (state, data) => {
  const step = data.step
  const currentStep = data.currentStep
  delete data['step']
  delete data['currentStep']
  return {
    ...state,
    currentStep,
    loading: false,
    error: null,
  }
}
const set_request = (state, data) => ({ ...state, loading: true })
const set_error = (state, data) => ({ ...state, loading: false, error: normalizeError(data) })
const set_success = (state, data) => ({ ...state, loading: false, success: normalizeError(data) })
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

const set_clear_alerts = (state, data) => ({ ...state, error: null, success: null })

export { m2Reducer }
