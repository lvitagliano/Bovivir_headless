import React from 'react'
import { ShoppingcartContainer, ShoppingcartContainerChild, PriceBold } from './styles'
import Button from '../Commons/Button'
import Link from 'react-storefront/link/Link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginRequest } from '../../store/actions/userAction'
import { updateItemsInCart, removeItemFromCart } from '../../store/actions/m2Action'
import { price } from 'react-storefront/utils/format'
import CartItem from '../cart/CartItem'

const PopubShoppingcart = ({ closePop }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.m2)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const {
    cart: { items },
  } = useSelector(state => state.m2)

  const handleClick = () => {
    if (isLogedInM2 && isLogedInAuth0) {
      router.push(`/m2/step1`, `/m2/step1`, { shallow: true })
      closePop()
    } else {
      dispatch(setLoginRequest(true))
    }
  }

  return (
    <>
      {items.length > 0 ? (
        <>
          <ShoppingcartContainer>
            <ShoppingcartContainerChild>
              <p>
                ({items.length}{' '}
                {items.length === 1 ? 'producto en el carrito' : 'productos en el carrito'})
              </p>
              <p>
                SubTotal: <br />
                <PriceBold>
                  {price(cart?.prices?.subtotal_with_discount_excluding_tax?.value || 0)}
                </PriceBold>
              </p>
            </ShoppingcartContainerChild>
            <Button
              onClick={handleClick}
              text="Finalizar compra"
              width="95%"
              alignSelf="center"
              margin="0 0 10px 0"
            />
          </ShoppingcartContainer>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              maxHeight: '21rem',
            }}
          >
            {items.length
              ? items.map((item, i) => {
                  return <CartItem key={`${item.id}_${item.quantity}`} product={item} />
                })
              : null}
          </div>

          <ShoppingcartContainer>
            <Link href="/cart" as="/cart" onClick={closePop}>
              <a style={{ textAlign: 'center', padding: '20px', textDecoration: 'none' }}>
                Ir al carrito
              </a>
            </Link>
          </ShoppingcartContainer>
        </>
      ) : (
        <ShoppingcartContainer>
          <ShoppingcartContainerChild style={{ justifyContent: 'center' }}>
            <b>No hay productos en el carrito.</b>
          </ShoppingcartContainerChild>
        </ShoppingcartContainer>
      )}
    </>
  )
}

export default PopubShoppingcart
