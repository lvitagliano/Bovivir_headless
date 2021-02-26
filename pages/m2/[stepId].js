import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PaymentData } from '../../components/M2checkout/PaymentData'
import { Shipping } from '../../components/M2checkout/Shipping'
import { Order } from '../../components/M2checkout/Order'
import { ShippingOrder } from '../../components/M2checkout/ShippingOrder'
import { FORMSTEP } from '../../constants/form'
import { useForm } from 'react-hook-form'
import { setM2Step, setBillingAndShipping, setPaymentMethod } from '../../store/actions/m2Action'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Commons/Button'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';

const styles = theme => ({
  formContainer: {
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  stepper: {
    width: '40%',
    margin: 'auto',
    backgroundColor: '#f7f7f7',
  },
  form: {
    padding: '2% 0',
    display: 'flex',
    justifyContent: 'center',
  },
  columnOnly: {
    flex: '0 0 95%',
  },
  columnOne: {
    flex: '0 0 58%',
  },
  columnTwo: {
    flex: '0 0 40%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '3em',
    fontWeight: '800',
  },
  headMobile: {
    width: '100%',
    height: '45px',
    backgroundColor: '#ccc',
    marginBottom: '0px',
    position: 'sticky',
    display: 'flex',
    alignItems:'center',
    justifyContent:'space-evenly',
  }
})
const useStyles = makeStyles(styles)

const stepsTitles = [
  { title: 'Dirección de envío', description: 'Envío' },
  { title: 'Medios de pago', description: 'Pago' }
]

const Checkout = () => {
  const classes = useStyles()
  const router = useRouter()
  const step = parseInt(router.query.stepId.replace('step', ''))
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const { formError, step2 } = useSelector(state => state.m2)
  const [submit, setSubmit] = useState(false)
  const [dimensions, setDimensions] = useState({
    height: typeof window !== "undefined" && window.innerHeight || 0,
    width: typeof window !== "undefined" && window.innerWidth || 0
  })
  const items = useSelector(state => state.m2.cart.items);
    const pagos = useSelector(state => state.m2.paymentMethodData);
    const total = items.reduce((ac,it) => ac + it.prices.row_total.value,0 );

  const nextStep = () => {
    router.push(`/m2/step${step + 1}`, `/m2/step${step + 1}`, { shallow: true })
  }
  const prevStep = () => {
    if (step !== 1) router.push(`/m2/step${step - 1}`, `/m2/step${step - 1}`, { shallow: true })
  }

  const handleClick = () => {
    setSubmit(true)
  }


  useEffect(function mount() {
    window.addEventListener('resize', handleResize)

    if (!isLogedInM2 || !isLogedInAuth0) {
      router.push(`/cart`, `/cart`, { shallow: true })
    }

    return function unMount() {
      window.removeEventListener('resize', handleResize)
    };
  });

  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }
  
  const renderStep = renderStep => (
    <div>
      {renderStep === 1 && (
        <Shipping
          step={`step${renderStep}`}
          nextStep={nextStep}
          checkoutSubmit={submit}
          setSubmit={setSubmit}
        />
      )}
      {renderStep === 2 && (
        <PaymentData
          step={`step${renderStep}`}
          nextStep={nextStep}
          checkoutSubmit={submit}
          setSubmit={setSubmit}
        />
      )}
    </div>
  )

  if (!isLogedInM2 || !isLogedInAuth0) return null

  return (
    <div className={classes.formContainer}>
      <div className={classes.header}>
        <Stepper className={classes.stepper} activeStep={step - 1}>
          {stepsTitles.map((t, i) => (
            <Step key={`step_${i}`}>
              <StepLabel onClick={i < 1 && prevStep}
                StepIconProps={{
                  classes: { root: classes.stepperRoot },
                }}
              >{t.description}</StepLabel>

            </Step>
          ))}
        </Stepper>
        {/* <p className={classes.title}>{stepsTitles[step - 1].title}</p> */}
        {step === 2 ? <Alert variant="outlined" severity="warning">Para compras en tienda.bonvivir.com sólo pueden emitirse facturas a Consumidores Finales (Tipo B)</Alert> : ""}
        {dimensions.width < 941 && <div className={classes.headMobile}>
          {
            Object.keys(pagos).length === 0 
            ? <h2>Total: {`$ ${total}`}</h2>
            : <h2>Total: {`$ ${pagos.totals.grand_total}`}</h2>
          }
        </div>}
      </div>

      <div className={classes.form}>
        
         
        <div className={dimensions.width > 940 ? classes.columnOne : classes.columnOnly}>{renderStep(step)}</div>
        {dimensions.width > 940 && <div className={classes.columnTwo}>
            <Order />
            <br />
            {step2.region && <ShippingOrder />}         
        </div> }
      </div>
      {step <= FORMSTEP.length && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {step !== 1 &&
            <Button
              onClick={prevStep}
              text="Volver"
              disabled={Object.keys(formError).length}
              style={{ display: 'flex', margin: '30px 10px' }}
            ></Button>
          }
          <Button
            onClick={handleClick}
            text="Continuar"
            disabled={Object.keys(formError).length}
            style={{ display: 'flex', margin: '30px 10px' }}
          ></Button>
        </div>
      )}
    </div>
  )
}

export default Checkout
