import Cookies from 'js-cookie'
import { setState } from '../services/Client/redisApi'

export const saveToCookie = async (state, whitelist) => {
  try {
    if (typeof window !== 'undefined') {
      const stringifiedUser = JSON.stringify(state.user)
      Cookies.set('user', stringifiedUser)

      if (state.m2?.cart?.id || state.user?.m2DataLogIn) {
        await setState(state)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const loadFromCookie = () => {
  try {
    if (typeof window === 'undefined') return {}

    let persistedState = Cookies.getJSON('persistedState')
    const user = Cookies.getJSON('user')
    persistedState = { ...persistedState, user }
    return persistedState
  } catch (e) {
    console.log(e)
    return {}
  }
}
