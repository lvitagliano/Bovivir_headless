import React from 'react'
import { Grid } from '@material-ui/core'
import { DivImage, Divs, Li, Ul } from './styles'
import Button from '../Commons/Button'
import { useRouter } from 'next/router'

const Pay = ({ data }) => {
  const router = useRouter()
  const failUrl = '/images/fail.png'
  const successUrl = '/images/success.png'

  const handleRedirect = () => {
    router.push('/tienda/vinos')
  }
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Divs>
          <DivImage image={data.status === 'approved' ? successUrl : failUrl} />
          <Ul>
            {data.status === 'approved' ? (
              <>
                <Li>Pago aprobado</Li>
                <Li>
                  Su número de operación de MercadoPago es: <b>{data.payment_id}</b>
                </Li>
                <Li>
                  Su número de pedido en Bonvivir es: <b>{data.external_reference}</b>
                </Li>
                <Li>Le enviaremos una confirmación por email sobre el pedido.</Li>
              </>
            ) : (
              <Li>Falló el pago</Li>
            )}
          </Ul>
          <Button
            type="button"
            style={{ display: 'flex' }}
            onClick={() => handleRedirect()}
            text="Seguir comprando"
          />
        </Divs>
      </Grid>
    </>
  )
}

export default Pay
