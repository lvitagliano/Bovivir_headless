import React, { useState } from 'react'
import Displayer from '../../Commons/Displayer'
import Banner from '../../Commons/Banner'
import { Container, ContainerDisplayer } from './styles'

const BannerSelection = ({ bannerinfo, selecciones, ...props }) => {
  return (
    <Container image={bannerinfo.imageBannerselection.sourceUrl}>
      <Banner style={{ width: '100%' }} bannerinfo={bannerinfo} left="10em" />
      <ContainerDisplayer>
        <Displayer arrows={true} amount={1}>
          {selecciones}
        </Displayer>
      </ContainerDisplayer>
    </Container>
  )
}

export default BannerSelection
