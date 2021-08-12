import * as types from '../actionTypes'
import {
  createCustomerAuth0,
  loginCustomerAuth0,
  logOutCustomerAuth0,
  forgotPasswordAuth0,
  verifyEmailAuth0,
  sendEmailVerification,
} from '../../services/Client/auth0api'
import { createCustomerM2 } from '../../services/Client/m2api'
import { delState } from '../../services/Client/redisApi'
import { getAuth0Token, setSuccess } from './m2Action'
import { removeBearerToken } from '../../services/Client/GraphQl/m2/GQLAPI'
import {
  generateTokenClient,
  validateEmailIsAvailableM2Client,
} from '../../services/Client/GraphQl/m2GQL'

export const login = dataForm => async dispatch => {
  dispatch(setUserRequest())
  try {
    const { data } = await validateEmailIsAvailableM2Client(dataForm)
    // si data es true NO EXISTE EN MAGENTO
    const verify = await verifyEmailAuth0(dataForm)
    // si verify es true EXISTE EN AUTH0

    // EXISTE EN AMBOS LADOS M2 y AUTH0
    if (!data && verify) {
      const loginResult = await loginCustomerAuth0(dataForm)
      if (loginResult.data.success !== true && loginResult.status !== 200) {
        if (loginResult.data.result === 'Please verify your email before logging in.') {
          await sendEmailVerification(dataForm)
        }
        dispatch(setUserError(loginResult.data.result))
      } else {
        const { access_token } = loginResult.data.result
        await dispatch(setAuth0LoginSucces(loginResult.data.result))
        await dispatch(loginM2({ access_token }))
      }
    } // NO EXISTE en MAGENTO y NO EXISTE EN AUTH0
    else if (data && !verify) {
      dispatch(setUserError('Usuario no existe, por favor ir al registro.'))
    } // PUEDE EXISTIR EN ALGUNO DE LOS 2
    else {
      await dispatch(createNewCustomer(dataForm, true))
    }
  } catch (err) {
    dispatch(setUserError(err))
  }
}

export const createNewCustomer = (dataForm, flag) => async dispatch => {
  dispatch(setUserRequest())

  const { data } = await validateEmailIsAvailableM2Client(dataForm)

  // si data es true NO EXISTE EN MAGENTO
  const verify = await verifyEmailAuth0(dataForm)
  // si verify es true EXISTE EN AUTH0

  // NO EXISTE en MAGENTO y NO EXISTE EN AUTH0
  if (data && !verify) {
    // crea y valida que no haya errores en AUTH0
    const resAuth0 = await createCustomerAuth0(dataForm)
    if (!resAuth0.data.success) {
      return dispatch(setUserError(resAuth0.data.result))
    }

    // crea y valida que no haya errores en MAGENTO
    const resM2newCustomer = await createCustomerM2(dataForm)
    if (resM2newCustomer.status === 400) {
      return dispatch(setUserError(resM2newCustomer.data?.result))
    }

    dispatch(newCustomerM2Succes())
    dispatch(
      setSuccess({
        severity: 'success',
        errorMessage: resAuth0.data.result,
        status: 200,
      })
    )
  }

  // EXISTE EN MAGENTO y NO EXISTE EN AUTH0
  if (!data && !verify) {
    if (flag) {
      // NO ENVIAR MAIL DE VALIDAR CUENTA EN AUTH0 y HACERLO BAJO PERFIL (VERIFICAR AL USER EN AUTH0)
      dataForm = {
        ...dataForm,
        verify_email: false,
        email_verified: true,
      }

      const resAuth0Validation = await createCustomerAuth0(dataForm)
      // SI LA CONTRASENA EN MAGENTO2 ES DEBIL (MODULO PARA CAMBIARLA)
      // - EVALUAR LA RESPUESTA DE AUTH0 (errro de "PasswordStrengthError: Password is too weak")
      if (
        !resAuth0Validation.data.success &&
        resAuth0Validation.data.result === 'PasswordStrengthError: Password is too weak'
      ) {
        // - Logear con mail y constrasena en MAGENTO (unica vez excepcion)
        await generateTokenClient({ email: dataForm.email, password: dataForm.password }).then(
          // - ABRIR MODAL PARA CAMBIAR PASSWORD
          dispatch(setOpenTooWeakDispatch(true))
        )
      } else await dispatch(login(dataForm))
    } else {
      // crea y valida que no haya errores en AUTH0
      let resAuth0 = await createCustomerAuth0(dataForm)
      if (!resAuth0.data.success) {
        return dispatch(setUserError(resAuth0.data.result))
      }

      dispatch(newCustomerM2Succes())
      dispatch(
        setSuccess({
          severity: 'success',
          errorMessage: resAuth0.data.result,
          status: 200,
        })
      )
    }
  }

  // EXISTE EN AUTH0 y NO EXISTE EN MAGENTO
  if (data && verify) {
    // crea y valida que no haya errores en MAGENTO
    const resM2newCustomer = await createCustomerM2({
      email: dataForm.email,
      name: dataForm?.name || ' ',
      lastname: dataForm?.lastname || ' ',
    })
    if (resM2newCustomer.status === 400) {
      return dispatch(setUserError(resM2newCustomer.data?.result))
    }
    flag && (await dispatch(login(dataForm)))
  }

  // EXISTE EN AMBOS LADOS M2 y AUTH0
  if (!data && verify) {
    dispatch(setUserError('Un usuario con el mismo correo electronico ya existe.'))
  }
}

