import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import clsx from 'clsx'
import CartItem from '../components/cart/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Hidden, Divider, Container, CircularProgress } from '@material-ui/core'
import Button from '../components/Commons/Button'
import { price } from 'react-storefront/utils/format'
import Spacer from 'react-storefront/Spacer'
import { Hbox } from 'react-storefront/Box'
import { updateItemsInCart, removeItemFromCart } from '../store/actions/m2Action'
import { setLoginRequest } from '../store/actions/userAction'
import { FormTitle } from '../components/Commons/styles'
import { useRouter } from 'next/router'
import CouponArea from '../components/cart/CouponArea'

const styles = theme => ({
  root: {
    paddingBottom: '64px',
    backgroundColor: '#f7f7f7',
  },
  checkoutPanel: {
    backgroundColor: theme.palette.grey['200'],
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(2)}px`,
  },
  total: {
    fontWeight: 'bold',
  },
  couponButton: {
    marginTop: '10px',
  },
  docked: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      padding: `${theme.spacing(2)}px`,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      borderRadius: '0',
      boxShadow: 'none',
    },
  },
})

const useStyles = makeStyles(styles)

export default function Cart() {
  const { cart } = useSelector(state => state.m2)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const items = cart?.items || []
  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()

  const updateProduct = item => {
    let stateItems = items.map(it => ({
      cart_item_id: it.id,
      quantity: it.quantity,
    }))
    const newItems = Object.values([
      ...stateItems,
      ...[
        {
          cart_item_id: item.id,
          quantity: item.quantity,
        },
      ],
    ]).reduce((result, { cart_item_id, ...rest }) => {
      result[cart_item_id] = {
        ...(result[cart_item_id] || {}),
        cart_item_id,
        ...rest,
      }
      return result
    }, {})

    dispatch(updateItemsInCart(newItems))
  }

  const handleClick = () => {
    if (isLogedInM2 && isLogedInAuth0) {
      router.push(`/m2/step1`, `/m2/step1`, { shallow: true })
    } else {
      dispatch(setLoginRequest(true))
    }
  }

  const removeProduct = item => {
    dispatch(removeItemFromCart(item))
  }

  return (
    <Container className={classes.root}>
      <Row>
        <FormTitle>
          Mi Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </FormTitle>
      </Row>
      <Row>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            {items.length
              ? items.map((item, i) => {
                  return (
                    <CartItem
                      key={`${item.id}_${item.quantity}`}
                      updateCart={updateProduct}
                      remove={removeProduct}
                      product={item}
                    />
                  )
                })
              : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CouponArea items={items} />
            <div className={classes.checkoutPanel} style={{ marginTop: '30px' }}>
              <Hbox alignItems="flex-start">
                <Typography variant="subtitle2" className={classes.total}>
                  SubTotal
                </Typography>
                <Spacer />
                <Typography variant="subtitle2" className={classes.total}>
                  {price(cart?.prices?.subtotal_excluding_tax?.value || 0)}
                </Typography>
              </Hbox>
              <Hbox alignItems="flex-start">
                <Typography variant="subtitle2" className={classes.total}>
                  Descuentos
                </Typography>
              </Hbox>
              {cart?.prices?.discounts?.map(d => (
                <Hbox alignItems="flex-start">
                  <Spacer />
                  <Typography variant="subtitle2" className={classes.total}>
                    {`- ${price(d.amount.value)}`}
                  </Typography>
                </Hbox>
              ))}
              <Hbox alignItems="flex-start">
                <Typography variant="body1" className={classes.total}>
                  Total
                </Typography>
                <Spacer />
                <Typography variant="body1" className={classes.total}>
                  {price(cart?.prices?.subtotal_with_discount_excluding_tax?.value || 0)}
                </Typography>
              </Hbox>
              <Hidden xsDown implementation="css">
                <Row>
                  <Divider />
                </Row>
              </Hidden>
              {items.length === 0 ? null : (
                <Button
                  onClick={handleClick}
                  className={clsx(classes.checkoutButton, classes.docked)}
                  width="100%"
                  text="Ir al Checkout"
                ></Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Row>
    </Container>
  )
}
