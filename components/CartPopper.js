import React, { useContext, useState, useEffect, useRef } from 'react'
import { Context } from '../services/Client/context/Context'
import { makeStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import { useSelector } from 'react-redux'
import PopubShoppingcart from './PopubShoppingcart/PopubShoppingcart'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  colorBadge: {
    '& span.MuiBadge-badge': {
      backgroundColor: '#ab3881',
    },
  },
  popperStyle: {
    position: 'absoluta',
    zIndex: '999',
    background: '#fff',
    width: '39em',
    outline: '1px solid #cacaca',
    margin: '1.2rem 0 0 55%',
    [theme.breakpoints.down('xs')]: {
      margin: '1.2rem 0 0 0.5rem',
      width: '95%',
    },
  },
}))

export default function CartPopper({ persistState }) {
  const classes = useStyles()
  const {
    cart: { total_quantity },
  } = useSelector(state => state.m2)
  const { open, setOpen } = useContext(Context)

  useEffect(() => {}, [open])

  const handleClick = event => {
    setOpen(!open)
  }

  const circle = (
    <IconButton style={{ padding: 6 }} onClick={handleClick}>
      <ShoppingCartIcon style={{ fontSize: 28 }} />
    </IconButton>
  )

  const anchorEl = useRef(null)

  return (
    <div>
      <Badge
        className={classes.colorBadge}
        ref={anchorEl}
        overlap="circle"
        badgeContent={total_quantity}
      >
        {circle}
      </Badge>
      <Popper
        id="cart"
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-end"
        className={classes.popperStyle}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <PopubShoppingcart closePop={handleClick} />
          </Fade>
        )}
      </Popper>
    </div>
  )
}
