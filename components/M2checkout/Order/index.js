import React from 'react'
import {useSelector} from 'react-redux'
import {
    SectionDataContainer,
    FormCard,
    FormTitle,
  } from '../../Commons/styles'
import EllipsisText from '../../Commons/EllipsisText'
import {RightTd,LeftTd,CenterTd,Footer,Total} from './styles'

export const Order = () => {
    const items = useSelector(state => state.m2.cart.items);
    const pagos = useSelector(state => state.m2.paymentMethodData);
    const total = items.reduce((ac,it) => ac + it.prices.row_total.value,0 );

    return (
        <>
         <SectionDataContainer margin='0' align="center">
           <FormCard width='90%' minWidth='360px'>
            <FormTitle style={{marginBottom: '30px'}}>Detalle de compra</FormTitle>
                <div style={{width:'100%', height:'90%'}}>
                  {!items.length ? 
                      <b>No posee Items en el Carrito</b>
                      :
                      <>
                        <b>Productos</b>
                        <hr/>
                          <table>
                            <thead>
                              <th style={{textAlign:"left"}}><b>Nombre del producto</b></th>
                              <th><b>Cantidad</b></th>
                              <th><b>Val. Unitario</b></th>
                            </thead>
                            <tbody>
                              {items?.map((item, id) => (
                                <tr>
                                  <LeftTd>
                                    <EllipsisText mytext={item.product.name} maxlimit={28}></EllipsisText>
                                  </LeftTd>
                                  <CenterTd>{item.quantity}</CenterTd>
                                  <RightTd>
                                    <p style={{whiteSpace:'nowrap'}}>{`$ ${item.prices.price.value}`}</p>
                                  </RightTd>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                      </>
                      }
                      <hr/>
                      {
                        Object.keys(pagos).length === 0 ? 
                        <Footer>
                        <b>Total</b>
                        <Total>{`$ ${total}`}</Total>
                      </Footer> :
                          <div>
                          <Footer>
                            <b>Sub total</b>
                            <Total>{`$ ${pagos.totals.subtotal}`}</Total>
                          </Footer>
                          
                          {pagos.totals.shipping_amount > 0 && <Footer>
                          <LeftTd>Monto de envío: </LeftTd>
                          <RightTd>{`$ ${pagos.totals.shipping_amount}`}</RightTd>
                          </Footer>}

                          {pagos.totals.discount_amount < 0 && <Footer>
                          <LeftTd>{`${pagos.totals.total_segments[2].title.replace('Discount', 'Descuento')}:`} </LeftTd>
                          <RightTd>{`$ ${pagos.totals.total_segments[2].value}`}</RightTd>
                          </Footer>}

                          <Footer>
                            <b>Total</b>
                            <Total>{`$ ${pagos.totals.grand_total}`}</Total>
                          </Footer>
                          </div>
                      }
                </div>
            </FormCard>
        </SectionDataContainer>
        </>
    )
}
