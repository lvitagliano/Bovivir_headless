import * as types from '../actionTypes'
import { normalizeError } from './utils/normalizer'

const initialState = {
  m2DataLogIn: '',
  loginRequested: false,
  auth0DataLogIn: {},
  isLogedInM2: false,
  isLogedInAuth0: false,
  isCreatedInM2: false,
  isCreatedInAuth0: false,
  error: {},
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_M2_LOGIN_SUCCESS:
      return set_m2_login_success(state, action.payload)
    case types.SET_AUTH0_LOGIN_SUCCESS:
      return set_auth0_login_success(state, action.payload)
    case types.SET_USER_REQUEST:
      return set_user_request(state, action.payload)
    case types.SET_USER_ERROR:
      return set_user_error(state, action.payload)
    case types.SET_LOGIN_REQUEST:
      return set_login_request(state, action.payload)
    case types.NEW_M2_SUCCESS:
      return new_m2_success(state)
    case types.NEW_AUTH0_SUCCESS:
      return new_auth0_success(state)
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}

const set_m2_login_success = (state, data) => ({ ...state, m2DataLogIn: data, isLogedInM2: true })

const set_auth0_login_success = (state, data) => ({
  ...state,
  auth0DataLogIn: data,
  isLogedInAuth0: true,
})

const set_login_request = (state, data) => ({ ...state, loginRequested: data })

const set_user_request = (state, data) => ({ ...state, loading: true })

const set_user_error = (state, data) => ({ ...state, loading: false, error: normalizeError(data) })

const new_m2_success = state => ({ ...state, isCreatedInM2: true })

const new_auth0_success = state => ({ ...state, isCreatedInAuth0: true })
