import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../store/actions/userAction'
import { MenuProfile, ItemProfile, DetailProfile } from './styles'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonalData from './personalData'
import BoughtList from './boughtList'
import WishList from './wishList'
import AddressBook from './addressBook'
import { TitleContent } from './styles'

const useStyles = makeStyles(theme => ({
  Container: {
    backgroundColor: '#F7F7F7',
    padding: '2em 6em',
  },
}))

export default function Profile({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { firstname, lastname, email } = useSelector(store => store.m2.customerData)
  const [detail, setDetail] = useState(0)

  const detailSelected = (detail, setDetail) => {
    switch (detail) {
      case 0:
        return <BoughtList title="MIS COMPRAS" />
        break
      case 1:
        return <PersonalData title="MIS DATOS" data={{ firstname, lastname, email }} />
        break
      case 2:
        return <WishList title="MIS FAVORITOS" />
        break
      case 3:
        return <AddressBook title="MIS DIRECCIONES" setDetail={setDetail} />
        break
      case 4:
        return <WishList title="MIS FAVORITOS" />
        break
      default:
        return <BoughtList title="MIS COMPRAS" />
    }
  }

  const handleLogOut = async () => {
    await dispatch(logOut())
    router.push(`/`, `/`, { shallow: true })
  }

  return (
    <Container className={classes.Container}>
      <TitleContent>
        <h3 style={{ margin: '0', color: '#353537' }}>
          Hola {firstname} {lastname}!
        </h3>
      </TitleContent>

      <div style={{ display: 'flex' }}>
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
  )
}
