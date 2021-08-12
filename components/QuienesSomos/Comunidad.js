import React from 'react'

import {
    Container,
    ImgStyle,
    ContainerContent,
    ContainerComunidad,
    ImgComunidad,
    ImageBottom2
} from './style'
import { SubTitle, Title5, Text2 } from '../Home/utils/commonStyles'

const Comunidad = () => {
    return(
        <>
        <Container flexDirection='column' style={{backgroundColor: '#ecebe1', height: '45em', zIndex: '-200'}}>
             <ContainerComunidad>
                <ImgComunidad src='images/comunidad.png' alt=' '/>
                <ContainerContent>
                    <Title5 color='#000'>Comunidad</Title5>
                    <Text2 color="#90918f">Somos un equipo apasionado por el mundo del vino, y buscamos compartir con nuestra comunidad el GUSTO DE DESCUBRIR nuevas etiquetas mes a mes a través de experiencias únicas y exclusivas para los socios, con gran vocación de servicio</Text2>
                </ContainerContent>
             </ContainerComunidad>
            
            <ImageBottom2 src='./images/backgroundCurveButtom.png' alt=""/>
        </Container>
        </>
    )
}

export default Comunidad