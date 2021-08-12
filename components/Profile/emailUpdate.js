import { useForm, Controller } from 'react-hook-form'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'
import { ruleEmail, rulePassword } from '../../constants/validationRules'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import { updateCustomerEmailAction } from '../../store/actions/m2Action'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  formContainer: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function EmailUpdate({ email }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { errors, handleSubmit, control, getValues, setValue, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data, event) => {
    event.preventDefault()
    setConfirmModalShow(true)
  }

  const onConfirmarClick = async () => {
    setLoading(true)
    const email = getValues('email')
    await dispatch(
      updateCustomerEmailAction({
        email,
      })
    )

    setLoading(false)
  }

  return (
    <>
      <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={InputForm}
          width={'300px'}
          label="Email"
          placeholder="Ingrese su Email"
          defaultValue={email}
          name="email"
          control={control}
          type="email"
          rules={ruleEmail}
          error={errors.email && errors.email['message']}
        />
        <Button disabled={!formState.isValid} text={'Editar'} type="submit" />
      </form>
      <Dialog
        className={classes.modal}
        open={confirmModalShow}
        onClose={() => setConfirmModalShow(false)}
      >
        <DialogContent>
          <DialogContentText>Seguro que desea cambiar el email de esta cuenta?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button text={'Cancelar'} onClick={() => setConfirmModalShow(false)} />
          <Button text={'Confirmar'} loading={loading} onClick={() => onConfirmarClick()} />
        </DialogActions>
      </Dialog>
    </>
  )
}
