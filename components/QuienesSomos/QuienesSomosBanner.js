import React from 'react'
import {
    ImgStyle,
    ContainerContent,
    ContainerFlex,
    ImageBottom,
    QuienesSomosContainer,
    ImgQuienesSomos
} from './style'
import { SubTitle, Title2, Text2 } from '../Home/utils/commonStyles'

const BannerQuienesSomos = () => {
    return(
        <QuienesSomosContainer flexDirection='column' >
            <ContainerFlex>
                <ImgQuienesSomos src='images/quienessomos.png' alt=' '/>
                <ContainerContent>
                    <SubTitle color='#fff'>Quienes somos</SubTitle>
                    <Title2 color='#fff' text='El club de vinos con mayor cantidad de socios del pais'/>
                    <Text2 color='#fff'>Nuestra propuesta tambien incluye una tienda online donde cualquier persona puede adquirir los vinos del mercado.</Text2>
                    <ImgStyle src='images/quienessomos-icon.png' alt=' ' margin='0 40px 0 0' width='em' height='5em'/>
                </ContainerContent>
            </ContainerFlex>
            
            <ImageBottom src='./images/backgroundCurve.png' alt=""/>
        </QuienesSomosContainer>
    )
}

export default BannerQuienesSomos