import styled from 'styled-components'
import theme from "../../Styles/themes/main";

const LabelForm = styled.label.attrs(props => ({
  fontSize: props.fontSize,
  }))`
    font-weight: bold;
    font-size: ${props => props.fontSize};
    color:${theme.colors.secondary};
`
export default LabelForm;