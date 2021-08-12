import React, { useState, useEffect, useContext, useRef } from 'react'
import Link from 'next/link'
import {
  setCustomerOrder,
  setCustomerData,
  getCustomerCartAndItems,
  createCustomerCart,
  setCustomerWishList,
} from '../../store/actions/m2Action'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonWrapper } from './styles'
import { ContainerOneColumn, ContainerOneRow } from '../Commons/styles'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'
import { useForm, Controller } from 'react-hook-form'
import {
  ruleReq,
  ruleEmail,
  rulePassword,
  ruleString,
  rulePasswordConfirm,
} from '../../constants/validationRules'
import PersonIcon from '@material-ui/icons/Person'
import { Tabs, Tab, Fade, Modal, Avatar, IconButton } from '@material-ui/core'
import {
  login,
  createNewCustomer,
  setLoginRequest,
  logOut,
  forgotPassword,
} from '../../store/actions/userAction'
import { Context } from '../../services/Client/context/Context'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'
import { ruleNumber, ruleReqUndefined, ruleReqDatePicker } from '../../constants/validationRules'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

// Constants for selectsForm components
const genders = {
  inputName: 'gender',
  title: 'Genero',
  subTitle: 'Seleccione...',
  options: [
    {
      name: 'Masculino',
      value: 1,
    },
    {
      name: 'Femenino',
      value: 2,
    },
  ],
}

const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    width: 420,
    backgroundColor: 'rgb(250 250 250)',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 5px 0px',
    borderRadius: '5px',
    border: 'none',
    padding: '16px 32px 24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    '& span.MuiTabs-indicator': {
      backgroundColor: '#762057',
    },
    '& .Mui-selected': {
      color: '#762057',
    },
  },
}))

// USESTYLES
const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#762057',
    },
  },
})

