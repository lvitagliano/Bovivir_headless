import React from 'react'
import { useSelector } from 'react-redux'
import { SectionDataContainer, FormCard, FormTitle } from '../../Commons/styles'
import EllipsisText from '../../Commons/EllipsisText'
import { RightTd, LeftTd, CenterTd, Footer, Total } from './styles'

export const Order = () => {
  const items = useSelector(state => state.m2.cart.items)
  const { discounts, subtotal_excluding_tax, grand_total } = useSelector(
    state => state.m2.cart.prices
  )
  const selectedShipping = useSelector(state => state.m2.selectedShipping)

  return (
    <>
      <SectionDataContainer margin="0" align="center">
        <FormCard width="90%" minWidth="360px">
          <FormTitle style={{ marginBottom: '30px' }}>Detalle de compra</FormTitle>
          <div style={{ width: '100%', height: '90%' }}>
            {!items.length ? (
              <b>No posee Items en el Carrito</b>
            ) : (
              <>
                <b>Productos</b>
                <hr />
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', width: '43%' }}>
                      <th style={{ fontSize: '0.9em' }}>Nombre del producto</th>
                      <th style={{ fontSize: '0.9em', textAlign: 'right' }}>Cantidad</th>
                      <th style={{ fontSize: '0.9em', textAlign: 'right' }}>Val. Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item, id) => (
                      <tr key={id}>
                        <LeftTd>
                          <EllipsisText mytext={item.product.name} maxlimit={28}></EllipsisText>
                        </LeftTd>
                        <CenterTd>{item.quantity}</CenterTd>
                        <RightTd>
                          <p style={{ whiteSpace: 'nowrap' }}>{`$ ${item.prices.price.value}`}</p>
                        </RightTd>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            <hr />
            <div>
              <Footer>
                <b>Sub total</b>
                <Total>{`$ ${subtotal_excluding_tax?.value}`}</Total>
              </Footer>
              <Footer>
                <div>Monto de envío: </div>
                <div>{`$ ${selectedShipping?.amount || 0}`}</div>
              </Footer>
              {discounts &&
                discounts.map((disc, id) => (
                  <Footer key={id}>
                    <div>{`Descuento: ${disc.label}`} </div>
                    <div>{`$ -${disc?.amount?.value}`}</div>
                  </Footer>
                ))}
              <Footer>
                <b>Total</b>
                <Total>{`$ ${grand_total?.value + selectedShipping?.amount ||
                  grand_total?.value}`}</Total>
              </Footer>
            </div>
          </div>
        </FormCard>
      </SectionDataContainer>
    </>
  )
}
