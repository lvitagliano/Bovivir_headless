import * as types from '../actionTypes';

const initialState = {
    wpRoot:"https://qa.bonvivir.com",
    wordpressUrl:"https://qa.bonvivir.com",
}

export const wordpressReducer = (state=initialState,action) => {
    switch (action.type) {
        case types.SET_WORDPRESS_URI:{
            return {
                ...state,
                wordpressUrl: `${state.wpRoot}/${action.payload}`,
            }
        }
        default:
            return state
    }
}