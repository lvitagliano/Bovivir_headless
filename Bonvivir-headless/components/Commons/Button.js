import React from 'react'
import { CustomButton } from './styles'
import Icon from '@material-ui/core/Icon'

const Button = ({ variant, text, icon, ...props }) => {
  return (
    <CustomButton {...props} className={variant}>
      {icon ? <Icon>{icon}</Icon> : null}
      <p style={{ textTransform: 'uppercase', margin: 0 }}>{text}</p>
    </CustomButton>
  )
}

Button.defaultProps = {
  variant: 'secondary',
  text: '',
  icon: '',
}

export default Button
