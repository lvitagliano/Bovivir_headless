import { getAllEventsClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const getAllEvents = () => {
  return (dispatch) => {
    dispatch(getAllEventsStart())
    
    getAllEventsClient().then(
      res => {
        const payload = res?.data?.data?.events?.nodes        
        dispatch(getAllEventsSuccess(payload))
      },
      error => {
        dispatch(getAllEventsFail(error))
      }
    )
  }
}

const getAllEventsStart = () => {
    return {
        type: types.GET_ALL_EVENTS_START
    }
}

const getAllEventsSuccess = (payload) => {
    return {
        type: types.GET_ALL_EVENTS_SUCCESS,
        payload
    }
}

const getAllEventsFail = (error) => {
    return {
      type: types.GET_ALL_EVENTS_FAIL,
      error,
    }
}

export { getAllEvents }
