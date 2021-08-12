import React, { useEffect, useState } from 'react'
import { ContainerHeader, Paragraph, Title, ContainerFlex, ButtonLocation } from './style'
import Button from '../Commons/Button'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { getEventByIdClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import withRouter from 'next/dist/client/with-router'

const ContenidoExclusivo = props => {
  const [event, setEvent] = useState(null)
  useEffect(() => {
    console.log(props)
    const idEvent = props.router.query?.idEvent
    idEvent && getEventByIdClient(idEvent).then(resp => setEvent(resp.data.data.event))
  }, [])
  return (
    <>
      <ContainerHeader padding="0" backgroundImage={event?.featuredImage?.node.guid}>
        <div style={{ margin: '0 0 0 10em' }}>
          <Paragraph textTransform="uppercase">
            <CalendarTodayIcon style={{ fontSize: '15px', margin: '0 5px 0 0' }} />
            sin datos
          </Paragraph>
          <Title>{event?.title}</Title>
          <Paragraph>sin datos</Paragraph>
        </div>

        <div style={{ borderTop: '1px solid #fff', width: '100%', heigth: '1px' }}></div>

        <ContainerFlex
          backgroundColor="trasparend"
          flexDirection="row"
          justifyContent="space-between"
          width="80%"
          style={{ margin: '0 0 0 10em' }}
        >
          <ContainerFlex
            backgroundColor="trasparend"
            flexDirection="row"
            width="40%"
            justifyContent="flex-start"
            style={{ margin: '0' }}
          >
            <Paragraph width="6em">$sin datos</Paragraph>
            <a href="#" style={{ textDecoration: 'none', height: '6em' }}>
              <Button text="Registrarme" />
            </a>
          </ContainerFlex>

          <ContainerFlex
            backgroundColor="trasparend"
            flexDirection="row"
            width="40%"
            justifyContent="flex-start"
          >
            <a href="#" style={{ textDecoration: 'none' }}>
              <Paragraph textTransform="uppercase" width="9em">
                compartir
              </Paragraph>
            </a>
            <img src="" alt=" " style={{ margin: '0 10px 0 0' }} />
            <img src="" alt=" " style={{ margin: '0 10px 0 0' }} />
          </ContainerFlex>
        </ContainerFlex>
      </ContainerHeader>

      <ContainerFlex flexDirection="row" alignItems="flex-start" justifyContent="space-between">
        <div style={{ margin: '40px 0 30px 10em' }}>
          <Paragraph
            color="#8c8d91"
            textTransform="none"
            fontWeight="lighter"
            width="44em"
            style={{ margin: '10px 0' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in porro repudiandae, eos
            voluptates accusamus vitae nulla error ipsa voluptas recusandae exercitationem obcaecati
            odit, nisi at tempora nihil. Doloremque, est.
          </Paragraph>

          <Paragraph
            color="#8c8d91"
            textTransform="none"
            fontWeight="lighter"
            width="44em"
            style={{ margin: '10px 0' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in porro repudiandae, eos
            voluptates accusamus vitae nulla error ipsa voluptas recusandae
          </Paragraph>

          <Title color="#333" fontSize="1.3em">
            Informacion del evento
          </Title>

          <Paragraph
            color="#8c8d91"
            textTransform="none"
            fontWeight="lighter"
            width="44em"
            style={{ margin: '10px 0' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in porro repudiandae, eos
            voluptates accusamus vitae nulla error ipsa voluptas recusandae
          </Paragraph>
          <Paragraph
            color="#8c8d91"
            textTransform="none"
            fontWeight="lighter"
            width="44em"
            style={{ margin: '10px 0' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in porro repudiandae, eos
            voluptates accusamus vitae nulla error ipsa voluptas recusandae
          </Paragraph>
          <Paragraph
            color="#8c8d91"
            textTransform="none"
            fontWeight="lighter"
            width="44em"
            style={{ margin: '10px 0' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia in porro repudiandae, eos
            voluptates accusamus vitae nulla error ipsa voluptas recusandae exercitationem obcaecati
            odit, nisi at tempora nihil. Doloremque, est.
          </Paragraph>

          <div style={{ margin: '40px 0 30px 0' }}>
            <img src="" alt=" " style={{ margin: '0 10px 0 0' }} />
            <img src="" alt=" " style={{ margin: '0 10px 0 0' }} />
            <img src="" alt=" " style={{ margin: '0 10px 0 0' }} />
          </div>
        </div>

        <div
          style={{
            margin: '40px 20px 30px 0',
            width: '30%',

            backgroundColor: '#edeae1',
          }}
        >
          <div>
            <ButtonLocation>Informacion</ButtonLocation>
            <ButtonLocation>Mapa</ButtonLocation>
          </div>

          <div style={{ margin: '20px 0 15px 30px' }}>
            <Title color="#7a7b7e" fontSize="1em" style={{ margin: '10px 0' }}>
              Fecha
            </Title>
            <Paragraph
              color="#8c8d91"
              textTransform="none"
              fontWeight="lighter"
              width="24em"
              style={{ margin: '10px 0' }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora alias voluptates
              esse itaque consectetur
            </Paragraph>
          </div>
          <div style={{ margin: '10px 0 15px 30px' }}>
            <Title color="#7a7b7e" fontSize="1em" style={{ margin: '10px 0' }}>
              Lugar
            </Title>
            <Paragraph
              color="#8c8d91"
              textTransform="none"
              fontWeight="lighter"
              width="24em"
              style={{ margin: '10px 0' }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </Paragraph>
          </div>
          <div style={{ margin: '10px 0 20px 30px' }}>
            <Title color="#7a7b7e" fontSize="1em" style={{ margin: '10px 0' }}>
              Precio
            </Title>
            <Paragraph
              color="#8c8d91"
              textTransform="none"
              fontWeight="lighter"
              width="24em"
              style={{ margin: '10px 0' }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora alias voluptates
              esse itaque consectetur tempora alias voluptates esse itaque consectetur
            </Paragraph>
          </div>
        </div>
      </ContainerFlex>
    </>
  )
}

export default withRouter(ContenidoExclusivo)
