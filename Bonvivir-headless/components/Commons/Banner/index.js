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

const Banner = ({ left, bannerinfo, ...props }) => {
  return (
    <BannerContainer
      image={bannerinfo.image?.sourceUrl || `/${bannerinfo.image}`}
      height={bannerinfo.height}
      position={bannerinfo.position}
      size
      left={left}
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
        <SubTitle color={left ? '#333' : '#fff'}>{bannerinfo.title2}</SubTitle>
        {bannerinfo.listitem ? (
          <ListUl>
            {bannerinfo.listitem.map((item, i) => (
              <ListItem key={i}>
                <CustomCheck />
                {item.cf_Home_carrousel_banners_listItem.text}
              </ListItem>
            ))}
          </ListUl>
        ) : null}
        <ButtonContainer>
          {bannerinfo.button1Bannerselectioninfo ? (
            <Button text={bannerinfo.button1Bannerselectioninfo.textButton1Bannerselectioninfo} />
          ) : null}
          {bannerinfo.button1 ? <Button text={bannerinfo.button1.text} /> : null}
          {bannerinfo.button2 ? <Button text={bannerinfo.button2.text} /> : null}
        </ButtonContainer>
      </InfoContainer>
    </BannerContainer>
  )
}

export default Banner
