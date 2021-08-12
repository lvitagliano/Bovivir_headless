import GoogleMap from '../MapContainer/GoogleMap'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  ruleNumberNoRequired,
  ruleString,
  ruleNumber,
  ruleApartmNoRequired,
  ruleReqUndefined,
  ruleNumberAndString,
  ruleReq,
} from '../../constants/validationRules'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'
import { Select, FormControl, Switch, CircularProgress, Backdrop, Grid } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCustomerAddressM2Action,
  updateCustomerAddressM2Action,
} from '../../store/actions/m2Action'
import { standardizeKiwiApiClient } from '../../services/Client/kiwiApi'

// STYLE OF SWITCH
const SwitchStyled = withStyles({
  switchBase: {
    color: '#762057',
    '&$checked': {
      color: '#762057',
    },
    '&$checked + $track': {
      backgroundColor: '#762057',
    },
  },
  checked: {},
  track: {},
})(Switch)

// USESTYLES
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  addressNumbering: {
    display: 'flex',
  },
}))

export default function FormAddress({ AddressFormState, redirectionHandler }) {
  const classes = useStyles()
  // REDUX
  const dispatch = useDispatch()
  const stateForm = AddressFormState?.idAddress
    ? useSelector(state =>
        state.m2.customerData?.addresses?.find(i => i.id === AddressFormState.idAddress)
      )
    : useSelector(state => state.m2.customerData)

  // STATES
  const [default_shipping, setDefault_shipping] = useState(
    !stateForm.addresses && stateForm?.default_shipping ? true : false
  )
  const [default_billing, setDefault_billing] = useState(
    !stateForm.addresses && stateForm?.default_billing ? true : false
  )
  const [loading, setLoading] = useState(false)
  const [coordinates, setCoordinates] = useState(null)
  const [hiddenForm, setHiddenForm] = useState(true)
  const [executedValidationAddress, setExecutedValidationAddress] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // USEFORM
  const { errors, handleSubmit, control, getValues, setValue, clearErrors } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data, event) => {
    event.preventDefault()

    if (!executedValidationAddress) {
      return
    }
    setLoadingSubmit(true)
    const formularioData = {
      comments: data.comments,
      city: data.city,
      region: data.state,
      district: data.district,
      street: data.street,
      telephone: data.telephone,
      postcode: data.postcode,
      firstname: data.firstname,
      lastname: data.lastname,
      default_shipping: default_shipping || false,
      default_billing: default_billing || false,
      covedisa_latitude: coordinates?.covedisa_latitude || '',
      covedisa_longitude: coordinates?.covedisa_longitude || '',
    }
    if (AddressFormState.action === 'Agregar') {
      await dispatch(addCustomerAddressM2Action(formularioData))
    } else {
      formularioData.id = AddressFormState.idAddress
      await dispatch(updateCustomerAddressM2Action(formularioData))
    }
    redirectionHandler(false)
    setLoadingSubmit(false)
  }

  const handleBackCancel = () => {
    redirectionHandler(false)
  }

  const onBlurPostCode = async e => {
    e.preventDefault()
    let obj = {
      street: getValues('street[0]'),
      doorNumber: getValues('street[1]'),
      zipCode: getValues('postcode'),
    }
    let validateDifferentNull = Object.values(obj)
    if (!validateDifferentNull.includes('')) {
      setLoading(true)
      try {
        const { status, data } = await standardizeKiwiApiClient(obj)
        if (status === 200) {
          setValue('district', data.result.district)
          setValue('city', data.result.city)
          setValue('state', data.result.state)
          setValue('comments', data.result.crossStreet?.join(' y '))
          setValue('street[0]', data.result.street)

          clearErrors('city')

          //
          setCoordinates({
            covedisa_latitude: data.result.geo.y,
            covedisa_longitude: data.result.geo.x,
          })
        } else {
          {
            alert('su direccion no pudo ser encontrada por favor ingrese mas datos')
            setCoordinates(null)
          }
        }
      } catch (error) {
        alert('su direccion no pudo ser encontrada por favor ingrese mas datos')
        setCoordinates(null)
      } finally {
        setExecutedValidationAddress(true)
        setHiddenForm(false)
      }
    }
    setLoading(false)
  }

  const onClearClick = e => {
    e.preventDefault()
    setCoordinates(null)
    setExecutedValidationAddress(false)
    setHiddenForm(true)
    clearErrors('city')
    setValue('comments', '')
    setValue('state', '')
    setValue('district', '')
    setValue('firstName', '')
    setValue('lastName', '')
    setValue('postcode', '')
    setValue('telephone', '')
    setValue('city', '')
    setValue('street', ['', '', '', ''])
  }

  const disabledButtonForErrors = Object.keys(errors).length !== 0
  const disabledInputForValidateAddress = executedValidationAddress && coordinates !== null

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
            <div style={{ borderBottom: '1px solid #ccc', marginBottom: '2em' }}>
              <h3 style={{ color: '#47484A' }}>Contacto</h3>
            </div>
            <Controller
              as={InputForm}
              label="Nombre*"
              placeholder="Ingrese su nombre"
              defaultValue={stateForm?.firstname || ''}
              name="firstname"
              control={control}
              type="firstname"
              rules={ruleString()}
              error={errors.firstname && errors.firstname['message']}
            />
            <Controller
              as={InputForm}
              label="Apellido*"
              placeholder="Ingrese su apellido"
              defaultValue={stateForm?.lastname || ''}
              name="lastname"
              control={control}
              type="lastname"
              rules={ruleString()}
              error={errors.lastname && errors.lastname['message']}
            />
            <Controller
              as={InputForm}
              label="Telefono*"
              placeholder="Ingrese su telefono"
              defaultValue={stateForm?.telephone || ''}
              name="telephone"
              control={control}
              rules={ruleNumber(15, 10)}
              error={errors.telephone && errors.telephone['message']}
            />
            <div
              style={{
                width: '100%',
                maxHeight: '100%',
                position: 'relative',
              }}
            >
              {coordinates !== null ? (
                <GoogleMap
                  heightContainer="270px"
                  zoom={15}
                  style={{ width: '200px', height: '250px' }}
                  showingInfoWindow={false}
                  point={{
                    lat: coordinates.covedisa_latitude,
                    lng: coordinates.covedisa_longitude,
                  }}
                />
              ) : null}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <div style={{ borderBottom: '1px solid #ccc', marginBottom: '2em' }}>
              <h3 style={{ color: '#47484A' }}>Direccion</h3>
            </div>
            <Controller
              as={InputForm}
              label="Calle*"
              disabled={disabledInputForValidateAddress}
              placeholder="Ingrese su calle"
              defaultValue={stateForm?.street?.[0] || ''}
              name="street[0]"
              control={control}
              rules={ruleReq}
              error={errors.street?.[0] && errors.street?.[0]['message']}
            />
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Controller
                  as={InputForm}
                  label="Altura*"
                  disabled={disabledInputForValidateAddress}
                  placeholder="Numero de calle"
                  defaultValue={stateForm?.street?.[1] || ''}
                  name="street[1]"
                  control={control}
                  rules={ruleNumber(5)}
                  error={errors.street?.[1] && errors.street?.[1]['message']}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  as={InputForm}
                  label="CP*"
                  disabled={disabledInputForValidateAddress}
                  placeholder="Codigo postal"
                  defaultValue={stateForm?.postcode || ''}
                  name="postcode"
                  control={control}
                  rules={ruleNumber(5, 3)}
                  error={errors.postcode && errors.postcode['message']}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Controller
                  as={InputForm}
                  label="Piso"
                  placeholder="Ingrese su piso"
                  defaultValue={stateForm?.street?.[2] || ""}
                  name="street[2]"
                  control={control}
                  rules={ruleApartmNoRequired}
                  error={errors.street?.[2] && errors.street?.[2]['message']}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  as={InputForm}
                  label="Depto."
                  placeholder="Ingrese su departamento"
                  defaultValue={stateForm?.street?.[3] || ""}
                  name="street[3]"
                  control={control}
                  rules={ruleApartmNoRequired}
                  error={errors.street?.[3] && errors.street?.[3]['message']}
                />
              </Grid>
            </Grid>
            <div style={{ display: hiddenForm && 'none' }}>
              <Controller
                as={InputForm}
                disabled={disabledInputForValidateAddress}
                label="Barrio"
                placeholder={disabledInputForValidateAddress ? '' : 'Ingrese su barrio'}
                defaultValue={stateForm?.district || ''}
                name="district"
                control={control}
              />
              <Controller
                as={InputForm}
                label={`Ciudad${executedValidationAddress ? '*' : ''} `}
                disabled={disabledInputForValidateAddress && getValues('city').lenght !== 0}
                placeholder="Ingrese su ciudad"
                defaultValue={stateForm?.city || ''}
                name="city"
                control={control}
                rules={executedValidationAddress && ruleString(30)}
                error={errors.city && errors.city['message']}
              />
              <Controller
                as={InputForm}
                disabled={disabledInputForValidateAddress}
                label="Provincia"
                placeholder="Ingrese su provincia"
                defaultValue={stateForm?.state || ''}
                name="state"
                control={control}
              />
              <Controller
                as={InputForm}
                disabled={disabledInputForValidateAddress}
                label="Entre calles"
                placeholder="Ingrese entre calles"
                defaultValue={stateForm?.comments || ''}
                name="comments"
                control={control}
              />
              <div>
                <SwitchStyled
                  checked={default_shipping}
                  onChange={() => setDefault_shipping(!default_shipping)}
                  name="default_shipping"
                />
                <b>Direccion de envio por defecto</b>
              </div>
              <div>
                <SwitchStyled
                  checked={default_billing}
                  onChange={() => setDefault_billing(!default_billing)}
                  name="default_billing"
                />
                <b>Direccion de facturacion por defecto</b>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            margin="20px 0 10px 0"
            text={'Cancelar'}
            type="button"
            onClick={handleBackCancel}
          />
          {executedValidationAddress ? (
            <>
              <Button text={'Limpiar'} onClick={e => onClearClick(e)} type="button" />
              <Button
                disabled={disabledButtonForErrors}
                margin="20px 0 10px 0"
                text={AddressFormState?.action}
                type="submit"
                loading={loadingSubmit}
              />
            </>
          ) : (
            <Button
              disabled={disabledButtonForErrors}
              margin="20px 0 10px 0"
              text={'Validar'}
              onClick={e => onBlurPostCode(e)}
            />
          )}
        </div>
      </form>
    </>
  )
}
