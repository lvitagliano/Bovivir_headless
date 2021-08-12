import React from 'react'
import {
    Container,
    ImgStyle,
    ContainerContent,
    ImageCoup,
    ImgSeleccion
} from './style'
import { Title2, Text2, SubTitle } from '../Home/utils/commonStyles'
import Button from '../Commons/Button'

const SeleccionDeVinos = () => {
    return(
        <Container flexDirection='row' style={{backgroundColor: '#ecebe1'}}>
            {/* Este es un video */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <ImgSeleccion src='images/selecciondevinos.png' alt=''/>
                <SubTitle color='#7b4866' style={{marginTop: '10px'}}>¿Como es la cata a ciegas?</SubTitle>
            </div>
            
            <ContainerContent>
                <Title2 color='#000' text='Selección de vinos'/>
                <Text2 color="#90918f">Todos los meses nuestro equipo de sommeliers realiza mediante catas a ciegas una seleccion de vinos para cada una de nuestras lineas, contemplando a todas las bodegas que deseen paricipar, varietales y regiones de Argentina.</Text2>
                <Button text='ver selecciones' />
            </ContainerContent>

            <ImageCoup src="./images/coupBackground.png"/>
          
        </Container>
    )
}

export default SeleccionDeVinos