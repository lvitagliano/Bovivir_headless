import { getSocialMedia } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const getAllSocialMedia = () => {
  return dispatch => {
    getSocialMedia().then(
      res => {
        const payload = res.data?.data?.menu?.menuItems?.nodes
        dispatch(getAllSMSuccess(payload))
      }
    )
  }
}


const getAllSMSuccess = payload => {
  return {
    type: types.GET_SOCIAL_MEDIA,
    payload,
  }
}

const getAllSMFail = error => {
  return {
    type: types.GET_SOCIAL_MEDIA,
    error,
  }
}

export { getAllSocialMedia }