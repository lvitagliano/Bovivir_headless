import * as types from '../actionTypes'
import {
  createCart,
  customerData,
  setBillingAndShippingAddress,
  setPaymentInformation,
  getCart,
  subscribeEmailToNewsletterClient,
  auth0token,
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
  getGuestCart,
} from '../../services/Client/GraphQl/m2/GQLAPI'

import {
  deleteCustomerAddressClient,
  addCustomerAddressClient,
  updateCustomerAddressClient,
  updateCustomerDataClient,
  updateCustomerDataCLNClient,
  updateCustomerEmailM2Client,
} from '../../services/Client/GraphQl/m2GQL'

import { kiwiValidationCardCLNClient } from '../../services/Client/kiwiApi'
import { logOut, setRegisteredUserToNewsletter } from './userAction'
import { updateCustomerEmailAuth0Client } from '../../services/Client/auth0api'

const updateCustomerDataCLNM2Action = data => async dispatch => {
  if (data.covedisa_tarjeta_cln !== '') {
    const kiwiValidationCardCLN = await kiwiValidationCardCLNClient(data)
    if (kiwiValidationCardCLN.status === 200) {
      // Trata de guardar la info en M2
      const resp = await updateCustomerDataCLNClient(data)
      if (resp) {
        await dispatch(setCustomerData())
        dispatch(
          setSuccess({
            severity: 'success',
            errorMessage: 'Tarjeta CLN agregada con exito.',
            status: 200,
          })
        )
      } else {
        //send alert error
        console.log('error en m2CLN')
      }
    } else {
      //send alert error
      await errorController(
        { errorMessage: kiwiValidationCardCLN.data.result, status: kiwiValidationCardCLN.status },
        dispatch
      )
    }
  } else {
    const resp = await updateCustomerDataCLNClient(data)
    if (resp) {
      await dispatch(setCustomerData())
      dispatch(
        setSuccess({
          severity: 'success',
          errorMessage: 'Tarjeta CLN removida con exito.',
          status: 200,
        })
      )
    } else {
      //send alert error
      console.log('error en m2CLN')
    }
  }
  await dispatch(clearFlagCustomerCart())
}

const updateCustomerEmailAction = data => async (dispatch, getState) => {
  const token = getState(store => store.user)
  const accessToken = token.user.auth0DataLogIn.access_token

  const respM2 = await updateCustomerEmailM2Client(data)

  if (respM2) {
    await updateCustomerEmailAuth0Client({
      userAccessToken: accessToken,
      email: data.email,
    })
    dispatch(
      setSuccess({
        severity: 'success',
        errorMessage: 'Email modificado con exito',
        status: 200,
      })
    )
    dispatch(logOut())
  } else {
    catchErrorGraphql(respM2, dispatch)
  }
}

const updateCustomerDataM2Action = data => async dispatch => {
  dispatch(setRequest())
  const resp = await updateCustomerDataClient(data)
  if (resp) {
    await dispatch(setCustomerData())
  } else {
    console.log('else  updateCustomerDataClient')
  }
}

const deleteCustomerAddressM2Action = data => async dispatch => {
  dispatch(setRequest())
  const resp = await deleteCustomerAddressClient(data)
  if (resp) {
    await dispatch(setCustomerData())
  } else {
    console.log('else  deleteCustomerAddressM2Action')
  }
}

const addCustomerAddressM2Action = data => async dispatch => {
  dispatch(setRequest())
  const resp = await addCustomerAddressClient(data)
  if (resp) {
    await dispatch(setCustomerData())
  } else {
    console.log('else  addCustomerAddressM2Action')
  }
}

const updateCustomerAddressM2Action = data => async dispatch => {
  dispatch(setRequest())
  const resp = await updateCustomerAddressClient(data)
  if (resp) {
    await dispatch(setCustomerData())
  } else {
    console.log('else  updateCustomerAddressM2Action')
  }
}

const setM2Step = data => async dispatch => {
  dispatch({
    type: types.SET_M2_STEP,
    payload: data,
  })
}

const clearFlagCustomerCart = () => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const { customerCart } = await getCustomerCart()
    const cartIdRestApi = await (await getCart()).data
    customerCart.demo = cartIdRestApi
    await dispatch(setCartAndItemsSuccess(customerCart))
  } catch (err) {
    catchErrorGraphql(err, dispatch)
  }
}

