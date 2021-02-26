import * as types from '../actionTypes'
import axios from 'axios'
import {BASE_URL, SELECTIONS} from '../../constants/url'

export const setStep = (data) => async dispatch => {
    dispatch({
        type: types.SET_STEP,
        payload: data
    })
}