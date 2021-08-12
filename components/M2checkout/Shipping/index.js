import React, { useState, useEffect, useRef, Fragment } from 'react'
import {
  SectionDataContainer,
  FormCard,
  ContainerOneRow,
  ContainerOneColumn,
} from '../../Commons/styles'
import Button from '../../Commons/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FormControl, CardActionArea, Card, Modal, Backdrop, Fade } from '@material-ui/core'
import {
  setM2Step,
  setBillingAndShipping,
  setShippingAddress,
  setShippingViewAddress,
  setFormError,
  setSelectedShippingAction,
} from '../../../store/actions/m2Action'
import { makeStyles } from '@material-ui/core/styles'
import CardHeader from '@material-ui/core/CardHeader'
import CheckIcon from '@material-ui/icons/Check'
import { getPointHoP, estimateShippingMethodsByPostCode } from '../../../services/Client/m2api'
import CircularProgress from '@material-ui/core/CircularProgress'
import MapContainer from '../../MapContainer'
import FormAddress from '../../formAddressCustomerM2'
import FormCustomerData from '../../formCustomerDataM2'
import Grid from '@material-ui/core/Grid'
import { useRouter } from 'next/router'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    margin: '5px',
  },
  rootCheck: {
    margin: '5px',
    border: 'solid 2px',
    borderColor: 'rgb(241 109 46)',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    width: 'max-content',
    border: 'none',
    outline: 'none',
    marginTop: '3rem',
  },
  grid: {
    marginTop: 20,
  },
})

