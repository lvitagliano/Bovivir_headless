import React, { useState, useEffect } from 'react'
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
import { ruleReq, ruleEmail, rulePassword, ruleString } from '../../constants/validationRules'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Fade, Modal, MenuItem, Popover, Avatar, IconButton } from '@material-ui/core'
import { login, createNewCustomer, setLoginRequest, logOut } from '../../store/actions/userAction'

const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'rgb(250 250 250)',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 5px 0px',
    borderRadius: '5px',
    border: 'none',
    padding: '16px 32px 24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
}))

const LoginIcon = props => {
  const dispatch = useDispatch()
  const is401 = useSelector(state => (state.m2.error?.status === undefined ? false : true))
  const {
    isLogedInM2,
    isLogedInAuth0,
    isCreatedInM2,
    isCreatedInAuth0,
    loginRequested,
  } = useSelector(state => state.user)
  const customerData = useSelector(state => state.m2.customerData)
  const { errors, handleSubmit, control, getValues } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })
  const [modal, setModal] = useState(false)

  const [optionLogOrSign, setOptionLogOrSign] = useState(1)
  const [logeado, setLogeado] = useState(isLogedInM2 && isLogedInAuth0)
  const [popOpenClose, setPopOpenClose] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const styles = useStyles()

  const onSubmit = (data, event) => {
    event.preventDefault()
    if (data.name && data.lastname) {
      dispatch(createNewCustomer(data))
    } else {
      dispatch(login(data))
    }
  }

  const openCloseModal = open => {
    setModal(open)
    dispatch(setLoginRequest(false))
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
      dispatch(getCustomerCartAndItems())
    } else {
      setLogeado(false)
    }
  }, [isLogedInM2, isLogedInAuth0])

  useEffect(() => {
    if (isCreatedInAuth0 && isCreatedInM2) {
      ;(async () => {
        const { email, password } = getValues(['email', 'password'])
        await dispatch(login({ email, password }))
        await dispatch(createCustomerCart())
      })()
    } else {
    }
  }, [isCreatedInM2, isCreatedInAuth0])

  useEffect(() => {
    if (logeado) {
      const purchase = async () => {
        await dispatch(setCustomerData())
        await dispatch(setCustomerWishList())
        await dispatch(setCustomerOrder())
      }
      purchase()
    }
  }, [logeado])

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
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)}>
        {optionLogOrSign === 2 ? (
          <ContainerOneRow>
            <ContainerOneColumn width="40%">
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
            <ContainerOneColumn width="40%">
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

        <ContainerOneColumn>
          <Controller
            as={InputForm}
            label="Contraseña"
            placeholder="********"
            defaultValue=""
            name="password"
            control={control}
            type="password"
            rules={optionLogOrSign === 2 ? rulePassword : ruleReq}
            error={errors.password && errors.password['message']}
          />
        </ContainerOneColumn>

        <ButtonWrapper>
          <Button text={optionLogOrSign === 2 ? 'Registrar' : 'Ingresar'} type="submit" />
        </ButtonWrapper>
      </form>
    </div>
  )

  const handleOpenClose = ev => {
    setAnchorEl(ev.currentTarget)
    setPopOpenClose(!popOpenClose)
  }

  return (
    <>
      {logeado ? (
        <Link href="/myProfile" as={`/myProfile`}>
          {customerData && Object.keys(customerData).length ? (
            <Avatar
              onClick={handleOpenClose}
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
        <IconButton onClick={() => openCloseModal(true)} size="medium">
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
