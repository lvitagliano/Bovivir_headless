import React from 'react'
import { CustomButton } from './styles'
import { Icon, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: '#762057',
    position: 'absolute',
  },
}))

const Button = ({ variant, text, icon, loading, disabled, ...props }) => {
  const classes = useStyles()

  return (
    <>
      <CustomButton {...props} className={variant} disabled={loading || disabled}>
        {icon ? <Icon>{icon}</Icon> : null}
        <p style={{ textTransform: 'uppercase' }}>{text}</p>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </CustomButton>
    </>
  )
}

Button.defaultProps = {
  variant: 'secondary',
  text: '',
  icon: '',
}

export default Button