export const Shipping = ({ step, checkoutSubmit, nextStep, setSubmit }) => {
  const classes = useStyles()
  const router = useRouter()
  const { step2, step3, step5, customerData } = useSelector(state => state.m2)
  const [pointsHOP, setPointsHOP] = useState([])
  const [open, setOpen] = useState(false)
  const [shippingTypes, setShippingTypes] = useState([])
  const [spinnerMethod, setSpinnerMethod] = useState(false)
  const [modalOpenClose, setModalOpenClose] = useState(false)
  const [modalDataOpenClose, setModalDataOpenClose] = useState(false)
  const [AddressFormState, setAddressFormState] = useState(null)
  const defaultShippingAddress = customerData?.addresses?.filter(
    adds => adds.id === parseInt(customerData.default_shipping)
  )?.[0]

  const [selectedAddress, setSelectedAddress] = useState(defaultShippingAddress || [])
  const { register, errors, setValue, control, watch, getValues, reset, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })
  const dispatch = useDispatch()
  const submitRef = useRef()
  const [SelectedShipping, setSelectedShipping] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState({ show: false, body: undefined })
  const [selectHop, setSelectHop] = useState(null)
  const [loadingPonitsHop, setLoadingPointsHop] = useState(false)

  useEffect(() => {
    addressChange(selectedAddress)
    handleClick(selectedAddress)
    getPointsHOP()
    dispatch(setSelectedShippingAction(SelectedShipping))
  }, [])

  const getPointsHOP = async () => {
    setLoadingPointsHop(true)
    const res = await getPointHoP()
    setPointsHOP(res)
    setLoadingPointsHop(false)
  }

  const handleClick = async e => {
    if (e?.postcode) {
      setSpinnerMethod(true)
      const res = await estimateShippingMethodsByPostCode(e?.postcode)
      if (res) {
        setShippingTypes(res)
      }
      setSpinnerMethod(false)
    }
  }

  useEffect(() => {
    dispatch(setFormError(errors))
  }, [Object.keys(errors).length])

  const onSubmit = async (data, e) => {
    if (
      customerData.gender === 0 ||
      // !customerData.custom_attributes?.find(i => i.attribute_code === 'taxvat_type') ||
      !customerData.taxvat
    ) {
      openModal('missingData')
    } else {
      if (
        selectedAddress &&
        Object.keys(selectedAddress).length > 0 &&
        Object.keys(SelectedShipping).length > 0
      ) {
        e.preventDefault()
        setLoading(true)
        await dispatch(setM2Step({ currentStep: parseInt(step.replace('step', '')), ...data }))
        await dispatch(setBillingAndShipping(step2, SelectedShipping, step5))
        nextStep()
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (checkoutSubmit && step === 'step1') {
      submitRef.current.click()
      setSubmit(false)
    }
  }, [checkoutSubmit])

  const handleChangeCheckShipp = (checked, item) => {
    handleSelectedShipping(checked, item)
    addressChange(selectedAddress)
  }
  //cambio de checkbox only
  const handleSelectedShipping = async (ev, item) => {
    setSelectedShipping(item)
    dispatch(setSelectedShippingAction(item))
    selectedAddress?.extension_attributes &&
      setSelectedAddress(delete selectedAddress.extension_attributes)
  }
  //cambio de domicilio state step2
  const addressChange = async d => {
    addressViewChange(d)
    await dispatch(setShippingAddress(d))
  }

  //cambio del domicilio de side bar
  const addressViewChange = async (dir, inHop) => {
    dispatch(setShippingViewAddress(dir))
    setSelectedAddress(
      inHop ? { ...selectedAddress, extension_attributes: { hop_pickup_point_id: dir.id } } : dir
    )
    inHop && setSelectHop(dir.firstname)
  }

  const handleChangeAdd = (address, i) => {
    addressChange(address)
    handleClick(address)
  }

  const handleFormAddress = (action, open) => {
    setAddressFormState({ action })
    openModal('formAddress', action)
  }

  const handleClickBack = () => {
    router.push('/cart')
  }

  const openModal = (bodyRender, action) => {
    if (!bodyRender) return ''

    const bodyViews = {
      formAddress: (
        <div className={classes.paper}>
          <FormAddress
            AddressFormState={{ ...AddressFormState, action }}
            redirectionHandler={() => onCloseModal()}
          />
        </div>
      ),
      missingData: (
        <div className={classes.paper}>
          <Grid
            className={classes.grid}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h4" gutterBottom>
              Agregar datos faltantes
            </Typography>
            <ul
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                //color: 'red'
              }}
            >
              {customerData.gender === 0 && <li>Genero</li>}
              {/* {!customerData?.custom_attributes?.find(i => i.attribute_code !== 'taxvat_type') && (
                <li>Tipo de Documento</li>
              )} */}
              {!customerData.taxvat && <li>N° de documento</li>}
            </ul>

            <FormCustomerData
              AddressFormState={AddressFormState}
              redirectionHandler={() => onCloseModal()}
            />
          </Grid>
        </div>
      ),
      map: (
        <MapContainer
          points={pointsHOP}
          handleClose={() => onCloseModal()}
          addressChange={dir => addressViewChange(dir, true)}
        />
      ),
    }

    setModalState({
      show: true,
      body: bodyViews[bodyRender],
    })
  }

  const onCloseModal = () => {
    setModalState({ show: false, body: null })
  }

  return (
    <>
      <Modal
        className={classes.modal}
        open={modalState.show}
        onClose={() => onCloseModal()}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState.show}>
          <>{modalState.body || <div />}</>
        </Fade>
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionDataContainer margin="0" align="center">
          <FormCard width="96%" minWidth="360px">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h2>Dirección de envío</h2>
              <Button
                type="button"
                text="Agregar"
                onClick={() => handleFormAddress('Agregar', true)}
              />
            </div>
            <ContainerOneColumn>
              <FormControl variant="outlined">
                {customerData.addresses.length < 1 ? (
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Alert variant="outlined" severity="warning">
                      Por favor agregue una dirección de envío
                    </Alert>
                  </div>
                ) : (
                  customerData?.addresses?.map((address, id) => {
                    return (
                      <Card
                        key={id}
                        className={
                          address.id === selectedAddress?.id ? classes.rootCheck : classes.root
                        }
                      >
                        <CardActionArea onClick={() => handleChangeAdd(address, id)}>
                          <CardHeader
                            action={
                              address.id === selectedAddress?.id && (
                                <CheckIcon
                                  style={{
                                    color: 'rgb(241 109 46)',
                                    marginTop: '1rem',
                                    marginRight: '0.5rem',
                                  }}
                                />
                              )
                            }
                            title={
                              address.street.reduce((ac, st) => `${ac} ${st} `, '') +
                              ' - ' +
                              address.city
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
                  })
                )}
              </FormControl>
            </ContainerOneColumn>

            <ContainerOneRow>
              <ContainerOneColumn width="100%">
                <div
                  style={{
                    display: customerData.addresses.length < 1 ? 'none' : 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h2 style={{ margin: '0px 10px' }}>Método de envío</h2>
                  {SelectedShipping?.carrier_code !== 'hop' && !selectedAddress?.id ? (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Alert variant="outlined" severity="warning">
                        Por favor seleccione una dirección de envío
                      </Alert>
                    </div>
                  ) : null}
                  {spinnerMethod ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexFlow: 'column-reverse',
                        marginTop: '50px',
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    selectedAddress?.id &&
                    shippingTypes?.map((item, i) => (
                      <Fragment key={i}>
                        <div
                          style={{
                            border: '2px solid #e8e8e8',
                            borderRadius: '5px',
                            margin: '10px',
                            padding: '7px',
                            alignItems: 'center',
                            color: '#333',
                            direction: 'column',
                          }}
                        >
                          <div
                            style={{
                              padding: '7px',
                              display: 'flex',
                            }}
                          >
                            <input
                              style={{ margin: '5px' }}
                              type="radio"
                              id={item.method_title}
                              value={item.method_title}
                              onChange={e =>
                                SelectedShipping?.carrier_code !== 'hop'
                                  ? handleSelectedShipping(e, item)
                                  : handleChangeCheckShipp(e, item)
                              }
                              checked={
                                SelectedShipping
                                  ? SelectedShipping?.method_title === item.method_title
                                  : false
                              }
                            />
                            <br />
                            <label style={{ margin: '5px' }}>{item.method_title}</label>
                            <br />
                            <b style={{ margin: '5px' }}>${item.base_amount}</b>
                            <p style={{ margin: '0px 15px' }}>{item?.carrier_title}</p>
                          </div>
                          <br />
                          <div style={{ width: '100%' }}>
                            {SelectedShipping?.carrier_code === 'hop' &&
                              item?.carrier_code === 'hop' &&
                              (loadingPonitsHop ? (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexFlow: 'column-reverse',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <CircularProgress />
                                </div>
                              ) : (
                                <>
                                  {selectedAddress?.postcode &&
                                  selectedAddress?.extension_attributes?.hop_pickup_point_id ? (
                                    <h3 style={{ marginLeft: '5px', marginBottom: '-10px' }}>
                                      PUNTO SELECCIONADO: {selectHop}
                                    </h3>
                                  ) : (
                                    <h3 style={{ marginLeft: '5px', marginBottom: '-10px' }}>
                                      NO SELECCIONASTE NINGÚN PUNTO DE ENTREGA
                                    </h3>
                                  )}
                                  <Button
                                    type="button"
                                    onClick={() => openModal('map')}
                                    style={{ display: 'flex', margin: '30px 10px' }}
                                    text="Ver puntos de entrega"
                                  />
                                </>
                              ))}
                          </div>
                        </div>
                      </Fragment>
                    ))
                  )}
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

        <Grid container direction="row" justify="center" alignItems="center">
          <Button
            onClick={() => handleClickBack()}
            text="Volver"
            style={{ display: 'flex', margin: '30px 10px' }}
          />
          <Button
            type="submit"
            text="Continuar"
            style={{ display: 'flex', margin: '30px 10px' }}
            loading={loading}
            disabled={
              SelectedShipping?.carrier_code === 'hop'
                ? !selectedAddress?.id ||
                  !selectedAddress?.extension_attributes?.hop_pickup_point_id
                : !selectedAddress?.id || !SelectedShipping?.carrier_code
            }
          />
        </Grid>
      </form>
    </>
  )
}
