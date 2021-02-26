import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import { Container } from '@material-ui/core'
import Popper from '@material-ui/core/Popper'
import Menu from 'react-storefront/menu/Menu'
import MenuButton from 'react-storefront/menu/MenuButton'
import Link from 'react-storefront/link/Link'
import LoginIcon from './Login/LoginIcon'
import { useDispatch, useSelector } from 'react-redux'
import { createEmptyGuestCart } from '../store/actions/m2Action'
import ScTheme from '../Styles/themes/main'
import PopubShoppingcart from './PopubShoppingcart/PopubShoppingcart'

const useStyles = makeStyles(theme => ({
  title: {},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('xs')]: {
      left: '50%',
      top: 6,
      marginLeft: -60,
    },
  },
  menu: {
    '& .MuiPaper-root': {
      marginTop: '65px',
      '& .MuiTypography-root div': {
        color: `${ScTheme.colors.secondary}`,
      },
    },
  },
  toolbar: {
    padding: 0,
    margin: 0,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
  popperStyle: {
    zIndex: '10',
    background: '#fff',
    width: '30%',
    margin: '10px 30px 0 0',
    outline: '1px solid #cacaca',
  },
}))

export default function Header({ menu, persistState, ...props }) {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])
  const handleMenuButtonClick = useCallback(() => setMenuOpen(menuOpen => !menuOpen), [])
  const cart = useSelector(state => state.m2.cart)
  const [itemCount, setItemCount] = useState(0)
  const { isLogedInM2 } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)
  const id = open ? 'shopping-cart' : undefined

  useEffect(() => {
    setItemCount(persistState?.m2?.cart?.items.lenght || cart.items.length)
  }, [cart])

  useEffect(() => {
    if (!isLogedInM2 && !persistState?.m2?.cart?.id) dispatch(createEmptyGuestCart())
  }, [persistState, isLogedInM2])

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <>
      <AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Link href="/">
            <a>
              <img src="./images/logo_bonvivir.svg" alt="logo" style={{ width: 120, height: 48 }} />
            </a>
          </Link>
          <Search />
          <span onClick={handleClick}><CartButton href=" " quantity={itemCount ? `${itemCount}` : null}  aria-describedby={id}/></span>
          <Popper id={id} open={open} anchorEl={anchorEl} className={classes.popperStyle} >
              <PopubShoppingcart/>
          </Popper>
          <LoginIcon />
          <MenuButton open={menuOpen} onClick={handleMenuButtonClick} />
        </Container>
      </AppBar>
      <Menu
        className={classes.menu}
        anchor="right"
        root={menu}
        open={menuOpen}
        onClose={handleMenuClose}
      />
    </>
  )
}
