import React from 'react'
import Contact from '../components/Contact'
import { getContactPageClient } from '../services/Client/GraphQl/wp/GQLAPI'
import Container from '@material-ui/core/Container'
import PorQueAsociarmeCB from '../components/Banners/PorQueAsociarmeCB'

export default function Contacto(props) {
  const { contact } = props
  return (
    <>
      <Container>
        <Contact data={contact} />
      </Container>
      <PorQueAsociarmeCB small hiddenTitle showQuieroAsociarmeButton animate />
    </>
  )
}

Contacto.getInitialProps = async context => {
  return {
    contact: await getContactPageClient(),
  }
}
