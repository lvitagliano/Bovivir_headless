import React, { useEffect, useState } from 'react'
import { getAllCellers } from '../../../services/Client/GraphQl/wp/GQLAPI'
import Displayer from '../../Commons/Displayer'
import Spinner from '../../Commons/Spinner'
import { ContainerBg, Bodegas, Title } from './style'
import Container from '@material-ui/core/Container'

const index = () => {
  const [bodegasDelMes, setBodegasDelMes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllCellers().then(
      res => {
        setBodegasDelMes(res?.data?.data?.cellars?.nodes)
        setLoading(false)
      },
      error => {
        setLoading(false)
      }
    )
  }, [])

  const buildFirstFiveCallers = () => {
    return loading ? (
      <Spinner size={100} />
    ) : (
      <div style={{ width: '85%' }}>
        <Displayer spaceBetweenArrows={'20%'} disableMinHeight arrows={true} amount={5}>
          {bodegasDelMes.map((bodega, index) => {
            return (
              <a
                key={index}
                href={bodega.uri}
                style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
              >
                <img src={bodega.logo} alt=" " />
              </a>
            )
          })}
        </Displayer>
      </div>
    )
  }

  return (
    <ContainerBg>
      <Container max-width="lg" disableGutters="true">
        <Title
          style={{
            textAlign: 'center',
            fontSize: '1.8em',
            color: '#333',
            marginTop: 0,
            paddingTop: '1rem',
          }}
        >
          Bodegas del mes
        </Title>
        <Bodegas style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {buildFirstFiveCallers()}
        </Bodegas>
      </Container>
    </ContainerBg>
  )
}

export default index
