import React, { useState, useCallback, useContext, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import Search from './search/Search'
import { Container } from '@material-ui/core'
import Menu from 'react-storefront/menu/Menu'
import MenuButton from 'react-storefront/menu/MenuButton'
import LoginIcon from './Login/LoginIcon'
import { useDispatch, useSelector } from 'react-redux'
import { createEmptyGuestCart } from '../store/actions/m2Action'
import ScTheme from '../Styles/themes/main'
import Link from 'next/link'
import { Context } from '../services/Client/context/Context'
import CartPopper from '../components/CartPopper'
import { getCustomAttributes } from '../services/Client/GraphQl/m2GQL'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'
import { updateCustomerEmailAuth0Client } from '../services/Client/auth0api'
import ChangePasswordTooWeak from './Login/changePasswordTooWeak'

const useStyles = makeStyles(theme => ({
  title: {},
  badge: {
    color: 'grey',
  },

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
    '& > *': {
      margin: '8px 6px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 1,
    },
  },
}))

export default function Header({ menu, persistState, ...props }) {
  const classes = useStyles()
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])
  const cart = useSelector(state => state.m2.cart)
  const { isLogedInM2, auth0DataLogIn } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const { handleClickClose } = useContext(Context)

  useEffect(() => {
    if (!isLogedInM2 && !persistState?.m2?.cart?.id) dispatch(createEmptyGuestCart())
  }, [persistState, isLogedInM2])

  useEffect(() => {}, [menu])

  const handleClick = () => {
    handleClickClose()
    setMenuOpen(menuOpen => !menuOpen)
  }

  return (
    <>
      <AppBar variant="fixed">
        <Container maxWidth="lg" className={classes.container}>
          {isDesktop ? (
            <>
              <Link href="/">
                <a onClick={() => handleClickClose()}>
                  <img
                    src="./images/logo_bonvivir.svg"
                    alt="logo"
                    style={{ width: 120, height: 48 }}
                  />
                </a>
              </Link>
              <Search />
            </>
          ) : (
            <>
              <Search />
              <Link href="/">
                <a onClick={() => handleClickClose()}>
                  <img
                    src="./images/logo_bonvivir.svg"
                    alt="logo"
                    style={{ width: 120, height: 48 }}
                  />
                </a>
              </Link>
            </>
          )}
          <CartPopper persistState={persistState} />
          <LoginIcon handleClickClose={handleClickClose} />
          <ChangePasswordTooWeak />
          <MenuButton open={menuOpen} onClick={() => handleClick()} />
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
