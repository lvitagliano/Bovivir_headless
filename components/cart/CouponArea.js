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
      marginTop: '1rem',
      borderRadius: '2px',
      backgroundColor: '#e0e0e0',
      border: '1px solid rgb(199 193 193 / 75%)',
      color: '#a6a6b5',
    },
  },
})
const useStyles = makeStyles(styles)
const CouponArea = () => {
  const classes = useStyles()
  const { cart } = useSelector(state => state.m2)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const { items, applied_coupons } = cart
  const dispatch = useDispatch()
  const [coupon, setCoupon] = useState('')
  const [loading, setloading] = useState(false)

  const handleClickCoupon = async () => {
    if (isLogedInM2 && isLogedInAuth0 && coupon !== '') {
      setloading(true)
      await dispatch(addCouponToCart(coupon.trim()))
      setCoupon('')
      setloading(false)
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
                  {applied_coupons?.map((c, i) => (
                    <div key={i} className={classes.chip}>
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
              />
              <Button
                onClick={handleClickCoupon}
                style={{ marginTop: '10px' }}
                width="50%"
                text="Aplicar Cupón"
                disabled={coupon.trim().length === 0}
              />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default CouponArea
