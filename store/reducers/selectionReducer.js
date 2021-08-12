import * as types from '../actionTypes'

const initialState = {
  allSelections: {
    selections: [],
    loading: false,
    error: null,
    loaded: false,
  },
}

export const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_SELECTIONS_START:
      return {
        ...state,
        allSelections: {
          ...state.allSelections,
          loading: true,
        },
      }
    case types.GET_ALL_SELECTIONS_SUCCESS:
      return {
        ...state,
        allSelections: {
          ...state.allSelections,
          selections: action.payload,
          loading: false,
        },
      }
    case types.GET_ALL_SELECTIONS_FAIL:
      return {
        ...state,
        allSelections: {
          ...state.allSelections,
          error: action.error,
          loading: false,
        },
      }

    default:
      return state
  }
}
