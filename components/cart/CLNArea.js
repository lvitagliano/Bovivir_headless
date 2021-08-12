import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'
import { updateCustomerDataCLNM2Action } from '../../store/actions/m2Action'

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
  CLNButton: {
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

export default function CLNArea() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { customerData } = useSelector(state => state.m2)
  const hasCLN = customerData?.custom_attributes?.find(
    one => one.attribute_code === 'covedisa_tarjeta_cln'
  )
  const [CLN, setCLN] = useState(hasCLN || '')
  const [loading, setLoading] = useState(false)

  const handleClickCLN = async () => {
    setLoading(true)
    await dispatch(updateCustomerDataCLNM2Action({ covedisa_tarjeta_cln: CLN }))
    setCLN('')
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await dispatch(updateCustomerDataCLNM2Action({ covedisa_tarjeta_cln: '' }))
    setLoading(false)
  }

  if (loading) {
    return (
      <div className={`${classes.checkoutPanel} ${classes.center}`}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div style={{ borderRadius: '4px', backgroundColor: '#eeeeee' }}>
      {hasCLN ? (
        <div className={classes.checkoutPanel}>
          <img
            width="80"
            height="80"
            src="https://yt3.ggpht.com/a-/AAuE7mAIGC4ZWBuikIiMe0w7eLwOxpEb7l_0rojV_g=s900-mo-c-c0xffffffff-rj-k-no"
          ></img>
          <Typography variant="subtitle2">Socio Club La Nación</Typography>

          <div className={classes.chip}>
            <Chip label={hasCLN.value} onDelete={handleDelete} color="primary" />
          </div>
        </div>
      ) : (
        <div className={classes.checkoutPanel}>
          <div>
            <img
              width="80"
              height="80"
              src="https://yt3.ggpht.com/a-/AAuE7mAIGC4ZWBuikIiMe0w7eLwOxpEb7l_0rojV_g=s900-mo-c-c0xffffffff-rj-k-no"
            ></img>
            <Typography variant="subtitle2">Socio Club La Nación</Typography>
          </div>
          <InputForm
            value={CLN}
            disableInnerButtons
            label="NÚMERO DE LA TARJETA*"
            name="cupon"
            placeholder="xxxx-xxxx-xxxx"
            type="number"
            width="100%"
            onChange={e => e.target.value.toString().length <= 16 && setCLN(e.target.value)}
          ></InputForm>
          <Button
            disabled={CLN === null || CLN.toString().length !== 16}
            onClick={handleClickCLN}
            style={{ marginTop: '10px' }}
            width="50%"
            text="Guardar"
          ></Button>
        </div>
      )}
    </div>
  )
}
