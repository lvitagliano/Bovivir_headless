import React, { useState } from 'react'
import { useRouter } from 'next/router'

export const Context = React.createContext()

const Provider = ({ children, initState }) => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const [productos, setProductos] = useState({
    items: [],
    isLoading: true,
  })

  const [open, setOpenCondition] = useState(false)
  const [modal, setModal] = useState(false)
  const [attributesMetadata, setAttributesMetadata] = useState([])

  const value = {
    ...initState,
    isAuth,
    setIsAuth,
    open,
    setOpen: condition => {
      if (router.pathname === '/m2/[stepId]') {
        setOpenCondition(false)
      } else {
        setOpenCondition(condition)
      }
    },
    attributesMetadata,
    setAttributesMetadata,
    modal,
    setModal,
    productos,
    setProductos,
    handleClickClose: () => {
      setOpenCondition(false)
    },
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
