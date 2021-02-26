import styled from 'styled-components'
import LabelForm from './LabelForm'

const SelectFormBase = styled.select.attrs(props => ({
    width: props.width,
    ...props
  }))`
    color: #333;
    border: 2px solid #e8e8e8;
    border-radius: 5px;
      padding: 5px 5px 5px 7px;
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
const SelectForm = ({error, label, ...props}) => {
    return<>
            <LabelForm>{label}</LabelForm>
            <SelectFormBase {...props} className={error ? "error" : ""}/>
            {error && <p>error</p>}
        </>
}

export default SelectForm;