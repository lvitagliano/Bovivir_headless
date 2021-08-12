import React, { useEffect } from 'react'
import {
  BannerContainer,
  InfoContainer,
  ListUl,
  ListItem,
  Title,
  ButtonContainer,
  ImageContainer,
  CircleNumber,
  SubTitle1,
} from './style'
import { SubTitle, Title2, Text1 } from '../../../Home/utils/commonStyles'
import Button from '../../../Commons/Button'
import { AUTOGESTION_SELECTION } from '../../../../constants/menu'
import device from '../../../../Styles/device'

const LoQueRecibis = ({ left, bannerinfo, ...props }) => {
  return (
    <BannerContainer height="56em" position={bannerinfo.position} size="initial" left={left}>
      <ImageContainer image={bannerinfo.image?.sourceUrl || `/${bannerinfo.image}`} />
      <InfoContainer infoHeight={bannerinfo.infoHeight}>
        <SubTitle color={left ? '#333' : '#fff'}>
          {bannerinfo.title || bannerinfo.titleBannerselectioninfo}
        </SubTitle>
        <Title
          text={bannerinfo?.subtitle || bannerinfo.subtitleBannerselectioninfo}
          color={left ? '#333' : '#fff'}
          style={{ fontSize: '3em' }}
        />
        <SubTitle1 color={left ? '#333' : '#fff'} width="90%" style={{ textAlign: 'center' }}>
          {bannerinfo.text || bannerinfo.textBannerselectioninfo}
        </SubTitle1>
        <ListUl>
          <ListItem color={left && '#333'}>
            <CircleNumber>1</CircleNumber>
            <p>Selección de vinos del mes</p>
          </ListItem>
          <ListItem color={left && '#333'}>
            <CircleNumber>2</CircleNumber>
            <p>Ficha técnica de cada vino y nota de cata</p>
          </ListItem>
          <ListItem color={left && '#333'}>
            <CircleNumber>3</CircleNumber>
            <p>Caja 100% Recicleble</p>
            <img
              src="/images/reciclajeIcon.png"
              style={{ width: '25px', height: '25px', margin: '0 0 0 10px' }}
            />
          </ListItem>
        </ListUl>
        <ButtonContainer>
          {bannerinfo.button1Bannerselectioninfo ? (
            <a href="https://www.bonvivir.com/club/" style={{ textDecoration: 'none' }}>
              <Button text={bannerinfo.button1Bannerselectioninfo.textButton1Bannerselectioninfo} />
            </a>
          ) : null}
          {bannerinfo.button1 ? (
            <a
              href={AUTOGESTION_SELECTION}
              style={{ textDecoration: 'none', width: '100%', marginRight: '15px' }}
            >
              <Button text="Asociate hoy" style={{ width: '100%' }} />
            </a>
          ) : null}
          {bannerinfo.button2 ? (
            <a href="https://tienda.bonvivir.com/" style={{ textDecoration: 'none' }}>
              <Button text="explorá la tienda" style={{ marginTop: '10px' }} />
            </a>
          ) : null}
        </ButtonContainer>
      </InfoContainer>
    </BannerContainer>
  )
}

export default LoQueRecibis
