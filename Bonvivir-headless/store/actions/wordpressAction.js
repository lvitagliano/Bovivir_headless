import * as types from '../actionTypes'

export const setWordPressURL = (url) => async dispatch => {
    dispatch({
        type: types.SET_WORDPRESS_URI,
        payload: url
    })
}