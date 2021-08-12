import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'
import { setClearAlerts } from '../../store/actions/m2Action'
function SlideTransition(props) {
  return <Slide {...props} direction="right" timeout={(1000, 1000)} />
}

export default function Alerts() {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.user)
  const m2ErrorAlert = useSelector(state => state.m2.error)
  const m2SuccesAlert = useSelector(state => state.m2.success)

  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'error',
    location: {
      vertical: 'top',
      horizontal: 'left',
    },
    Transition: SlideTransition,
  })

  useEffect(() => {
    if (error !== null && Object.keys(error).length) {
      switch (error.errorMessage) {
        case 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Correo electronico o contraseña son incorrectos.',
          }))
          break
        case 'A customer with the same email address already exists in an associated website.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Dirección de correo electrónico ya existe.',
          }))
          break
        case 'Hemos enviado un correo para completar el restablecimiento de su contraseña.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: error.errorMessage,
          }))
          break
        case 'Wrong email or password.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Correo o Contraseña incorrectos.',
          }))
          break
        case "Your account has been blocked after multiple consecutive login attempts. We've sent you an email with instructions on how to unblock it.":
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message:
              'Su cuenta ha sido bloqueada luego de múltiples intentos de inicio de sesión consecutivos. Hemos enviado un email con las instrucciones para desbloquearlo.',
          }))
          break
        case 'The user already exists.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'El correo con el que se quiere registrar ya existe.',
          }))
          break
        case 'PasswordStrengthError: Password is too weak':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message:
              'La contraseña debe tener al menos una letra minúscula (a-z), una letra mayúscula (A-Z) y un número del 0 al 9.',
          }))
          break
        case "Payload validation error: 'Object didn't pass validation for format email":
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'El email debe tener un formato válido.',
          }))
          break
        case 'Please verify your email before logging in.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Por favor verifique su correo electrónico antes de acceder.',
          }))
          break
        case 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message:
              'El mínimo de caracteres en la contraseña es 3. Debe incluir: minúsculas, mayúsculas, dígitos, caracteres especiales.',
          }))
          break
        case 'Specify the "currentPassword" value.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Por favor complete el campo Contraseña actual.',
          }))
          break
        case 'Specify the "newPassword" value.':
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: 'Por favor complete el campo Contraseña nueva.',
          }))
          break

        default:
          setState(u => ({
            ...u,
            open: true,
            severity: error.severity,
            message: error.errorMessage,
          }))
          break
      }
    } else if (m2ErrorAlert !== null && Object.keys(m2ErrorAlert).length) {
      switch (true) {
        case m2ErrorAlert?.errorMessage?.includes(
          'Product that you are trying to add is not available.'
        ):
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: 'Producto no disponible',
          }))
          break
        case m2ErrorAlert?.errorMessage?.includes('The requested qty is not available'):
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: 'La cantidad solicitada no está disponible',
          }))
          break
        case m2ErrorAlert.errorMessage ===
          'There was a problem with the subscription: This email address is already assigned to another user.':
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: 'El correo ya se encuentra registrado en el Newsletters.',
          }))
          break
        case m2ErrorAlert.errorMessage ===
          "The coupon code isn't valid. Verify the code and try again.":
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: 'El cupon ingresado es invalido.',
          }))
          break
        case m2ErrorAlert.errorMessage === 'Unauthorized' ||
          m2ErrorAlert.errorMessage === "The current customer isn't authorized.":
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: 'Su sesion ha caducado, vuelva a ingresar.',
          }))
          break
        case m2ErrorAlert?.errorMessage?.includes('The fewest you may purchase is'):
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: `La cantidad mínima de compra es: ${m2ErrorAlert.errorMessage.substring(
              m2ErrorAlert.errorMessage.length - 2
            )}`,
          }))
          break

        default:
          setState(m => ({
            ...m,
            open: true,
            severity: m2ErrorAlert.severity,
            message: m2ErrorAlert.errorMessage,
          }))
          break
      }
    } else if (m2SuccesAlert !== null && Object.keys(m2SuccesAlert).length) {
      switch (true) {
        case m2SuccesAlert.errorMessage === 'Thank you for your subscription.':
          setState(m => ({
            ...m,
            open: true,
            severity: m2SuccesAlert.severity,
            message: 'Registrado en Newsletters con exito.',
          }))
          break

        default:
          setState(m => ({
            ...m,
            open: true,
            severity: m2SuccesAlert.severity,
            message: m2SuccesAlert.errorMessage,
          }))
          break
      }
    }
    dispatch(setClearAlerts())
  }, [error, m2ErrorAlert, m2SuccesAlert])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setState({ ...state, open: false })
  }

  return (
    <Snackbar
      style={{ top: '140px', left: '45px' }}
      anchorOrigin={state.location}
      TransitionComponent={state.Transition}
      open={state.open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity={state.severity}>
        {state.message}
      </Alert>
    </Snackbar>
  )
}
