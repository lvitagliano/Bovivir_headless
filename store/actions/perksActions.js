import { getAllPerksClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const getAllPerks = () => {
  return dispatch => {
    dispatch(getAllPerksStart())

    getAllPerksClient().then(
      res => {
        const payload = res?.data?.data?.perks?.nodes
        dispatch(getAllPerksSuccess(payload))
      },
      error => {
        dispatch(getAllPerksFail(error))
      }
    )
  }
}

const getAllPerksStart = () => {
  return {
    type: types.GET_ALL_PERKS_START,
  }
}

const getAllPerksSuccess = payload => {
  return {
    type: types.GET_ALL_PERKS_SUCCESS,
    payload,
  }
}

const getAllPerksFail = error => {
  return {
    type: types.GET_ALL_PERKS_FAIL,
    error,
  }
}

export { getAllPerks }
