import React, { useEffect } from 'react'
import { Container, Wording, ContainerContent } from './styles'
import RegretButton from './RegretButton'
import { MENU_FOOT_HELP } from '../../constants/menu'
import Columns from './columns'
import MediaColumn from './mediaColumn'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSocialMedia } from '../../store/actions/footerAction'

const index = ({ data }) => {
  const dispatch = useDispatch()
  const { socialMedia } = useSelector(state => state.footer)

  useEffect(() => {
    dispatch(getAllSocialMedia())
  }, [])

  return (
    <Container>
      <ContainerContent style={{ display: 'flex', justifyContent: 'center' }}>
        <Columns menu={data[0] || []} />
        <Columns menu={data[1] || []} />
        <Columns menu={data[2] || []} />
        <div style={{ textTransform: 'uppercase', margin: '1em 0 2em 5em' }}>
          <h5>AYUDA</h5>
          <div>
            {MENU_FOOT_HELP.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '1em',
                }}
              >
                <a
                  target={item.target}
                  href={item.href}
                  style={{ textDecoration: 'none', fontSize: '0.8em', color: '#fff' }}
                >
                  {item.text}
                </a>
              </div>
            ))}
            <RegretButton
              data={{
                label: 'Botón de arrepentimiento',
                href: '/p-arrepentimiento',
              }}
            />
          </div>
        </div>
        <MediaColumn menu={socialMedia} />
      </ContainerContent>
      <Wording>
        <spam style={{ textTransform: 'uppercase', fontSize: '1.1em' }}>
          Beber con moderación. - Prohibida la venta de bebidas alcohólicas a menores de 18 años -
          Ley nacional de lucha contra el alcoholismo Nro. 24.788.
        </spam>
        <br />
        <spam style={{ textTransform: 'uppercase', fontSize: '1.1em' }}>
          COPYRIGHT 2019 PUBLIREVISTAS S.A.
        </spam>{' '}
        | Todos los derechos reservados | terminos y condiciones - Dirección General de Defensa y
        Protección al Consumidor - Consultas y/o denuncias:{' '}
        <a
          href="http://www.buenosaires.gob.ar/defensaconsumidor"
          target="_blank"
          style={{ color: '#fff' }}
        >
          INGRESE AQUÍ
        </a>
      </Wording>
    </Container>
  )
}

export default index
