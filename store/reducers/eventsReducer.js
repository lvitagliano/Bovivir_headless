import * as types from '../actionTypes'

const initialState = {
    allEvents: {
        events: [],
        loading: false,
        error: null,
        loaded: false
    }
}

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_EVENTS_START:
      return {
        ...state,
        allEvents: {
            ...state.allEvents,
            loading: true,

        }
      }
    case types.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: {
            ...state.allEvents,
            events: action.payload,
            loading: false,

        }
      }
    case types.GET_ALL_EVENTS_FAIL:
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          error: action.error,
          loading: false,
        },
      }

    default:
      return state
  }
}
