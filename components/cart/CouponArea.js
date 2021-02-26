import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../Commons/Button'
import { Grid, Hidden, Divider, Container, CircularProgress } from '@material-ui/core'
import { Hbox } from 'react-storefront/Box'
import { addCouponToCart, removeCouponFromCart } from '../../store/actions/m2Action'
import InputForm from '../Commons/InputForm'
import Chip from '@material-ui/core/Chip'
import ScTheme from '../../Styles/themes/main'

const styles = theme => ({
  checkoutPanel: {
    backgroundColor: theme.palette.grey['200'],
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(2)}px`,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  couponButton: {
    marginTop: '10px',
  },
  bold: {
    fontWeight: 'bold',
  },
  chip: {
    '& .MuiChip-root ': {
      backgroundColor: `${ScTheme.colors.secondary}`,
    },
  },
})
const useStyles = makeStyles(styles)
const CouponArea = () => {
  const classes = useStyles()
  const { cart, loading } = useSelector(state => state.m2)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const { items, applied_coupons } = cart
  const dispatch = useDispatch()
  const [coupon, setCoupon] = useState('')
  const handleClickCoupon = async () => {
    if (isLogedInM2 && isLogedInAuth0) {
      await dispatch(addCouponToCart(coupon))
      setCoupon('')
    }
  }

  const handleDelete = () => {
    dispatch(removeCouponFromCart())
  }

  if (loading) {
    return (
      <div className={`${classes.checkoutPanel} ${classes.center}`}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      {items.length === 0 ? null : (
        <div className={classes.checkoutPanel}>
          {applied_coupons?.length ? (
            <Hbox alignItems="flex-start">
              <div>
                <Typography variant="subtitle2" className={classes.bold}>
                  Cupón Aplicado al carrito
                </Typography>
                <div style={{ marginTop: '10px' }}>
                  {applied_coupons?.map(c => (
                    <div className={classes.chip}>
                      <Chip label={c.code} onDelete={handleDelete} color="primary" />
                    </div>
                  ))}
                </div>
              </div>
            </Hbox>
          ) : (
            <>
              <Hbox alignItems="flex-start">
                <div>
                  <Typography variant="subtitle2" className={classes.total}>
                    Agregar Cupón
                  </Typography>
                </div>
              </Hbox>
              <InputForm
                defaultValue=""
                name="cupon"
                placeholder="Ingrese el Cupón"
                type="text"
                width="100%"
                onChange={e => setCoupon(e.target.value)}
              ></InputForm>
              <div></div>
              <Button
                onClick={handleClickCoupon}
                style={{ marginTop: '10px' }}
                width="50%"
                text="Aplicar Cupón"
              ></Button>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default CouponArea
