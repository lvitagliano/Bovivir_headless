import React, { useEffect } from 'react'
import { ContainerHeader, Paragraph, Title, ContainerFlex, ContainerGrid } from './style'
import Button from '../Commons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../store/actions/eventsActions'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { useRouter } from 'next/dist/client/router'

const ContenidoExclusivo = () => {
  const { events, loading: eventsLoading } = useSelector(state => state.events.allEvents)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    events.length === 0 && dispatch(getAllEvents())
  }, [])

  return (
    <>
      <div style={{ backgroundColor: '#f7f7f7', padding: '0 0 30px 0' }}>
        <ContainerHeader style={{ backgroundImage: 'url(/images/eventos-header-vinos.png)' }}>
          <Paragraph>
            <CalendarTodayIcon style={{ fontSize: '15px', margin: '0 5px 0 0' }} /> 30 de octubre
          </Paragraph>
          <Title>Expo vinos de la Patagonia 2020: Para disfrutar en casa</Title>
          <Paragraph>
            El próximo viernes 30 de octubre llega una innovadora experiencia que propone disfrutar
            de los sabores, paisajes y grandes vinos del sur argentino sin salir de casa
          </Paragraph>
          <Button text="ver evento" />
        </ContainerHeader>

        <Title
          color="#000"
          fontSize="2em"
          textAlign="center"
          width="100%"
          style={{ margin: '20px 0' }}
        >
          Todos los Eventos
        </Title>
        <ContainerGrid>
          {events.map((event, index) => {
            var date = new Date(event?.date || ' ')
            var options = { month: 'long', day: 'numeric' }

            return (
              <ContainerFlex width="27em" overflow="hidden" justifyContent="start">
                <img src={event?.featuredImage?.node?.guid} alt="" width="380" height="380" />
                <div style={{ margin: '20px 0 0 0', padding: '0 0 20px 0' }}>
                  <Paragraph color="#838383" width="15em">
                    <CalendarTodayIcon style={{ fontSize: '15px' }} />
                    {date?.toLocaleDateString('es-ES', options)}
                  </Paragraph>
                  <Title color="#333" fontSize="1.5em" width="14em">
                    {event.title}
                  </Title>
                  <Button
                    text="ver evento"
                    onClick={() =>
                      router.push({
                        pathname: 'eventoexclusivodetails',
                        query: { idEvent: event?.id },
                      })
                    }
                  />
                </div>
              </ContainerFlex>
            )
          })}
        </ContainerGrid>
        <ContainerFlex backgroundColor="#f7f7f7">
          <a href="#" style={{ textDecoration: 'none' }}>
            <Button text="ver más eventos" />
          </a>
        </ContainerFlex>
      </div>
    </>
  )
}
export default ContenidoExclusivo
