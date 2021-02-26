import styled from 'styled-components'
import LabelForm from './LabelForm'

const TextAreaFormBase = styled.textarea`
    color: #333;
    border: 2px solid #e8e8e8;
    border-radius: 5px;
    height: 100px;

    &.error{
      border: 1px solid red;
    }
`
const Error = styled.p` 
  color:red;
  font-size: 0.9em;
  margin: 5px;
`
const TextAreaForm = ({error, label, ...props}) => {
    return<>
            <LabelForm>{label}</LabelForm>
            <TextAreaFormBase {...props} className={error ? "error" : ""}/>
            {error && <p>error</p>}
          </>
}

export default TextAreaForm;