import React, { useEffect } from 'react'
import {
  BannerContainer,
  InfoContainer,
  ListUl,
  ListItem,
  CustomCheck,
  Linea,
  ButtonContainer,
} from './style'
import { SubTitle, Title2, Text1 } from '../../Home/utils/commonStyles'
import Button from '../../Commons/Button'

const Banner = ({ left, top, bannerinfo, leftMobile, ...props }) => {
  return (
    <BannerContainer
      image={bannerinfo.image?.sourceUrl || `/${bannerinfo.image}`}
      height={bannerinfo.height}
      position={bannerinfo.position}
      size="initial"
      left={left}
      top={top}
      leftMobile={leftMobile}
    >
      <InfoContainer position={bannerinfo.position} infoHeight={bannerinfo.infoHeight}>
        <SubTitle color={left ? '#333' : '#fff'}>
          {bannerinfo.title || bannerinfo.titleBannerselectioninfo}
        </SubTitle>
        <Title2
          text={bannerinfo?.subtitle || bannerinfo.subtitleBannerselectioninfo}
          color={left ? '#333' : '#fff'}
        />
        <Text1 color={left ? '#333' : '#fff'} width="90%">
          {bannerinfo.text || bannerinfo.textBannerselectioninfo}
        </Text1>
        {/* {bannerinfo.linea === undefined || bannerinfo.linea === true ? <Linea /> : null} */}
        {/* <SubTitle color={left ? '#333' : '#fff'}>{bannerinfo.title2}</SubTitle> */}
        {bannerinfo.listitem ? (
          <ListUl>
            {/* {bannerinfo.listitem.map((item, i) => (
              <ListItem key={i}>
                <CustomCheck />
                {item.cf_Home_carrousel_banners_listItem.text}
              </ListItem>
            ))} */}
          </ListUl>
        ) : null}
        <ButtonContainer>
          {bannerinfo.button1Bannerselectioninfo ? (
            <a href="/club/queeselclub" style={{ textDecoration: 'none' }}>
              <Button text={bannerinfo.button1Bannerselectioninfo.textButton1Bannerselectioninfo} />
            </a>
          ) : null}
          {bannerinfo.button1 ? (
            <a href="/club/queeselclub" style={{ textDecoration: 'none' }}>
              <Button text="unite al club" />
            </a>
          ) : null}
          {bannerinfo.button2 ? (
            <a href="/tienda/vinos" style={{ textDecoration: 'none' }}>
              <Button text="explorá la tienda" />
            </a>
          ) : null}
        </ButtonContainer>
      </InfoContainer>
    </BannerContainer>
  )
}

export default Banner
