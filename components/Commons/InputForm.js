import styled from 'styled-components'
import LabelForm from './LabelForm'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useState } from 'react'
import { Icon } from '@material-ui/core'

const InputFormBase = styled.input.attrs(props => ({
  width: props.width,
}))`
  color: #333;
  font-size: 1em;
  border-radius: 5px;
  padding: 5px;
  width: ${props => props.width || '100%'};
  height: ${props => props.height};
  border: ${props => props.border || '2px solid #e8e8e8'};

  ${props =>
    props.disableInnerButtons &&
    `::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }`}

  &.error {
    border: 1px solid red;
  }
`
const Error = styled.p`
  color: red;
  font-size: 0.9em;
  margin: 5px;
`

const InputForm = ({ error, label, customWidth, ...props }) => {
  const [showPass, setShowPass] = useState(props.type)

  const showPassword = () => {
    if (showPass === 'password') setShowPass('text')
    else setShowPass('password')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: customWidth || 'none' }}>
      <LabelForm>{label}</LabelForm>
      <div style={{ position: 'relative' }}>
        <InputFormBase
          {...props}
          type={showPass}
          className={error ? 'error' : ''}
          disableInnerButtons={props.type === 'number' && props.disableInnerButtons}
        />
        {props.icon && (
          <Icon
            type="button"
            onClick={() => showPassword()}
            style={{
              cursor: 'pointer',
              color: '#646465',
              margin: '0',
              position: 'absolute',
              top: '2px',
              right: '1rem',
            }}
          >
            {showPass === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Icon>
        )}
      </div>
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default InputForm
