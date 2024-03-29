import React, { useState } from 'react'
import Displayer from '../../Commons/Displayer'
import Banner from '../../Commons/Banner'
import { Container, ContainerDisplayer } from './styles'
import { ContainerLgCustom } from '../../Commons/ContainerLg'

const BannerSelection = ({ bannerinfo, selecciones, ...props }) => {
  return (
    <Container image={bannerinfo.imageBannerselection.sourceUrl}>
      <ContainerLgCustom alignItems="inital">
        <Banner
          style={{ width: '100%' }}
          bannerinfo={bannerinfo}
          left="10.1em"
          top="2rem"
          leftMobile="0"
        />
        <ContainerDisplayer>
          <Displayer arrows={true} amount={1}>
            {selecciones}
          </Displayer>
        </ContainerDisplayer>
      </ContainerLgCustom>
    </Container>
  )
}

export default BannerSelection
