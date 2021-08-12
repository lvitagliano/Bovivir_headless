import { getAllPostsClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const getAllPosts = () => {
  return dispatch => {
    dispatch(getAllPostsStart())

    getAllPostsClient().then(
      res => {
        const payload = res?.data?.data?.posts?.nodes
        dispatch(getAllPostsSuccess(payload || []))
      },
      error => {
        dispatch(getAllPostsFail(error))
      }
    )
  }
}

const getAllPostsStart = () => {
  return {
    type: types.GET_ALL_POSTS_START,
  }
}

const getAllPostsSuccess = payload => {
  return {
    type: types.GET_ALL_POSTS_SUCCESS,
    payload,
  }
}

const getAllPostsFail = error => {
  return {
    type: types.GET_ALL_POSTS_FAIL,
    error,
  }
}

export { getAllPosts }
