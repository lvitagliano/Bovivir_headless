import { create } from 'apisauce'

import apiConfig from './Client/config'

const VOID_FUNC = () => {}

const buildAuth = (authKey, setHeader) => () =>
  setHeader('Authorization', localStorage.getItem(authKey) || null)

const request = (auth, func, ...args) => {
  auth()

  return func(...args)
}

const buildApi = (authKey = 'token', config = apiConfig) => {
  const api = create(config)
  const { setHeader, get, delete: del, head, post, put, patch, link, unlink } = api
  const auth = authKey ? buildAuth(authKey, setHeader) : VOID_FUNC

  api.get = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, get, ...args)
  }

  api.delete = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, del, ...args)
  }

  api.head = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, head, ...args)
  }

  api.post = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, post, ...args)
  }

  api.put = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, put, ...args)
  }

  api.patch = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, patch, ...args)
  }

  api.link = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, link, ...args)
  }

  api.unlink = (...args) => {
    if (getCookie('token')) {
      setHeader('Authorization', `Bearer ${getCookie('token')}` || null)
    }

    return request(auth, unlink, ...args)
  }

  return api
}

function getCookie(cookieName) {
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookies = decodedCookie.split(';').map(c => c.trim())

  let cookie = cookies.find(c => c.startsWith(`${cookieName}=`))

  cookie = cookie ? cookie.replace(new RegExp(`${cookieName}=`), '') : null

  return cookie
}

export default buildApi
