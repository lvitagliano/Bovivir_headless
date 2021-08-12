import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SectionDataContainer, FormCard, ContainerOneColumn, TarjImg } from '../../Commons/styles'
import { FormControl } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  setM2Step,
  setPaymentMethod,
  setBillingAddress,
  setPaymentMethods,
  clearFlagCustomerCart,
} from '../../../store/actions/m2Action'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CardHeader from '@material-ui/core/CardHeader'
import CheckIcon from '@material-ui/icons/Check'
import Button from '../../Commons/Button'

const useStyles = makeStyles({
  root: {
    margin: '5px',
  },
  rootCheck: {
    margin: '5px',
    border: 'solid 2px',
    borderColor: 'rgb(241 109 46)',
  },
})

export const PaymentData = ({ step, checkoutSubmit, nextStep, setSubmit, prevStep }) => {
  const classes = useStyles()
  const router = useRouter()
  const { register, handleSubmit } = useForm({ mode: 'all', reValidateMode: 'onChange' })
  const { paymentURL, paymentMethodData, step2, step4, customerData } = useSelector(
    state => state.m2
  )
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodData?.payment_methods || []
  )
  const img = '/images/tarjMP.jpg'
  const submitRef = useRef()
  const defaultBillingAddress =
    customerData?.addresses?.filter(
      adds => adds.id === parseInt(customerData.default_billing)
    )?.[0] || step2
  const [selectedAddress, setSelectedAddress] = useState(defaultBillingAddress)
  const dispatch = useDispatch()
  const [SelectedMethod, setSelectedMethod] = useState(
    paymentMethodData?.payment_methods?.[0] || ''
  )
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data, e) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(setM2Step({ currentStep: parseInt(step.replace('step', '')), ...data }))
    const paymentRes = await dispatch(setPaymentMethod(data.paymentMethod))

    //TO-DO VER CON DAMIAN ... EL CARRO ROMPE ANTES DE RECIBIR RESPUESTA DE ML SUCCESS O FAIL (TEMA LYRACON)
    await dispatch(clearFlagCustomerCart())

    paymentRes ? router.push(paymentRes, paymentRes) : router.push('/')

    setLoading(false)
  }

  useEffect(() => {
    if (checkoutSubmit && step === 'step4') {
      submitRef.current.click()
      setSubmit(false)
    }
  }, [checkoutSubmit])

  useEffect(() => {
    dispatcherMethod(paymentMethodData?.payment_methods?.[0].code || '')
    dispatcherBillingAddress(defaultBillingAddress)
  }, [])

  const handleSelectPaymentMethod = async ev => {
    setSelectedMethod(selectedPaymentMethod?.filter(adds => adds.code === ev.target.value)?.[0])

    dispatcherMethod(ev.target.value)
  }

  const dispatcherMethod = async dis => {
    await dispatch(setPaymentMethods(dis))
  }

  const dispatcherBillingAddress = async dis => {
    await dispatch(setBillingAddress(dis))
  }

  const addressChange = async (d, i) => {
    setSelectedAddress(d)
    dispatcherBillingAddress(d)
  }

  const SelectPaymentAddress = () => (
    <FormControl variant="outlined">
      <h4>
        Dirección de facturación{' '}
        <span style={{ fontSize: '15px', fontWeight: '300' }}>(seleccionar una dirección)</span>
      </h4>
      {customerData?.addresses?.map((address, id) => {
        return (
          <Card
            key={id}
            className={address.id === selectedAddress.id ? classes.rootCheck : classes.root}
          >
            <CardActionArea onClick={() => addressChange(address, id)}>
              <CardHeader
                action={
                  address.id === selectedAddress.id && (
                    <CheckIcon
                      style={{ color: 'rgb(241 109 46)', marginTop: '1rem', marginRight: '0.5rem' }}
                    />
                  )
                }
                subheader={`${address.firstname} ${address.lastname} - Calle: ${
                  address.street[0]
                } - Ciudad: ${address.city} ${
                  address.region?.region ? `- Provincia: ${address.region?.region}` : ''
                } `}
              />
            </CardActionArea>
          </Card>
        )
      })}
    </FormControl>
  )

  const GridPaymentMethod = SelectedMethods => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ margin: '0px 10px' }}>Seleccione un metodo de pago *</h2>

      {selectedPaymentMethod?.map((item, id) => (
        <div
          key={id}
          className="container"
          style={{
            borderBottom: '1px solid',
            borderRadius: '1px',
            margin: '10px',
            padding: '7px',
            color: '#333',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              style={{ margin: '5px' }}
              type="radio"
              id={item.code}
              value={item.code}
              onChange={e => handleSelectPaymentMethod(e)}
              checked={SelectedMethods.code === item.code}
            />

            <br />
            <label style={{ margin: '5px' }}>{item.title}</label>
            <br />
            <br />
          </div>
          {SelectedMethods.code === item.code && item.code === 'mercadopago_standard' && (
            <TarjImg src={img} />
          )}
          {SelectedMethods.code === item.code && <SelectPaymentAddress />}
        </div>
      ))}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionDataContainer margin="0" align="center">
        <FormCard width="96%" minWidth="360px" padding="20px 5% 20px 5%">
          <ContainerOneColumn width="100%">{GridPaymentMethod(SelectedMethod)}</ContainerOneColumn>
          <input hidden ref={register} name="step" defaultValue={step} />
          <input hidden ref={register} name="paymentMethod" defaultValue={SelectedMethod.code} />
        </FormCard>
      </SectionDataContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => prevStep()}
          text="Volver"
          style={{ display: 'flex', margin: '30px 10px' }}
        ></Button>

        <Button
          // onClick={handleClick}
          text="Continuar"
          style={{ display: 'flex', margin: '30px 10px' }}
          loading={loading}
        ></Button>
      </div>
    </form>
  )
}
