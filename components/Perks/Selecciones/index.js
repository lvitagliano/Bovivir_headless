import React from 'react'
import { SubTitle4, SubTitle3, SubTitle, Title3, Text4, Text5 } from '../../Home/utils/commonStyles'
import {
  Container,
  SelectionCard,
  ImgCajaSelection,
  SelectionExclusiveContainer,
  SelectionExclusiveContent,
  ContentAling,
  ImgLogoSelection,
  ListUl,
  ExplorerSelectionContainer,
  SelectionCards,
} from './styles'
import Button from '../../Commons/Button'
import { Divider } from '@material-ui/core'

const SeleccionesComponent = ({ data, ...props }) => {
  return (
    <Container>
      <SubTitle3 color="#752057">FORMÁ PARTE DEL CLUB</SubTitle3>
      <Title3 color="#333">ELEGÍ TU SELECCIÓN</Title3>
      <SelectionCards>
        {data?.selecciones?.map((item, i) => (
          <SelectionCard key={i}>
            <div style={{ position: 'relative' }}>
              <ImgCajaSelection src={item.cf_seleccion.cajaselection.sourceUrl} alt=" " />
              <ImgLogoSelection src={item.cf_seleccion.logoselection.sourceUrl} alt=" " />
            </div>
            <div>
              <SubTitle4 style={{ textAlign: 'center' }} color="#752057">
                {item.cf_seleccion.titleselection}
              </SubTitle4>
              <Text5 style={{ textAlign: 'center' }} color="#909094">
                {item.cf_seleccion.textselection}
              </Text5>
            </div>
            <Divider />
            Vinos:
            {item.cf_seleccion.vinosselection?.map((vino, i) => (
              <Text5 style={{ marginTop: 0 }} color="#909094">
                {vino.cf_vinoSeleccion.vinoseleccion}
              </Text5>
            ))}
            <div style={{ marginTop: 'auto', alignSelf: 'center', marginTop: 'auto' }}>
              <Button text="Ver más" />
            </div>
          </SelectionCard>
        ))}
      </SelectionCards>
    </Container>
  )
}

export default SeleccionesComponent
