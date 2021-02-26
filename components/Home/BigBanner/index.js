import React, { useEffect } from 'react'
import {
  BigBannerContainer,
  ImageContainer,
  InfoContainer,
  ListUl,
  ListItem,
  CustomCheck,
  Linea,
  ButtonContainer,
} from './style'
import { SubTitle, Title2, Text1 } from '../utils/commonStyles'
import Button from '../../Commons/Button'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const BigBanner = ({ bannerinfo, ...props }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <BigBannerContainer>
      <ImageContainer image={bannerinfo.imageBigbanner.sourceUrl} />
      <InfoContainer infoHeight={'50em'}>
        <SubTitle color={isDesktop ? '#fff' : '#762057'}>{bannerinfo.titleBigbanner}</SubTitle>
        <Title2 text={bannerinfo.subtitleBigbanner} color={isDesktop ? '#fff' : '#333'} />
        <Text1 color={isDesktop ? '#fff' : '#333'}>{bannerinfo.textBigbanner}</Text1>
        <Linea />
        <SubTitle color={isDesktop ? '#fff' : '#333'}>{bannerinfo.title2Bigbanner}</SubTitle>
        {bannerinfo.listitemBigbanner ? (
          <ListUl>
            {bannerinfo.listitemBigbanner.map((item, i) => (
              <ListItem key={i}>
                <CustomCheck />
                {item.cf_home_bigBanner_listItem.listitem}
              </ListItem>
            ))}
          </ListUl>
        ) : null}
        <ButtonContainer>
          {bannerinfo.button1Bigbanner ? (
            <Button text={bannerinfo.button1Bigbanner.textButton1Bigbanner} />
          ) : null}
          {bannerinfo.button2Bigbanner ? (
            <Button text={bannerinfo.button2Bigbanner.textButton2Bigbanner} />
          ) : null}
        </ButtonContainer>
      </InfoContainer>
    </BigBannerContainer>
  )
}

export default BigBanner
