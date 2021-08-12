import React from 'react'
import { SubTitle4, SubTitle3, SubTitle, Title3, Text4, Text5 } from '../../Home/utils/commonStyles'
import {
  ContainerSeleccion,
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
import Container from '@material-ui/core/Container'
import Spinner from '../../Commons/Spinner'
import Skeleton from '@material-ui/lab/Skeleton'

const SeleccionesComponent = ({ data, selections, loading, ...props }) => {
  return loading ? (
    <Container style={{ textAlign: 'center' }}>
      <Skeleton
        variant="rect"
        animation="wave"
        height={'9rem'}
        style={{ top: '5rem', borderRadius: '5px' }}
      />
      <br />
      <Skeleton
        variant="rect"
        animation="wave"
        height={'9rem'}
        style={{ top: '5rem', borderRadius: '5px' }}
      />
      <br />
      <Skeleton
        variant="rect"
        animation="wave"
        height={'9rem'}
        style={{ top: '5rem', borderRadius: '5px' }}
      />
      <br />
      <Skeleton
        variant="rect"
        animation="wave"
        height={'9rem'}
        style={{ top: '5rem', borderRadius: '5px' }}
      />
    </Container>
  ) : (
    <Container>
      <SubTitle3 color="#752057">{data.title1selection}</SubTitle3>
      <Title3 color="#333">{data.title2selection}</Title3>
      <Text4 color="#909094" style={{ margin: '0 0 30px 0' }}>
        {data.subtitleselection}
      </Text4>
      {selections?.map((selection, i) => {
        const formatDate = new Date(selection.date).toLocaleString('es-es', {
          month: 'long',
          year: 'numeric',
        })
        const boxes = selection.boxes.nodes
        debugger
        const buildBoxes = selection.boxes.nodes.length
          ? `en cajas de ${boxes[0].bottles} ${
              boxes.length !== 1 ? `ó ${boxes[1].bottles}` : ``
            } botellas`
          : ''

        return (
          <SelectionCard key={i}>
            <SelectionExclusiveContainer>
              <ImgLogoSelection src={selection?.hardData?.logoSelection} alt=" " />
              <SubTitle4 color="#752057">{`Selección ${selection.quality}`}</SubTitle4>
              <Text5 color="#909094">{selection.hardData?.textSelection}</Text5>
            </SelectionExclusiveContainer>

            <SelectionExclusiveContent>
              <ContentAling>
                <div style={{ alignSelf: 'flex-end' }}>
                  <ImgCajaSelection src={selection.hardData?.cajaSelection} alt=" " />
                </div>
                <div>
                  <SubTitle color="#000">{`Selección ${formatDate}`.toUpperCase()}</SubTitle>
                  <ListUl>
                    {selection?.selectionWines?.map((vino, i) => (
                      <li key={i}>
                        <Text5 color="#909094">{vino}</Text5>
                      </li>
                    ))}
                  </ListUl>
                  <Text5 color="#909094">{buildBoxes}</Text5>
                </div>
              </ContentAling>
              <ExplorerSelectionContainer>
                <Text5 color="#752057" style={{ alignSelf: 'flex-end' }}>
                  <a href="/selecciones" style={{ textDecoration: 'none', color: '#752057' }}>
                    Explorar Selecciones Anteriores
                  </a>
                </Text5>
                <a href={selection.uri} style={{ textDecoration: 'none', color: '#752057' }}>
                  <Button text="Ver más" />
                </a>
              </ExplorerSelectionContainer>
            </SelectionExclusiveContent>
          </SelectionCard>
        )
      })}
    </Container>
  )
}

export default SeleccionesComponent
