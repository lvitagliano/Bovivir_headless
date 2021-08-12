import React, { useEffect, useState } from 'react'
import {
  BannerContainer,
  FlexContainer,
  FlexContainerChild,
  FlexContainerChildContent,
  TitleContent,
  ParagraphContent,
  ButtonContainer,
} from './style'
import { Title1, Text2 } from '../../../Home/utils/commonStyles'
import Button from '../../../Commons/Button'
import { AUTOGESTION_SELECTION } from '../../../../constants/menu'
import { Dialog } from '@material-ui/core'

export default function ComoFuncionaCB({ data, ...props }) {
  const [open, setOpen] = useState(false)

  return (
    <BannerContainer background={data.background}>
      <Title1 color="#333" style={{ inlineSize: 'max-content' }}>
        {data.title}
      </Title1>
      {/* {data.subtitle ? <Text2 alignment='center'>{data.subtitle}</Text2> : null } */}
      <FlexContainer>
        <FlexContainerChild>
          <img
            src="/images/icono_catamos.PNG"
            alt=""
            style={{ width: '83px', margin: '0 10px 0 0' }}
          />
          <FlexContainerChildContent>
            <TitleContent>Catamos</TitleContent>
            <ParagraphContent>y seleccionamos los mejores vinos para vos</ParagraphContent>
          </FlexContainerChildContent>
        </FlexContainerChild>
        <FlexContainerChild>
          <img src="/images/elegis.PNG" alt="" style={{ margin: '0 10px 0 0' }} />
          <FlexContainerChildContent>
            <TitleContent>Elegís</TitleContent>
            <ParagraphContent>la selección de vinos que más te guste</ParagraphContent>
          </FlexContainerChildContent>
        </FlexContainerChild>
        <FlexContainerChild>
          <img src="/images/recibis.PNG" alt="" style={{ margin: '0 10px 0 0' }} />
          <FlexContainerChildContent>
            <TitleContent>Recibís</TitleContent>
            <ParagraphContent>
              los vinos con <span style={{ fontWeight: '600' }}>ENVÍO SIN CARGO</span> a todo el
              país
            </ParagraphContent>
          </FlexContainerChildContent>
        </FlexContainerChild>
        <FlexContainerChild>
          <img src="/images/disfrutas.PNG" alt="" style={{ margin: '0 10px 0 0' }} />
          <FlexContainerChildContent>
            <TitleContent>Disfrutás</TitleContent>
            <ParagraphContent style={{ width: '14em' }}>
              de contenido, descuentos <br /> y eventos exclusivos del mundo del vino
            </ParagraphContent>
          </FlexContainerChildContent>
        </FlexContainerChild>
      </FlexContainer>
      <ButtonContainer>
        <Button
          text="Ver cómo elegimos los vinos"
          onClick={() => setOpen(true)}
          variant="primary"
        />
        <a href={AUTOGESTION_SELECTION} style={{ width: '100%', textDecoration: 'none' }}>
          <Button style={{ width: '95.5%' }} text="ASOCIARME ONLINE" />
        </a>
      </ButtonContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Q438q_l0qkM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </Dialog>
    </BannerContainer>
  )
}
