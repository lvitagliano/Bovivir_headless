import * as types from '../actionTypes'

const initialState = {
  allPerks: {
    perks: [],
    loading: false,
    error: null,
    loaded: false,
  },
}

export const perksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PERKS_START:
      return {
        ...state,
        allPerks: {
          ...state.allPerks,
          loading: true,
        },
      }
    case types.GET_ALL_PERKS_SUCCESS:
      return {
        ...state,
        allPerks: {
          ...state.allPerks,
          perks: action.payload,
          loading: false,
        },
      }
    case types.GET_ALL_PERKS_FAIL:
      return {
        ...state,
        allPerks: {
          ...state.allPerks,
          error: action.error,
          loading: false,
        },
      }

    default:
      return state
  }
}
