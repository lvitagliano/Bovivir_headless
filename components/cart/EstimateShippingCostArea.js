import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Hbox } from 'react-storefront/Box'
import ScTheme from '../../Styles/themes/main'
import { Select, MenuItem, FormControl, CircularProgress, TextField } from '@material-ui/core'
import { estimateShippingMethodsByPostCode } from '../../services/Client/m2api'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'

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
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    height: '3rem',
  },
  postalCode: {
    width: '100%',
  },
})
const useStyles = makeStyles(styles)

export default function EstimateShippingCostArea() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [shippingTypes, setShippingTypes] = useState([])
  const [selectValue, setSelectValue] = useState(1)
  const { isLogedInAuth0 } = useSelector(state => state.user)
  const [postalCode, setPostalCode] = useState('')

  // HANDLER
  const onCalculateShippingCostsClick = async postcode => {
    setLoading(true)
    const res = await estimateShippingMethodsByPostCode(postcode)
    if (res) {
      setShippingTypes(res)
    } else {
      setShippingTypes([])
    }
    setLoading(false)
  }

  // LOADING RETURN
  if (loading) {
    return (
      <div className={`${classes.checkoutPanel} ${classes.center}`}>
        <CircularProgress />
      </div>
    )
  }

  // INPUT POSTAL CODE COMPONENT
  const postalCodeForm = () => {
    return (
      <div className={classes.postalCode}>
        <InputForm
          disableInnerButtons
          value={postalCode}
          name="postalCode"
          placeholder="Ingrese el código postal"
          type="number"
          width="100%"
          onChange={e => setPostalCode(e.target.value)}
        />
        <Button
          disabled={postalCode.length !== 4}
          onClick={() => onCalculateShippingCostsClick(postalCode)}
          style={{ marginTop: '10px' }}
          text="Calcular"
        />
      </div>
    )
  }

  // RETURN
  return (
    isLogedInAuth0 && (
      <div className={classes.checkoutPanel}>
        <Hbox style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div>
            <img src="" />
            <b>Calcular costo de envío</b>
          </div>

          {postalCodeForm()}

          {shippingTypes?.length > 0 ? (
            <div>
              {shippingTypes.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      style={{
                        border: '2px solid #e8e8e8',
                        borderRadius: '5px',
                        margin: '5px',
                        padding: '3px',
                        alignItems: 'center',
                        color: '#333',
                        direction: 'column',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                          }}
                        >
                          <b style={{ margin: '5px' }} for="male">
                            {item.method_title}
                          </b>
                          <b style={{ margin: '5px' }}>${item.base_amount}</b>
                        </div>
                        <p style={{ margin: '0px 15px' }}>{item?.carrier_title}</p>
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </div>
          ) : null}
        </Hbox>
      </div>
    )
  )
}
