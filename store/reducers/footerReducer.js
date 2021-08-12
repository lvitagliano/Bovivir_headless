import * as types from '../actionTypes'

const initialState = {
    socialMedia: [],
}

export const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SOCIAL_MEDIA:
      return {
        ...state,
        socialMedia: action.payload
      }
       default:
        return state
    }
}



