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
} from './styles'
import Button from '../../Commons/Button'

const SeleccionesComponent = ({ data, ...props }) => {
  return (
    <Container>
      <SubTitle3 color="#752057">{data.title1selection}</SubTitle3>
      <Title3 color="#333">{data.title2selection}</Title3>
      <Text4 color="#909094">{data.subtitleselection}</Text4>

      {data.selecciones.map((item, i) => (
        <SelectionCard>
          <SelectionExclusiveContainer>
            <ImgLogoSelection src={item.cf_seleccion.logoselection.sourceUrl} alt=" " />
            <SubTitle4 color="#752057">{item.cf_seleccion.titleselection}</SubTitle4>
            <Text5 color="#909094">{item.cf_seleccion.textselection}</Text5>
          </SelectionExclusiveContainer>

          <SelectionExclusiveContent>
            <ContentAling>
              <ImgCajaSelection src={item.cf_seleccion.cajaselection.sourceUrl} alt=" " />
              <div>
                <SubTitle color="#000">{item.cf_seleccion.selection}</SubTitle>
                <ListUl>
                  {item.cf_seleccion.vinosselection?.map((vino, i) => (
                    <li>
                      <Text5 color="#909094">{vino.cf_vinoSeleccion.vinoseleccion}</Text5>
                    </li>
                  ))}
                </ListUl>
                <Text5 color="#909094">{item.cf_seleccion.cantidadselection}</Text5>
              </div>
            </ContentAling>
            <ExplorerSelectionContainer>
              <Text5 color="#752057">Explorar Selecciones Anteriores</Text5>
              <Button text="Ver más" />
            </ExplorerSelectionContainer>
          </SelectionExclusiveContent>
        </SelectionCard>
      ))}
    </Container>
  )
}

export default SeleccionesComponent
