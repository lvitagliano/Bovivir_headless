import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../store/actions/userAction'
import { MenuProfile, ItemProfile, DetailProfile } from './styles'
import { Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'
import PersonalData from './personalData'
import BoughtList from './boughtList'
import WishList from './wishList'
import AddressBook from './addressBook'
import { TitleContent } from './styles'
import { Context } from '../../services/Client/context/Context'

const useStyles = makeStyles(theme => ({
  Container: {
    backgroundColor: '#F7F7F7',
    minHeight: '100vh',
    padding: '2em 6em',
    [theme.breakpoints.down('sm')]: {
      padding: '2em 0',
      display: 'flex',
      flexDirection: 'column',

    },
  },
  subContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',

    },
  },
}))

export default function Profile({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp
  const { firstname, lastname } = useSelector(store => store.m2.customerData)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const [detail, setDetail] = useState(0)

  const detailSelected = detail => {
    switch (detail) {
      case 0:
        return <BoughtList title="MIS COMPRAS" />
        break
      case 1:
        return <PersonalData title="MIS DATOS" />
        break
      case 2:
        return <WishList title="MIS FAVORITOS" />
        break
      case 3:
        return <AddressBook title="MIS DIRECCIONES" />
        break
      default:
        return <BoughtList title="MIS COMPRAS" />
    }
  }

  const { modal, setModal } = useContext(Context)

  const handleLogOut = () => {
    dispatch(logOut()).then(router.replace(`/`, `/`))
  }

  useEffect(() => {
    if (!isLogedInM2 && !isLogedInAuth0) {
      setModal(true)
      router.replace(`/`)
    }
  }, [isLogedInM2, isLogedInAuth0])

  return (
    <>
      {!isLogedInM2 && !isLogedInAuth0 ? (
        <></>
      ) : (
        <Container className={classes.Container}>
          <TitleContent>
            <h3 style={{ margin: '0', color: '#353537', paddingLeft: !isDesktop && '1rem' }}>
              Hola {firstname} {lastname}!
            </h3>
          </TitleContent>

          <div className={classes.subContainer}>
            <MenuProfile>
              <ItemProfile onClick={() => setDetail(0)}>MIS COMPRAS</ItemProfile>
              <ItemProfile onClick={() => setDetail(1)}>MIS DATOS</ItemProfile>
              <ItemProfile onClick={() => setDetail(2)}>MIS FAVORITOS</ItemProfile>
              <ItemProfile onClick={() => setDetail(3)}>MIS DIRECCIONES</ItemProfile>
              <ItemProfile onClick={handleLogOut}>CERRAR SESIÓN</ItemProfile>
            </MenuProfile>

            <DetailProfile>{detailSelected(detail, setDetail)}</DetailProfile>
          </div>
        </Container>
      )}
    </>
  )
}
