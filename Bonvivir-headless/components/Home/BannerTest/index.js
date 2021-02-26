import React from 'react'
import { BannerContainer } from './style'
import Button from '../../Commons/Button'
import { Title2, Text2 } from '../utils/commonStyles'

const BannerTest = ({ data }) => {
  return (
    <BannerContainer image={data.imagetest.sourceUrl}>
      <div style={{ textAlign: 'center' }}>
        <Title2 text={data.titletest}></Title2>
      </div>
      <Text2 color="#fff">{data.descriptiontest}</Text2>
      <Button text={data.buttontest.buttontexttest} />
    </BannerContainer>
  )
}

export default BannerTest
