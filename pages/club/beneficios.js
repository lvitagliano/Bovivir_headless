import React from 'react'
import Perks from '../../components/Perks'
import { getSelections } from '../../services/Client/GraphQl/wp/GQLAPI'

export default function Beneficios(props) {
  return <Perks selections={props.selections} />
}

Beneficios.getInitialProps = async context => {
  return {
    selections: await getSelections(),
  }
}
