import { getAllPairingsClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const getAllPairings = () => {
  return dispatch => {
    dispatch(getAllPairingsStart())

    getAllPairingsClient().then(
      res => {
        const payload = res?.data?.data?.pairings?.nodes
        dispatch(getAllPairingsSuccess(payload))
      },
      error => {
        dispatch(getAllPairingsFail(error))
      }
    )
  }
}

const getAllPairingsStart = () => {
  return {
    type: types.GET_ALL_PAIRINGS_START,
  }
}

const getAllPairingsSuccess = payload => {
  return {
    type: types.GET_ALL_PAIRINGS_SUCCESS,
    payload,
  }
}

const getAllPairingsFail = error => {
  return {
    type: types.GET_ALL_PAIRINGS_FAIL,
    error,
  }
}

export { getAllPairings }