const getCustomerCartAndItems = () => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const { customerCart } = await getCustomerCart()

    // carro nuevo
    const cartIdRestApi = await (await getCart()).data

    // carro viejo
    const guestCart = getState().m2.cart

    if (guestCart.items.length && customerCart.id !== guestCart.id) {
      const variables = {
        src_cart_id: guestCart.id,
        dst_cart_id: customerCart.id,
      }
      await dispatch(mergeGuestAndCustomerCarts(variables))
    } else {
      customerCart.demo = cartIdRestApi
      await dispatch(setCartAndItemsSuccess(customerCart))
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
      await dispatch(getCustomerCartAndItems())
    }
  } catch (err) {
    errorController({ status: err.status, from: 'createCustomerCart' }, dispatch)
  }
}

const getAuth0Token = token => async dispatch => {
  dispatch(setRequest())
  try {
    return await auth0token(token)
  } catch (err) {
    return err.response
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
      catchErrorGraphql(err, dispatch)
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

      await dispatch(setCartAndItemsSuccess(customerCart))
    }
  } catch (err) {
    if (err.response.errors[0].message === 'Current user does not have an active cart.') {
      await dispatch(clearFlagCustomerCart())
    } else {
      catchErrorGraphql(err, dispatch)
    }
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
      const { customerCart } = await getCustomerCart()
      await dispatch(setCartAndItemsSuccess(customerCart))
    } else {
      console.log(res)
    }
  } catch (err) {
    catchErrorGraphql(err, dispatch)
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
      const { customerCart } = await getCustomerCart()
      await dispatch(setCartAndItemsSuccess(customerCart))
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
      if (getState().user.isLogedInAuth0) {
        const { customerCart } = await getCustomerCart()
        dispatch(setCartAndItemsSuccess(customerCart))
      } else {
        const { cart } = await getGuestCart(variables.cart_id)
        dispatch(setCartAndItemsSuccess(cart))
      }

      dispatch(
        setSuccess({
          severity: 'success',
          errorMessage: `${
            res.addSimpleProductsToCart.cart.items.find(i => i.product.sku === item.sku).product
              .name
          }, agregado con éxito`,
          status: 200,
        })
      )
    }
  } catch (err) {
    if (err.response.errors[0].message === 'Current user does not have an active cart.') {
      await dispatch(clearFlagCustomerCart())
    } else {
      catchErrorGraphql(err, dispatch)
    }
  }
}

const updateItemsInCart = item => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    if (!getState().m2.cart.id) dispatch(setError('Carrito no creado'))
    const items = getState().m2.cart?.items

    let stateItems = items.map(it => ({
      cart_item_id: it.id,
      quantity: it.quantity,
    }))

    const newItems = Object.values([
      ...stateItems,
      ...[
        {
          cart_item_id: item.id,
          quantity: item.quantity,
        },
      ],
    ]).reduce((result, { cart_item_id, ...rest }) => {
      result[cart_item_id] = {
        ...(result[cart_item_id] || {}),
        cart_item_id,
        ...rest,
      }

      return result
    }, {})

    const variables = {
      cart_id: getState().m2.cart.id,
      cart_items: newItems,
    }

    const res = await updateItems(variables)

    if (res.updateCartItems) {
      if (getState().user.isLogedInAuth0) {
        const { customerCart } = await getCustomerCart()
        dispatch(setCartAndItemsSuccess(customerCart))
      } else {
        const { cart } = await getGuestCart(variables.cart_id)
        dispatch(setCartAndItemsSuccess(cart))
      }

      dispatch(
        setSuccess({
          severity: 'success',
          errorMessage: `Producto actualizado con éxito`,
          status: 200,
        })
      )
    }
  } catch (err) {
    if (err.response.errors[0].message === 'Current user does not have an active cart.') {
      await dispatch(clearFlagCustomerCart())
    } else {
      catchErrorGraphql(err, dispatch)
    }
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
      if (getState().user.isLogedInAuth0) {
        const { customerCart } = await getCustomerCart()
        dispatch(setCartAndItemsSuccess(customerCart))
      } else {
        const { cart } = await getGuestCart(variables.cart_id)
        dispatch(setCartAndItemsSuccess(cart))
      }
    }
  } catch (err) {
    if (err.response.errors[0].message === 'Current user does not have an active cart.') {
      await dispatch(clearFlagCustomerCart())
    } else {
      catchErrorGraphql(err, dispatch)
    }
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
    errorController(
      { errorMessage: err.statusText, status: err.status, from: 'setCustomerData' },
      dispatch
    )
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
        await dispatch(
          setSuccess({
            severity: 'success',
            errorMessage: 'Agregado a favoritos con éxito.',
          })
        )
        break
      case 'REMOVE':
        res = await removeProductsFromWishlist(variables)
        await dispatch(setCustomerWishListSuccess(res.removeProductsFromWishlist.wishlist))
        await dispatch(
          setSuccess({
            severity: 'success',
            errorMessage: 'Removido de favoritos con éxito.',
          })
        )
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
      region: 'BUENOS AIRES',
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
      return res[1]
    }
  } catch (err) {
    errorController({ status: err.status, from: 'setPaymentMethod' }, dispatch)
    return
  }
}