export const logOut = () => async dispatch => {
  dispatch(setUserRequest)
  try {
    const resAuth0 = await logOutCustomerAuth0()
    if (resAuth0.status !== 200) {
      dispatch(setUserError(resAuth0.data.message))
    }
    await dispatch(logout())
    await delState()
    await removeBearerToken()
  } catch (err) {
    dispatch(setUserError(err))
  }
}

export const forgotPassword = email => async dispatch => {
  dispatch(setUserRequest)
  try {
    const resAuth0 = await forgotPasswordAuth0({ email })
    if (resAuth0.status !== 200) {
      dispatch(setUserError(resAuth0.data.message))
    }

    await dispatch(setForgotPasswordSucess(resAuth0.data.result))
  } catch (err) {
    dispatch(setUserError(err))
  }
}

const loginM2 = token => async dispatch => {
  dispatch(setUserRequest)
  try {
    const res = await dispatch(getAuth0Token(token))
    await dispatch(setM2LoginSucces(res.data))
  } catch (err) {
    dispatch(setUserError(err))
  }
}

export const setRegisteredUserToNewsletter = registred => ({
  type: types.SET_REGISTRED_USER_TO_NEWSLETTER,
  payload: registred,
})

export const setLoginRequest = state => ({
  type: types.SET_LOGIN_REQUEST,
  payload: state,
})

const setUserRequest = () => ({
  type: types.SET_USER_REQUEST,
})

export const setUserError = error => ({
  type: types.SET_USER_ERROR,
  payload: error,
})

const setM2LoginSucces = token => ({
  type: types.SET_M2_LOGIN_SUCCESS,
  payload: token,
})

const setAuth0LoginSucces = tokens => ({
  type: types.SET_AUTH0_LOGIN_SUCCESS,
  payload: tokens,
})

const newCustomerM2Succes = () => ({
  type: types.NEW_M2_SUCCESS,
})

const newCustomerAuth0Succes = () => ({
  type: types.NEW_AUTH0_SUCCESS,
})

const logout = () => ({
  type: types.LOGOUT,
})

const setForgotPasswordSucess = msg => ({
  type: types.AUTH0_FORGOT_PASSWORD_SUCCESS,
  payload: msg,
})

export const setOpenTooWeakDispatch = value => ({
  type: types.OPENTOOWEAK,
  payload: value,
})
