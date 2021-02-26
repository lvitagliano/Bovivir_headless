import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { useMemo } from 'react'
import rootReducer from './reducers'
import { saveToCookie } from './persistedState'

let store
const middleware = [thunk]

function initStore(preloadedState = initialState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
}

export const initializeStore = preloadedState => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store

  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])

  store.subscribe(() =>
    saveToCookie(store.getState(), {
      m2: ['customerData', 'step1', 'step2', 'step3', 'step4'],
      user: true,
    })
  )

  return store
}
