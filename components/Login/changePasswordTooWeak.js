import { useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import InputForm from '../Commons/InputForm'
import { Controller, useForm } from 'react-hook-form'
import Button from '../Commons/Button'
import { updateCustomerLogedPassword } from '../../services/Client/GraphQl/m2GQL'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenTooWeakDispatch, setUserError } from '../../store/actions/userAction'

export default function ChangePasswordTooWeak() {
  const open = useSelector(state => state.m2.openTooWeak)
  const dispatch = useDispatch()

  // USEFORM
  const { errors, handleSubmit, control, getValues, setValue, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data, event) => {
    event.preventDefault()
    await updateCustomerLogedPassword(data)
      .then(res => res.success && dispatch(setOpenTooWeakDispatch(false)))
      .catch(err => dispatch(setUserError(err)))
  }

  useEffect(() => {
    open && dispatch(setOpenTooWeakDispatch(true))
  }, [open])

  return (
    <Dialog open={open} onClose={() => dispatch(setOpenTooWeakDispatch(false))}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '70vh',
          padding: '3rem',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '16rem',
          }}
        >
          <ErrorOutlineIcon fontSize="large" color="primary" />
          <br />
          <span>
            Por politicas de seguridad hemos reforzado nuestra constraseñas, por favor ingrese una
            nueva.
          </span>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Controller
                as={InputForm}
                label="Contraseña actual"
                placeholder="********"
                defaultValue=""
                name="currentPassword"
                control={control}
                type="password"
                error={errors.currentPassword && errors.currentPassword['message']}
              />
              <br />
              <Controller
                as={InputForm}
                label="Contraseña nueva"
                placeholder="********"
                defaultValue=""
                name="newPassword"
                control={control}
                type="password"
                error={errors.newPassword && errors.newPassword['message']}
              />

              <Button loading={false} text="Confirmar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}
