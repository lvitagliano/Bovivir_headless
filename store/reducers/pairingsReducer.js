import * as types from '../actionTypes'

const initialState = {
  allPairings: {
    pairings: [],
    loading: false,
    error: null,
    loaded: false,
  },
}

export const pairingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PAIRINGS_START:
      return {
        ...state,
        allPairings: {
          ...state.allPairings,
          loading: true,
        },
      }
    case types.GET_ALL_PAIRINGS_SUCCESS:
      return {
        ...state,
        allPairings: {
          ...state.allPairings,
          pairings: action.payload,
          loading: false,
        },
      }
    case types.GET_ALL_PAIRINGS_FAIL:
      return {
        ...state,
        allPairings: {
          ...state.allPairings,
          error: action.error,
          loading: false,
        },
      }

    default:
      return state
  }
}
