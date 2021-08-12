import { BannerContainer, ItemsContainer, Item, Text, Title } from './style'
import { Title2, Text2 } from '../../../components/Home/utils/commonStyles'
import Button from '../../Commons/Button'
import { AUTOGESTION_SELECTION } from '../../../constants/menu'
import { useRef, useState } from 'react'
import useOnScreen from '../../utils/hooks/useOnScreen'

export default function PorQueAsociarmeCB(props) {
  const { hiddenTitle, small, animate, showQuieroAsociarmeButton } = props

  const ref = useRef()
  const isVisible = useOnScreen(ref)

  const data = {
    title: '¿por qué asociarme a club bonvivir?',
    subtitle: '',
    items: [
      {
        img: './images/porqueasociarmeVino.png',
        subtitle: 'Etiquetas Originales',
        text:
          'Vinos seleccionados por expertos sommeliers. Incluye fichas coleccionables con maridajes.',
      },
      {
        img: './images/porqueasociarmeTargetas.png',
        subtitle: 'Contenido Exclusivo',
        text: 'Ideal para aprender a disfrutar mejor la experiencia del vino.',
      },
      {
        img: './images/porqueasociarmeCopa.png',
        subtitle: 'Degustaciones y eventos',
        text:
          'Acceso a experiencias relacionadas al mundo del vino, pueden ser presenciales o virtuales.',
      },
      {
        img: './images/porqueasociarmeCucardas.png',
        subtitle: 'Descuentos Exclusivos',
        text:
          'Ofertas permanentes en nuestra tienda online para socios en vinos, cavas, accesorios y mas.',
      },
      {
        img: './images/porqueasociarmeCaja.png',
        subtitle: 'Envio sin cargo a todo el pais',
        text: 'Llega a tu casa cada mes una seleccion de vinos para sorprenderte.',
      },
    ],
  }

  return (
    <BannerContainer>
      {!hiddenTitle && (
        <Title2
          text={'¿por qué asociarme a club bonvivir?'}
          style={{ textAlign: 'center' }}
          color="#333"
        />
      )}
      {data.subtitle ? <Text2 alignment="center">{data.subtitle}</Text2> : null}
      <ItemsContainer ref={ref}>
        {data.items.map((item, i) => (
          <Item animation={animate} visible={isVisible} key={i} small={small}>
            <img src={`/${item.img}`} alt=" " />
            <Title small={small}>{item.subtitle.toUpperCase()}</Title>
            <Text small={small}>{item.text}</Text>
          </Item>
        ))}
      </ItemsContainer>
      {showQuieroAsociarmeButton && (
        <a
          href={AUTOGESTION_SELECTION}
          target="_blank"
          style={{ textDecoration: 'none', margin: '0 1em 0 0' }}
        >
          <Button text="Quiero Asociarme Al club" />
        </a>
      )}
    </BannerContainer>
  )
}
