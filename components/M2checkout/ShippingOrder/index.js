import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SectionDataContainer, FormCard, FormTitle } from '../../Commons/styles'
import EllipsisText from '../../Commons/EllipsisText'
import { RightTd, LeftTd, CenterTd, Footer, Total } from './styles'

export const ShippingOrder = () => {
  const items = useSelector(state => state.m2.addressView)
  const pagos = useSelector(state => state.m2.paymentMethodData)
  let titlePagos = pagos.totals?.total_segments[2]?.title
    .replace(' (', ': ')
    .replace(')', '.')
    .replace('Shipping & Handling', 'Método de envío')

  useEffect(() => {}, [items])
  return (
    <>
      <SectionDataContainer margin="0" align="center">
        <FormCard width="90%" minWidth="360px">
          <FormTitle style={{ marginBottom: '5px' }}>
            {items.postcode ? 'Dirección de envío' : 'Punto de entrega'}
          </FormTitle>
          <div style={{ width: '100%', height: '90%' }}>
            {Object.keys(items)?.length === 0 ? (
              <b>No seleccionó dirección de envío</b>
            ) : (
              <>
                <hr />
                <table style={{ width: '100%' }}>
                  <tbody style={{ width: '100%' }}>
                    <tr>
                      <LeftTd>Nombre: </LeftTd>
                      <RightTd>
                        {items.firstname} {items.lastname}
                      </RightTd>
                    </tr>
                    <tr>
                      <LeftTd>Teléfono: </LeftTd>
                      <RightTd>{items.telephone}</RightTd>
                    </tr>
                    <tr>
                      <LeftTd>Ciudad: </LeftTd>
                      <RightTd>{items.city}</RightTd>
                    </tr>
                    <tr>
                      <LeftTd>Cod. postal: </LeftTd>
                      <RightTd>{items.postcode}</RightTd>
                    </tr>

                    <tr>
                      <LeftTd>Provincia: </LeftTd>
                      <RightTd>{items.region.region}</RightTd>
                    </tr>
                    <tr>
                      <LeftTd>Calle: </LeftTd>
                      <RightTd>
                        {items?.street &&
                          items?.street?.map((item, id) => <span key={id}> {item} </span>)}
                      </RightTd>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            <hr />
            {Object.keys(pagos).length > 0 && <b>{titlePagos}</b>}
          </div>
        </FormCard>
      </SectionDataContainer>
    </>
  )
}
