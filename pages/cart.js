import React from 'react'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import clsx from 'clsx'
import CartItem from '../components/cart/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Divider, Container } from '@material-ui/core'
import Button from '../components/Commons/Button'
import { price } from 'react-storefront/utils/format'
import Spacer from 'react-storefront/Spacer'
import { Hbox } from 'react-storefront/Box'
import { setLoginRequest } from '../store/actions/userAction'
import { FormTitle } from '../components/Commons/styles'
import { useRouter } from 'next/router'
import CouponArea from '../components/cart/CouponArea'
import CLNArea from '../components/cart/CLNArea'
import EstimateShippingCostArea from '../components/cart/EstimateShippingCostArea'

const styles = theme => ({
  root: {
    paddingBottom: '64px',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
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
  const { items } = cart
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()

  const handleClick = () => {
    if (isLogedInM2 && isLogedInAuth0) {
      router.push(`/m2/step1`, `/m2/step1`, { shallow: true })
    } else {
      dispatch(setLoginRequest(true))
    }
  }

  let totalDiscount = 0

  return (
    <Container className={classes.root}>
      <Row>
        <FormTitle>
          Mi Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </FormTitle>
      </Row>
      <Row>
        <Grid container spacing={4} style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8}>
            {items.length
              ? items.map(item => {
                  return <CartItem key={`${item.id}_${item.quantity}`} product={item} />
                })
              : null}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CouponArea items={items} />

            <div style={{ marginTop: '15px' }}>
              <CLNArea />
            </div>

            <div style={{ marginTop: '15px' }}>
              <EstimateShippingCostArea />
            </div>

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
              {cart?.prices?.discounts && (
                <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
              )}
              {cart?.prices?.discounts?.map((d, i) => {
                totalDiscount += d.amount.value
                return (
                  <>
                    <Hbox key={i} alignItems="flex-start">
                      <Typography variant="subtitle2" className={classes.total}>
                        {d.label}
                      </Typography>
                      <Spacer />
                      <Typography variant="subtitle2" className={classes.total}>
                        {`- ${price(d.amount.value)}`}
                      </Typography>
                    </Hbox>
                  </>
                )
              })}
              {cart?.prices?.discounts?.length > 1 && (
                <Hbox key={'totalDiscount'} style={{ marginTop: '5px' }} alignItems="flex-start">
                  <Typography variant="subtitle2" className={classes.total}>
                    Total Descuentos
                  </Typography>
                  <Spacer />
                  <Typography variant="subtitle2" className={classes.total}>
                    {`- ${price(totalDiscount)}`}
                  </Typography>
                </Hbox>
              )}
              <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
              <Hbox alignItems="flex-start">
                <Typography variant="body1" className={classes.total}>
                  Total
                </Typography>
                <Spacer />
                <Typography variant="body1" className={classes.total}>
                  {price(cart?.prices?.subtotal_with_discount_excluding_tax?.value || 0)}
                </Typography>
              </Hbox>
              {items.length === 0 ? null : (
                <Button
                  onClick={handleClick}
                  className={clsx(classes.checkoutButton, classes.docked)}
                  width="100%"
                  text="Finalizar compra"
                ></Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Row>
    </Container>
  )
}
