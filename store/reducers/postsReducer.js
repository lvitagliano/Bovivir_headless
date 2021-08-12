import * as types from '../actionTypes'

const initialState = {
  allPosts: {
    posts: [],
    loading: false,
    error: null,
    loaded: false,
  },
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_START:
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          loading: true,
        },
      }
    case types.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          posts: action.payload,
          loading: false,
        },
      }
    case types.GET_ALL_POSTS_FAIL:
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          error: action.error,
          loading: false,
        },
      }

    default:
      return state
  }
}
