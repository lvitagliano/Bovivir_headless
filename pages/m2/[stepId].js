import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PaymentData } from '../../components/M2checkout/PaymentData'
import { Shipping } from '../../components/M2checkout/Shipping'
import { Order } from '../../components/M2checkout/Order'
import { ShippingOrder } from '../../components/M2checkout/ShippingOrder'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import Alert from '@material-ui/lab/Alert'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'

const styles = theme => ({
  formContainer: {
    backgroundColor: '#f7f7f7',
    height: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
  },
  stepper: {
    width: '40%',
    margin: 'auto',
    backgroundColor: '#f7f7f7',
    '& .MuiStepIcon-active': {
      color: '#ab3881',
    },
    '& .MuiStepIcon-completed': {
      color: '#bd9db2',
    },
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerParent: {
    display: 'flex',
    width: '100%',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  containerOne: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
      width: '100%',
    },
  },
  containerTwo: {
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
})
const useStyles = makeStyles(styles)

const stepsTitles = [
  { title: 'Dirección de envío', description: 'Envío' },
  { title: 'Medios de pago', description: 'Pago' },
]

const Checkout = () => {
  const classes = useStyles()
  const router = useRouter()

  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  const step = parseInt(router.query.stepId.replace('step', ''))
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)
  const { formError, step2 } = useSelector(state => state.m2)
  const [submit, setSubmit] = useState(false)
  const [dimensions, setDimensions] = useState({
    height: (typeof window !== 'undefined' && window.innerHeight) || 0,
    width: (typeof window !== 'undefined' && window.innerWidth) || 0,
  })
  const items = useSelector(state => state.m2.cart.items)
  const pagos = useSelector(state => state.m2.paymentMethodData)
  const total = items.reduce((ac, it) => ac + it.prices.row_total.value, 0)

  const nextStep = () => {
    router.push(`/m2/step${step + 1}`, `/m2/step${step + 1}`, { shallow: true })
  }
  const prevStep = () => {
    if (step !== 1) router.push(`/m2/step${step - 1}`, `/m2/step${step - 1}`, { shallow: true })
  }

  useEffect(function mount() {
    if (!isLogedInM2 || !isLogedInAuth0) {
      router.push(`/cart`, `/cart`, { shallow: true })
    }
  })

  const renderStep = renderStep => (
    <div>
      {renderStep === 1 && (
        <Shipping
          step={`step1`}
          nextStep={nextStep}
          checkoutSubmit={submit}
          setSubmit={setSubmit}
        />
      )}
      {renderStep === 2 && (
        <PaymentData
          step={`step2`}
          checkoutSubmit={submit}
          prevStep={prevStep}
          setSubmit={setSubmit}
        />
      )}
    </div>
  )

  if (!isLogedInM2 || !isLogedInAuth0) return null

  return (
    <div className={classes.formContainer}>
      <div className={classes.containerHeader}>
        <Stepper className={classes.stepper} activeStep={step - 1}>
          {stepsTitles.map((t, i) => (
            <Step key={`step_${i}`}>
              <StepLabel
                onClick={i < 1 ? prevStep : undefined}
                StepIconProps={{
                  classes: { root: classes.stepperRoot },
                }}
              >
                {t.description}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 2 ? (
          <Alert variant="outlined" severity="warning">
            Para compras en tienda.bonvivir.com sólo pueden emitirse facturas a Consumidores Finales
            (Tipo B)
          </Alert>
        ) : (
          ''
        )}
      </div>

      <div className={classes.containerParent}>
        {isDesktop ? (
          <>
            <div className={classes.containerOne}>{renderStep(step)}</div>
            <div className={classes.containerTwo}>
              <Order />
              <br />
              {step2 && <ShippingOrder />}
            </div>
          </>
        ) : (
          <>
            <div className={classes.containerTwo}>
              <Order />
              <br />
              {step2 && <ShippingOrder />}
            </div>
            <div className={classes.containerOne}>{renderStep(step)}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Checkout
