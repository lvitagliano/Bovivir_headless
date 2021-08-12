import { combineReducers } from 'redux'
import { offersReducer } from './offersReducer'
import { registerReducer } from './registerReducer'
import { wordpressReducer } from './wordpressReducer'
import { m2Reducer } from './m2Reducer'
import { userReducer } from './userReducer'
import { eventsReducer } from './eventsReducer'
import { perksReducer } from './perksReducer'
import { pairingsReducer } from './pairingsReducer'
import { footerReducer } from './footerReducer'
import { selectionReducer } from './selectionReducer'
import { postsReducer } from './postsReducer'

export default combineReducers({
  offers: offersReducer,
  register: registerReducer,
  wordpress: wordpressReducer,
  m2: m2Reducer,
  user: userReducer,
  events: eventsReducer,
  perks: perksReducer,
  pairings: pairingsReducer,
  footer: footerReducer,
  selections: selectionReducer,
  posts: postsReducer,
})
