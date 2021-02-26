import React, { useState } from 'react'

export const Context = React.createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [productos, setProductos] = useState({
    items:[],
    isLoading: true
  })

  const value = {
    isAuth,
    setIsAuth,
    productos,
    setProductos,
    activeAuth: token => {
      setIsAuth(true)
      window.sessionStorage.setItem('token', token)
    },
    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
    },
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Context,
  Provider,
  Consumer: Context.Consumer,
}