const LoginIcon = ({ handleClickClose }) => {
  const dispatch = useDispatch()
  const is401 = useSelector(state => (state.m2.error?.status === 401 ? true : false))
  const {
    isLogedInM2,
    isLogedInAuth0,
    isCreatedInM2,
    isCreatedInAuth0,
    loginRequested,
  } = useSelector(state => state.user)
  const customerData = useSelector(state => state.m2.customerData)
  const { modal, setModal } = useContext(Context)

  const [optionLogOrSign, setOptionLogOrSign] = useState(1)
  const [logeado, setLogeado] = useState(isLogedInM2 && isLogedInAuth0)
  const [popOpenClose, setPopOpenClose] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const styles = useStyles()
  const [loading, setLoading] = useState(false)
  const [genderValue, setGenderValue] = useState('undefined')
  const [datePickerError, setDatePickerError] = useState(null)

  // USEFORM
  const { errors, handleSubmit, control, getValues, setValue, formState, watch } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })
  
  const onSubmit = async (data, event) => {
    setLoading(true)
    event.preventDefault()
    const submit = async () => {
      switch (optionLogOrSign) {
        case 1:
          await dispatch(login(data))
          break
        case 2:
          await dispatch(
            createNewCustomer({ ...data, dob: new Date(data.dob).toLocaleDateString('en-US') })
          )
          break
        case 3:
          await dispatch(forgotPassword(data.email))
          setOptionLogOrSign(1)
          openCloseModal(false)
          break
      }
    }

    await submit()
    setLoading(false)
  }

  const openCloseModal = open => {
    setModal(open)
    setOptionLogOrSign(1)
    dispatch(setLoginRequest(false))
  }

  const handleForgotPassword = e => {
    e.preventDefault()
    setOptionLogOrSign(3)
  }

  useEffect(() => {
    if (is401) {
      dispatch(logOut())
      openCloseModal(is401)
    }
  }, [is401])

  useEffect(() => {
    if (isLogedInM2 && isLogedInAuth0) {
      openCloseModal(false)
      dispatch(setLoginRequest(false))
      setLogeado(true)
    } else setLogeado(false)
  }, [isLogedInM2, isLogedInAuth0])

  useEffect(() => {
    if (logeado) {
      const purchase = async () => {
        await dispatch(setCustomerData())
        await dispatch(createCustomerCart())
        await dispatch(setCustomerWishList())
        await dispatch(setCustomerOrder())
      }
      purchase()
    }
  }, [logeado])

  // SELECT STATE COMPONENT
  const handleSelectState = e => {
    switch (true) {
      case e.target.name === 'gender':
        setGenderValue(e.target.value)
        setValue('gender', e.target.value)
        break
      case e.target.name === 'taxvat_type':
        setTaxvat_typeValue(e.target.value)
        setValue('taxvat_type', e.target.value)
        break
    }
  }
  const SelectState = ({ onChange, value, object, selectValue = 'undefined' }) => {
    return (
      <FormControl variant="outlined">
        <label style={{ fontWeight: 'bold', color: '#762057' }}>{object.title}</label>
        <Select
          name={object.inputName}
          value={selectValue}
          onChange={e => handleSelectState(e)}
          style={{ height: '32px' }}
        >
          <MenuItem value={'undefined'}>{object.subTitle}</MenuItem>
          {object.options.map((item, index) => (
            <MenuItem key={item.value} value={item.value} selected={item.value === value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  const currentDate = new Date()
  const calculateOlderAge = new Date().setFullYear(new Date().getFullYear() - 18)

  const body = (
    <div className={styles.modal}>
      <Tabs
        value={optionLogOrSign}
        onChange={(event, newValue) => setOptionLogOrSign(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Ingresar" value={1} />
        <Tab label="Registrar" value={2} />
        {optionLogOrSign === 3 && <Tab label="Olvidé contraseña" value={3} />}
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)}>
        {optionLogOrSign === 2 ? (
          <>
            <ContainerOneRow>
              <ContainerOneColumn width="45%">
                <Controller
                  as={InputForm}
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  defaultValue=""
                  name="name"
                  control={control}
                  type="name"
                  rules={ruleString()}
                  error={errors.name && errors.name['message']}
                />
              </ContainerOneColumn>
              <ContainerOneColumn width="45%">
                <Controller
                  as={InputForm}
                  label="Apellido"
                  placeholder="Ingrese su apellido"
                  defaultValue=""
                  name="lastname"
                  control={control}
                  type="lastname"
                  rules={ruleString()}
                  error={errors.lastname && errors.lastname['message']}
                />
              </ContainerOneColumn>
            </ContainerOneRow>
            <ContainerOneRow>
              <ContainerOneColumn width="40%" margin="0px 0px 5px">
                <Controller
                  control={control}
                  defaultValue={genderValue}
                  name="gender"
                  as={SelectState({
                    value: genderValue,
                    object: genders,
                    selectValue: genderValue,
                  })}
                  rules={ruleReqUndefined}
                  error={errors.gender && errors.gender['message']}
                />
              </ContainerOneColumn>
              <ContainerOneColumn width="55%" margin="0px 0px 5px">
                <Controller
                  width="100%"
                  as={InputForm}
                  label="Numero de Identificación"
                  placeholder="Ingrese su Numero de documento"
                  defaultValue={''}
                  name="taxvat"
                  control={control}
                  type="taxvat"
                  rules={ruleNumber(8, 7)}
                  error={errors.taxvat && errors.taxvat['message']}
                />
              </ContainerOneColumn>
            </ContainerOneRow>

            <ContainerOneRow>
              <ContainerOneColumn width="100%" margin="5px 0px 0px">
                <Controller
                  width="100%"
                  control={control}
                  name="dob"
                  rules={ruleReqDatePicker}
                  defaultValue={currentDate}
                  render={({ onChange, value }) => (
                    <>
                      <label style={{ fontWeight: 'bold', color: '#762057' }}>
                        Fecha de Nacimiento
                      </label>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                          <KeyboardDatePicker
                            size="small"
                            invalidDateMessage="Fecha invalida"
                            inputVariant="outlined"
                            maxDateMessage="Debes ser mayor de 18 años."
                            format="dd/MM/yyyy"
                            maxDate={calculateOlderAge}
                            onError={(error, value) => setDatePickerError(error)}
                            value={value}
                            onChange={e => {
                              e === null ? onChange('Invalid Date') : onChange(e)
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            InputAdornmentProps={{ position: 'start' }}
                            cancelLabel={'Cancelar'}
                            okLabel={'Confirmar'}
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </>
                  )}
                />
              </ContainerOneColumn>
            </ContainerOneRow>
          </>
        ) : null}
        <ContainerOneColumn>
          <Controller
            as={InputForm}
            label="Correo Electronico"
            placeholder="Ingrese su correo electronico"
            defaultValue=""
            name="email"
            control={control}
            type="email"
            rules={ruleEmail}
            error={errors.email && errors.email['message']}
          />
        </ContainerOneColumn>

        {optionLogOrSign !== 3 && (
          <ContainerOneColumn>
            <Controller
              as={InputForm}
              label="Contraseña"
              placeholder="********"
              defaultValue=""
              name="password"
              control={control}
              type="password"
              icon={true}
              rules={ruleReq}
              error={errors.password && errors.password['message']}
            />
          </ContainerOneColumn>
        )}

        {optionLogOrSign === 2 && (
          <ContainerOneColumn>
            <Controller
              as={InputForm}
              label="Confirmar Contraseña"
              placeholder="********"
              defaultValue=""
              name="passwordConfirm"
              control={control}
              type="password"
              icon={true}
              rules={rulePasswordConfirm(watch('password'))}
              error={errors.passwordConfirm && errors.passwordConfirm['message']}
            />
          </ContainerOneColumn>
        )}
        {optionLogOrSign === 1 && <a onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>}

        <ButtonWrapper>
          <Button
            loading={loading}
            text={
              optionLogOrSign === 2 ? 'Registrar' : optionLogOrSign === 3 ? 'Recuperar' : 'Ingresar'
            }
            type="submit"
          />
        </ButtonWrapper>
      </form>
    </div>
  )

  const handleOpenClose = ev => {
    setAnchorEl(ev?.currentTarget)
    setPopOpenClose(!popOpenClose)
    handleClickClose()
  }

  const handleClickWithOutLogin = () => {
    handleClickClose()
    openCloseModal(true)
  }

  return (
    <>
      {logeado ? (
        <Link href="/myProfile" as={`/myProfile`}>
          {customerData && Object.keys(customerData).length ? (
            <Avatar
              onClick={() => handleOpenClose()}
              style={{ backgroundColor: 'green', cursor: 'pointer', width: '48px', height: '48px' }}
            >
              {`${customerData.firstname.substr(0, 1).toUpperCase()}${customerData.lastname
                .substr(0, 1)
                .toUpperCase()}`}
            </Avatar>
          ) : (
            <PersonIcon style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: 25, cursor: 'pointer' }} />
          )}
        </Link>
      ) : (
        <IconButton onClick={() => handleClickWithOutLogin()} size="medium">
          <PersonIcon style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: 25, cursor: 'pointer' }} />
        </IconButton>
      )}
      <Modal open={modal || loginRequested} onClose={() => openCloseModal(false)}>
        <Fade in={modal || loginRequested}>{body}</Fade>
      </Modal>
    </>
  )
}

export default LoginIcon
