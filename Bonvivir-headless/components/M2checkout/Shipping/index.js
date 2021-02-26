import React, { useState, useEffect, useRef } from 'react'
import {
  SectionDataContainer,
  FormCard,
  ContainerOneRow,
  ContainerOneColumn,
} from '../../Commons/styles'
import { setFormError } from '../../../store/actions/m2Action'
import { useSelector, useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Select, FormControl } from '@material-ui/core'
import { ruleString } from '../../../constants/validationRules'
import { setM2Step, setBillingAndShipping, setShippingAddress } from '../../../store/actions/m2Action'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CheckIcon from '@material-ui/icons/Check';
import { estimateShippingMethods, getRegions } from '../../../services/Client/m2api'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    margin: '5px',
  },
  rootCheck: {
    margin: '5px',
    border: 'solid 2px',
    borderColor: 'rgb(241 109 46)'
  }
});

export const Shipping = ({ step, checkoutSubmit, nextStep, setSubmit }) => {
  const classes = useStyles();
  const { step2, step3, customerData } = useSelector(state => state.m2)
  const [shippingTypes, setShippingTypes] = useState([])
  const [spinnerMethod, setSpinnerMethod] = useState(false)
  const defaultShippingAddress = customerData?.addresses?.filter(
    adds => adds.id === parseInt(customerData.default_shipping)
  )?.[0]
  const [selectedAddress, setSelectedAddress] = useState(
    defaultShippingAddress || []
  )
  const { register, errors, setValue, control, watch, getValues, reset, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })
  const dispatch = useDispatch()
  const submitRef = useRef()
  const [SelectedShipping, setSelectedShipping] = useState([])

  const handleSelectedShipping = async ev => {
    setSelectedShipping(shippingTypes?.filter(
      adds => adds.method_title === ev.target.value
    )?.[0])
  }

  useEffect(() => {
    handleClick(selectedAddress)
  }, [])

  const handleClick = async e => {
    await dispatch(setShippingAddress(e))
    setSpinnerMethod(true)
    const res = await estimateShippingMethods(e?.id)
    console.log('res',res)
    if (res) {
      setShippingTypes(res)
    } else {
      console.log('No se encontraron costos de envio')
    }
    setSpinnerMethod(false)
  }

  useEffect(() => {
    dispatch(setFormError(errors))
  }, [Object.keys(errors).length])


  const onSubmit = async (data, e) => {
    if(Object.keys(selectedAddress).length > 0 && Object.keys(SelectedShipping).length > 0){
      e.preventDefault()
      await dispatch(setM2Step({ currentStep: parseInt(step.replace('step', '')), ...data }))
      await dispatch(setBillingAndShipping(selectedAddress, SelectedShipping))
      nextStep()
    }
    
  }

  useEffect(() => {
    if (checkoutSubmit && step === 'step1') {
      submitRef.current.click()
      setSubmit(false)
    }
  }, [checkoutSubmit])


  const addressChange = async (d, i) => {
    setSelectedAddress(d)
    handleClick(d)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionDataContainer margin="0" align="center">
        <FormCard width='96%' minWidth='480px'>
        <h2>Dirección de envío <span style={{ fontSize: '16px', fontWeight: '300' }}>(seleccionar una dirección)</span></h2>
          <ContainerOneColumn>
            <FormControl variant="outlined">
              {customerData?.addresses?.map((address, id) => {
                return (
                  <Card className={address.id === selectedAddress?.id ? classes.rootCheck : classes.root}>
                    <CardActionArea onClick={() => addressChange(address, id)}>
                      <CardHeader
                        action={
                          address.id === selectedAddress?.id && <IconButton aria-label="settings">
                            <CheckIcon style={{ color: 'rgb(241 109 46)' }} />
                          </IconButton>
                        }
                        title={address.street.reduce((ac, st) => `${ac} ${st} `, '') + ' - ' + address.city}
                        subheader={`${address.firstname} ${address.firstname} - Calle:${address.street[0]} - Provincia:${address.region.region} `}
                      />
                    </CardActionArea>
                  </Card>
                )
              })}
            </FormControl>
          </ContainerOneColumn>
          
          <ContainerOneRow>
            <ContainerOneColumn width="100%">
              <div style={{ display: selectedAddress.length === 0 ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ margin: '0px 10px' }}>Método de envío</h2>
             { spinnerMethod ? <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexFlow: 'column-reverse',
                        marginTop:'50px'
                      }}
                    ><CircularProgress />
                 </div> :
                shippingTypes?.map((item, i) => (
                  <>
                  
                    <div
                      style={{
                        border: '2px solid #e8e8e8',
                        borderRadius: '5px',
                        margin: '10px',
                        padding: '7px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#333',
                      }}
                    >
                      <input
                        style={{ margin: '5px' }}
                        type="radio"
                        id={item.method_title}
                        value={item.method_title}
                        onChange={e => handleSelectedShipping(e)}
                        checked={SelectedShipping.method_title === item.method_title}
                      />
                      <br />
                      <label style={{ margin: '5px' }} for="male">
                        {item.method_title}
                      </label>
                      <br />
                      <b style={{ margin: '5px' }}>${item.base_amount}</b>
                      <p style={{ margin: '0px 15px' }}>{item?.carrier_title}</p>
                    </div>
                  </>
                ))}
              </div>
            </ContainerOneColumn>
          </ContainerOneRow>

          <input hidden ref={register} name="step" defaultValue={step} />
          <input
            hidden
            ref={register}
            name="id"
            defaultValue={step3.selectedAddress || defaultShippingAddress?.id || 0}
          />
        </FormCard>
      </SectionDataContainer>
      <input ref={submitRef} type="submit" style={{ display: 'none' }} />
    </form>
  )
}
