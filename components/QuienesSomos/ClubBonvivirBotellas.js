import React from 'react'
import {
    Container,
    ContainerContent,
    ImgBotellas
} from './style'
import { SubTitle, Title5, Text2 } from '../Home/utils/commonStyles'

const ClubBonvivirBotellas = () => {
    return(
        <Container flexDirection='row-reverse' style={{backgroundColor: '#ecebe1'}}>
            <ImgBotellas src='images/llegamosatodoelpais.png' alt=''/>
            <ContainerContent>
                <SubTitle color='#7b4866'>Llegamos a todo el pais</SubTitle>
                <Title5 color='#000'>1.200.000 Botellas</Title5>
                <Text2 color="#90918f">Anualmente distribuimos más de un millón doscientas mil botellas en todo el país, lo que nos convierte relevantes para el mundo del vino nacional tanto para grandes bodegas como para la mas pequeñas.</Text2>
            </ContainerContent>
        </Container>
    )
}

export default ClubBonvivirBotellas