import * as types from '../actionTypes'
import {
  createCart,
  customerData,
  setBillingAndShippingAddress,
  setPaymentInformation,
  getCart,
} from '../../services/Client/m2api'
import {
  getCustomerCart,
  addCoupon,
  removeCoupon,
  addItem,
  updateItems,
  removeItem,
  createEmptyCart,
  mergeCarts,
  getCustomerOrders,
  getCustomerWishList,
  addProductsToWishlist,
  removeProductsFromWishlist,
} from '../../services/Client/GraphQl/m2/GQLAPI'

const setM2Step = data => async dispatch => {
  dispatch({
    type: types.SET_M2_STEP,
    payload: data,
  })
}

const getCustomerCartAndItems = () => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const resCart = await getCustomerCart()
    if (resCart) {
      let { customerCart } = resCart

      const cartIdRestApi = await (await getCart()).data.id

      const guestCart = getState().m2.cart

      if (guestCart.id && guestCart.items.length && customerCart.id !== getState().m2.cart.id) {
        const variables = {
          src_cart_id: getState().m2.cart.id,
          dst_cart_id: customerCart.id,
        }
        dispatch(mergeGuestAndCustomerCarts(variables))
      } else {
        if (cartIdRestApi) {
          customerCart.quote_id = cartIdRestApi
          dispatch(setCartAndItemsSuccess(customerCart))
        }
        dispatch(setCartAndItemsSuccess(customerCart))
      }
    } else {
      console.log(resCart)
    }
  } catch (err) {
    catchErrorGraphql(err, dispatch)
  }
}

const createCustomerCart = () => async dispatch => {
  dispatch(setRequest())
  try {
    const res = await createCart()
    if (res && res.status === 200) {
      dispatch(setCartSuccess(res.data))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'createCustomerCart' }, dispatch)
  }
}

const createEmptyGuestCart = () => async (dispatch, getState) => {
  if (!getState().m2.cart.id) {
    dispatch(setRequest())
    try {
      const resCart = await createEmptyCart()
      if (resCart) {
        let { createEmptyCart } = resCart
        dispatch(setEmptyCartSucces({ id: createEmptyCart, items: [] }))
      }
    } catch (err) {
      errorController({ status: err.status, from: 'createEmptyGuestCart' }, dispatch)
    }
  }
}

const mergeGuestAndCustomerCarts = variables => async dispatch => {
  dispatch(setRequest())
  try {
    const res = await mergeCarts(variables)
    if (res.mergeCarts) {
      const cartIdRestApi = await (await getCart()).data.id
      let customerCart = res.mergeCarts

      if (cartIdRestApi) {
        customerCart.quote_id = cartIdRestApi
      }

      dispatch(setCartAndItemsSuccess(customerCart))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'mergeGuestAndCustomerCarts' }, dispatch)
  }
}

const addCouponToCart = coupon => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))

    const variables = {
      cart_id: getState().m2.cart.id,
      coupon_code: coupon,
    }
    const res = await addCoupon(variables)
    if (res.applyCouponToCart) {
      const { cart } = res.applyCouponToCart
      await dispatch(setCartAndItemsSuccess(cart))
    } else {
      console.log(res)
    }
  } catch (err) {
    errorController({ status: err.status, from: 'addCouponToCart' }, dispatch)
  }
}

const removeCouponFromCart = () => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))

    const variables = {
      cart_id: getState().m2.cart.id,
    }
    const res = await removeCoupon(variables)
    if (res.removeCouponFromCart) {
      const { cart } = res.removeCouponFromCart
      await dispatch(setCartAndItemsSuccess(cart))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'removeCouponFromCart' }, dispatch)
  }
}

const addItemToCart = item => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))

    const variables = {
      cart_id: getState().m2.cart.id,
      cart_items: [{ data: item }],
    }
    const res = await addItem(variables)
    if (res.addSimpleProductsToCart) {
      const { cart } = res.addSimpleProductsToCart
      dispatch(setCartAndItemsSuccess(cart))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'addItemToCart' }, dispatch)
  }
}

const updateItemsInCart = items => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))

    const variables = {
      cart_id: getState().m2.cart.id,
      cart_items: items,
    }
    const res = await updateItems(variables)
    if (res.updateCartItems) {
      const { cart } = res.updateCartItems
      dispatch(setCartAndItemsSuccess(cart))
    }
  } catch (err) {
    errorController(err, dispatch)
  }
}

const removeItemFromCart = item => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))

    const variables = {
      cart_id: getState().m2.cart.id,
      cart_item_id: parseInt(item.id),
    }
    const res = await removeItem(variables)
    if (res.removeItemFromCart) {
      const { cart } = res.removeItemFromCart
      dispatch(setCartAndItemsSuccess(cart))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'removeItemFromCart' }, dispatch)
  }
}

const setCustomerData = () => async dispatch => {
  dispatch(setRequest())
  try {
    const res = await customerData()
    if (res && res.status === 200) {
      dispatch(setCustomerDataSuccess(res.data))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'setCustomerData' }, dispatch)
  }
}

