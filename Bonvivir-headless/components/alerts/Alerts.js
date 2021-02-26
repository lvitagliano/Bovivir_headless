import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'

function SlideTransition(props) {
  return <Slide {...props} direction="right" timeout={(1000, 1000)} />
}

export default function Alerts() {
  const userErrorAlert = useSelector(state => state.user.error)
  const m2ErrorAlert = useSelector(state => state.m2.error)

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
    if (userErrorAlert !== null && Object.keys(userErrorAlert).length) {
      setState(u => ({
        ...u,
        open: true,
        severity: userErrorAlert.severity,
        message: userErrorAlert.errorMessage,
      }))
    } else if (m2ErrorAlert !== null && Object.keys(m2ErrorAlert).length) {
      setState(m => ({
        ...m,
        open: true,
        severity: m2ErrorAlert.severity,
        message: m2ErrorAlert.errorMessage,
      }))
    }
  }, [userErrorAlert, m2ErrorAlert])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setState({ ...state, open: false })
  }

  return (
    <Snackbar
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