const setBillingAndShipping = (address, types, hop) => async (dispatch, getState) => {
  dispatch(setRequest())
  try {
    const res = await setBillingAndShippingAddress(address, types, hop)
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

// M2API
const subscribeEmailToNewsletterAction = data => async dispatch => {
  dispatch(setRequest())
  try {
    const resp = await subscribeEmailToNewsletterClient(data)
    dispatch(
      setSuccess({
        severity: 'success',
        errorMessage: resp.data.result,
        status: 200,
      })
    )
    dispatch(setRegisteredUserToNewsletter(true))
  } catch (error) {
    errorController(
      {
        errorMessage: 'El correo eléctronico ya se encuentra suscripto en el Newsletter ',
        status: error.status,
      },
      dispatch
    )
    dispatch(setRegisteredUserToNewsletter(false))
  }
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
const setSuccess = success => ({
  type: types.SET_SUCCESS,
  payload: success,
})
const setClearAlerts = () => ({
  type: types.SET_CLEAR_ALERTS,
})
const setCartSuccess = quote_id => ({
  type: types.SET_CART_SUCCESS,
  payload: quote_id,
})
const setAuth0tokenSucess = data => ({
  type: types.SET_AUTH0_TOKEN,
  payload: data,
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
const setShippingViewAddress = data => ({
  type: types.SET_SHIPPING_VIEW_ADDRESS,
  payload: data,
})
const setBillingAddress = data => ({
  type: types.SET_BILLING_ADDRESS,
  payload: data,
})
const setShippingMethods = data => ({
  type: types.SET_POINT_HOP,
  payload: data,
})
const setPaymentMethods = data => ({
  type: types.SET_PAYMENT_METHOD,
  payload: data,
})
const setSelectedShippingAction = data => ({
  type: types.SET_SELECTED_SHIPPING_METHOD,
  payload: data,
})

// Usar ese metodo para controlar los errores de respuesta 40X de axiosM2ApiInstance
const errorController = (err, dispatch = null) => {
  dispatch(
    setError({
      severity: 'error',
      errorMessage: err.errorMessage,
      status: err.status,
    })
  )
}

// Usar ese metodo para controlar los errores de GQLAPI
const catchErrorGraphql = (err, dispatch) => {
  let stringify = JSON.stringify(err)
  let json = JSON.parse(stringify)
  console.log('CONTROLADOR DE ERRORES GRAPHQL: ', json)
  if (json.response?.errors)
    errorController({ errorMessage: json.response.errors[0].message }, dispatch)
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
  setShippingViewAddress,
  setBillingAddress,
  setShippingMethods,
  setPaymentMethods,
  deleteCustomerAddressM2Action,
  addCustomerAddressM2Action,
  updateCustomerAddressM2Action,
  subscribeEmailToNewsletterAction,
  setClearAlerts,
  setSuccess,
  getAuth0Token,
  updateCustomerDataM2Action,
  updateCustomerDataCLNM2Action,
  clearFlagCustomerCart,
  updateCustomerEmailAction,
  setSelectedShippingAction,
}
