import * as types from '../actionTypes';

const initialState = {
    offers: [],
    offer:{},
    loading:true,
    error:null
}

export const offersReducer = (state=initialState,action) => {
    switch (action.type) {
        case types.GET_ALL_OFFERS:
            return {
                ...state,
                offers: action.payload,
                loading:false,
                error:null
            }
        default:
            return state
    }
}