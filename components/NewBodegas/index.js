import React from 'react'
import {
  Container,
  ContainerContent,
  ContainerBodegas,
  BodegasParragraph,
  BodegasLogo,
  BodegasLogoContainer,
} from './styles'
import Button from '../Commons/Button'

const bodegas = [
  {
    title: 'Bodega Budeguer',
    src: '/images/budeguer.png',
    alt: ' ',
    id: 'bodega budeguer',
    backgroundBodega: '/images/budeguerBackgroundPreview.png',
  },
  {
    title: 'Lorenzo de Agrelo',
    src: '/images/lorenzoDeAgrelo.png',
    alt: ' ',
    id: 'lorenzo de agrelo',
    backgroundBodega: '/images/lorenzoBackgroundPreview.png',
  },
  {
    title: 'Lui wines',
    src: '/images/luiWidnes.png',
    alt: ' ',
    id: 'lui wines',
    backgroundBodega: '/images/LuiBackgroundPreview.png',
  },
  {
    title: 'Concha y toro',
    src: '/images/conchaYtoro.png',
    alt: ' ',
    id: 'concha y toro',
    backgroundBodega: '/images/conchaYToroBackgroundPreview.png',
  },
  {
    title: 'Puramun wines',
    src: '/images/puramun.png',
    alt: ' ',
    id: 'puramun',
    backgroundBodega: '/images/puramunBackgroundPreview.png',
  },
  {
    title: 'Vinos de Potrero',
    src: '/images/vinosDePotrero.png',
    alt: ' ',
    id: 'vinos de potrero',
    backgroundBodega: '/images/vinosBackgroundPreview.png',
  },
  {
    title: 'Bodega Budeguer',
    src: '/images/budeguer.png',
    alt: ' ',
    id: 'bodega budeguer repeat',
    backgroundBodega: '/images/budeguerBackgroundPreview.png',
  },
  {
    title: 'Lorenzo de Agrelo',
    src: '/images/lorenzoDeAgrelo.png',
    alt: ' ',
    id: 'lorenzo de agrelo repeat',
    backgroundBodega: '/images/lorenzoBackgroundPreview.png',
  },
  {
    title: 'Lui wines',
    src: '/images/luiWidnes.png',
    alt: ' ',
    id: 'lui wines repeat',
    backgroundBodega: '/images/LuiBackgroundPreview.png',
  },
]
const Bodegas = () => {
  return (
    <>
      <Container>
        <h1>Bodegas</h1>

        <ContainerContent>
          {bodegas.map(bodega => (
            <ContainerBodegas key={bodega.id} backgroundImage={bodega.backgroundBodega}>
              <BodegasLogoContainer>
                <BodegasLogo src={bodega.src} alt={bodega.alt} />
              </BodegasLogoContainer>
              <BodegasParragraph>{bodega.title}</BodegasParragraph>
            </ContainerBodegas>
          ))}
        </ContainerContent>

        <Button text="Ver mas bodegas" />
      </Container>
    </>
  )
}

export default Bodegas
