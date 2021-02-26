import styled from 'styled-components'
import LabelForm from './LabelForm'

const InputFormBase = styled.input.attrs(props => ({
    width: props.width,
  }))`
    color: #333;
    font-size: 1em;
    border: 2px solid #e8e8e8;
    border-radius: 5px;
    padding: 5px;
    width: ${props => props.width};

    &.error{
      border: 1px solid red;
    }
   
  `
const Error = styled.p` 
  color:red;
  font-size: 0.9em;
  margin: 5px;
`
const InputForm = ({error, label, ...props}) => {
    return<>
            <LabelForm>{label}</LabelForm>
            <InputFormBase {...props} className={error ? "error" : ""}/>
            {error && <Error>{error}</Error>}
          </>
}

export default InputForm;