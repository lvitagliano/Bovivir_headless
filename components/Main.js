import React, { useContext } from 'react'
import { Context } from '../services/Client/context/Context'

export default function Main({ children }) {
  const { handleClickClose, open, setOpen } = useContext(Context)
  
  const handleClick = () => {
    if(open){
      handleClickClose()
    }
  }

  return (
    <div onClick={handleClick}>
     {children}
    </div>
  )
}
