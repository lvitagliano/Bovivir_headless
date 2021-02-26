import * as types from '../actionTypes'
import {
  createCustomerAuth0,
  loginCustomerAuth0,
  logOutCustomerAuth0,
} from '../../services/Client/auth0api'
import { createCustomerM2 } from '../../services/Client/m2api'
import { generateToken } from '../../services/Client/GraphQl/m2/GQLAPI'
import { delState } from '../../services/Client/redisApi'

export const login = data => async dispatch => {
  await dispatch(loginM2(data))
}

export const createNewCustomer = data => async dispatch => {
  dispatch(setUserRequest)

  const resM2 = await createCustomerM2(data)
  if (resM2.status !== 200) {
    dispatch(setUserError(resM2.data?.message || resM2.data))
  } else {
    dispatch(newCustomerM2Succes())
    const resAuth0 = await createCustomerAuth0(data)
    if (resAuth0.status !== 200) {
      dispatch(setUserError(resAuth0.data.message))
    } else {
      dispatch(newCustomerAuth0Succes())
    }
  }
}

export const logOut = () => async dispatch => {
  dispatch(setUserRequest)
  try {
    const resAuth0 = await logOutCustomerAuth0()
    if (resAuth0.status !== 200) {
      dispatch(setUserError(resAuth0.data.message))
    } else {
      await dispatch(logout())
      await delState()
    }
  } catch (err) {
    dispatch(setUserError(err))
  }
}

const loginM2 = data => async dispatch => {
  dispatch(setUserRequest)
  try {
    const res = await generateToken(data)
    const { generateCustomerToken } = res
    if (generateCustomerToken) {
      await dispatch(setM2LoginSucces(generateCustomerToken.token))
      await dispatch(loginAuth0(data))
    }
  } catch (err) {
    dispatch(setUserError(err))
  }
}

const loginAuth0 = data => async (dispatch, getState) => {
  dispatch(setUserRequest)
  try {
    const res = await loginCustomerAuth0(data)
    if (!res?.data?.success && getState().user.isLogedInM2) {
      const createResp = await createCustomerAuth0(data)
      if (createResp.status === 200) {
        await dispatch(setAuth0LoginSucces(createResp.data.result.access_token))
      }
    } else {
      await dispatch(setAuth0LoginSucces(res.data.result))
    }
  } catch (err) {
    dispatch(setUserError(err))
  }
}

export const setLoginRequest = state => ({
  type: types.SET_LOGIN_REQUEST,
  payload: state,
})

const setUserRequest = () => ({
  type: types.SET_USER_REQUEST,
})
const setUserError = error => ({
  type: types.SET_USER_ERROR,
  payload: error,
})
const setM2LoginSucces = token => ({
  type: types.SET_M2_LOGIN_SUCCESS,
  payload: token,
})
const setAuth0LoginSucces = tokens => ({
  type: types.SET_AUTH0_LOGIN_SUCCESS,
  payload: tokens,
})
const newCustomerM2Succes = () => ({
  type: types.NEW_M2_SUCCESS,
})
const newCustomerAuth0Succes = () => ({
  type: types.NEW_AUTH0_SUCCESS,
})
const logout = () => ({
  type: types.LOGOUT,
})
