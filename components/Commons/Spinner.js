import React from 'react'
import {  CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: '#762057',
    margin: '10px'
  },
}))

const Spinner = ({ ...props }) => {
  const classes = useStyles()

  return <CircularProgress {...props} className={classes.buttonProgress} />
}

export default Spinner