const setCustomerWishList = (action = 'GET', variables) => async dispatch => {
  dispatch(setRequest())
  let res
  try {
    switch (action) {
      case 'ADD':
        res = await addProductsToWishlist(variables)
        await dispatch(setCustomerWishListSuccess(res.addProductsToWishlist.wishlist))
        break
      case 'REMOVE':
        res = await removeProductsFromWishlist(variables)
        await dispatch(setCustomerWishListSuccess(res.removeProductsFromWishlist.wishlist))
        break
      default:
        res = await getCustomerWishList()
        await dispatch(setCustomerWishListSuccess(res.customer.wishlist))
        break
    }
  } catch (err) {
    catchErrorGraphql(err, dispatch)
  }
}

const setPaymentMethod = paymentMthd => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const { step3 } = getState().m2
    const billing_address = {
      id: step3.id || 0,
      region: step3.region.region || '',
      region_id: step3.region.region_id || '',
      region_code: step3.region.region_code || '',
      country_id: 'AR',
      street: step3.street || [],
      postcode: step3.postcode || '',
      city: step3.city || '',
      firstname: step3.firstname || '',
      lastname: step3.lastname || '',
      telephone: step3.telephone || '',
    }
    const res = await setPaymentInformation(paymentMthd, billing_address)
    if (res) {
      dispatch(setPaymentURLSuccess(res))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'setPaymentMethod' }, dispatch)
  }
}

const setBillingAndShipping = (address, types) => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const res = await setBillingAndShippingAddress(address, types)
    if (res && res.status === 200) {
      dispatch(setPaymentyMethodOpsSuccess(res.data))
    }
  } catch (err) {
    errorController({ status: err.status, from: 'setBillingAndShipping' }, dispatch)
  }
}

const setCustomerOrder = () => async dispatch => {
  dispatch(setRequest())
  getCustomerOrders()
    .then(resp => {
      dispatch(setCustomerOrderSuccess(resp))
    })
    .catch(err => catchErrorGraphql(err, dispatch))
}

const setFormError = error => ({
  type: types.SET_FORM_ERROR,
  payload: error,
})
const setRequest = () => ({
  type: types.SET_REQUEST,
})
const setError = error => ({
  type: types.SET_ERROR,
  payload: error,
})
const setCartSuccess = quote_id => ({
  type: types.SET_CART_SUCCESS,
  payload: quote_id,
})
const setEmptyCartSucces = cart => ({
  type: types.SET_EMPTY_CART_SUCCESS,
  payload: cart,
})
const setCartAndItemsSuccess = cart => ({
  type: types.SET_CART_AND_ITEMS_SUCCESS,
  payload: cart,
})
const setCustomerDataSuccess = data => ({
  type: types.SET_CUSTOMER_DATA_SUCCESS,
  payload: data,
})
const setCustomerWishListSuccess = data => ({
  type: types.SET_CUSTOMER_WISHLIST_SUCCESS,
  payload: data,
})
const setCustomerOrderSuccess = data => ({
  type: types.SET_CUSTOMER_ORDER_SUCCESS,
  payload: data,
})
const setPaymentyMethodOpsSuccess = data => ({
  type: types.SET_PAYMENT_METHOD_OPS_SUCCESS,
  payload: data,
})
const setPaymentURLSuccess = data => ({
  type: types.SET_PAYMENT_URL_SUCCESS,
  payload: data,
})

const setShippingAddress = data => ({
  type: types.SET_SHIPPING_ADDRESS,
  payload: data,
})

const setBillingAddress = data => ({
  type: types.SET_BILLING_ADDRESS,
  payload: data,
})

const setPaymentMethods = data => ({
  type: types.SET_PAYMENT_METHOD,
  payload: data,
})

// Usar ese metodo para controlar los errores de respuesta 40X de axiosM2ApiInstance
const errorController = (err, dispatch = null) => {
  switch (err.status) {
    case 401:
      dispatch(
        setError({
          severity: 'error',
          errorMessage: `Su sesión ha expirado desde ${err?.from}, por favor vuelva a ingresar`,
          status: err.status,
        })
      )
    default:
      dispatch(
        setError({
          severity: 'error',
          errorMessage: `ERROR ${err.status} desde ${err?.from}`,
        })
      )
      break
  }
}

// Usar ese metodo para controlar los errores de respuesta 40X de GQLAPI
const catchErrorGraphql = (err, dispatch) => {
  let stringify = JSON.stringify(err)
  let json = JSON.parse(stringify)
  let authorizationError = json.response?.errors.find(
    e => e.extensions.category === 'graphql-authorization'
  )
    ? true
    : false
  if (authorizationError) errorController({ status: 401, from: 'setCustomerOrder' }, dispatch)
  else errorController({ status: 'otro', from: 'setCustomerOrder' }, dispatch)
}

export {
  createEmptyGuestCart,
  createCustomerCart,
  removeItemFromCart,
  updateItemsInCart,
  addItemToCart,
  addCouponToCart,
  removeCouponFromCart,
  setCustomerData,
  setCustomerWishList,
  setM2Step,
  setBillingAndShipping,
  setPaymentMethod,
  getCustomerCartAndItems,
  mergeGuestAndCustomerCarts,
  setCustomerOrder,
  setFormError,
  setShippingAddress,
  setBillingAddress,
  setPaymentMethods,
}
