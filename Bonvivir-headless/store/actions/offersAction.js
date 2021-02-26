import * as types from '../actionTypes'
import axios from 'axios'
import {BASE_URL, SELECTIONS} from '../../constants/url'

export const getAllOffers = () => async dispatch => {
    try{
        const res = await axios.get(BASE_URL + SELECTIONS);
        //aca va el fetch o axios
        dispatch({
            type: types.GET_ALL_OFFERS,
            payload: res.data
        })
    }
    catch(e){
        console.log(e);
    }
}