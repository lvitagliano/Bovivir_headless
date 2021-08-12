import React, { useEffect } from 'react'
import {
  BannerContainer,
  BannerContainerContent,
  BannerContainerText,
  ButtonsContainer,
} from './style'
import { SubTitle, Title4, Text3 } from '../../../Home/utils/commonStyles'
import Button from '../../../Commons/Button'
import { AUTOGESTION_SELECTION, SUSCRIPTION } from '../../../../constants/menu'
const Banner = ({ left, bannerinfo, ...props }) => {
  return (
    <BannerContainer image={bannerinfo.image?.sourceUrl || `/${bannerinfo.image}`} height="40em">
      <BannerContainerContent>
        <Title4
          text={bannerinfo?.subtitle || bannerinfo.subtitleBannerselectioninfo}
          color={left ? '#333' : '#fff'}
        />
        <BannerContainerText>A partir de $2.365</BannerContainerText>
        <Text3 color={left ? '#333' : '#fff'} style={{ width: '50%', fontSize: '1.2em' }}>
          {bannerinfo.text || bannerinfo.textBannerselectioninfo}
        </Text3>
        <br />
        <ButtonsContainer style={{ display: 'flex' }}>
          <a href={AUTOGESTION_SELECTION} style={{ textDecoration: 'none', margin: '0 1em 0 0' }}>
            <Button text="ASOCIARME ONLINE" />
          </a>
          <a href={SUSCRIPTION} style={{ textDecoration: 'none' }}>
            <Button text="Quiero asesoramiento" />
          </a>
        </ButtonsContainer>
      </BannerContainerContent>
    </BannerContainer>
  )
}

export default Banner
