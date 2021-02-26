import {combineReducers} from 'redux';
import { offersReducer } from './offersReducer';
import { registerReducer } from './registerReducer';
import { wordpressReducer } from './wordpressReducer';
import { m2Reducer } from './m2Reducer';
import {userReducer} from './userReducer';

export default combineReducers({
    offers: offersReducer,
    register: registerReducer,
    wordpress: wordpressReducer,
    m2: m2Reducer,
    user: userReducer
})
