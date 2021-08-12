import React from 'react'
import TermsAndConditions from '../components/TermsAndCond'
import { getTermsAndConditionsPageClient } from '../services/Client/GraphQl/wp/GQLAPI'
import Container from '@material-ui/core/Container'
import PorQueAsociarmeCB from '../components/Banners/PorQueAsociarmeCB'

export default function TerminosYCondiciones(props) {
  const { termsAndConditions } = props
  return (
    <>
      <Container>
        <TermsAndConditions data={termsAndConditions} />
      </Container>
      <PorQueAsociarmeCB small hiddenTitle showQuieroAsociarmeButton animate />
    </>
  )
}

TerminosYCondiciones.getInitialProps = async context => {
  return {
    termsAndConditions: await getTermsAndConditionsPageClient(),
  }
}
