import styled,{css} from 'styled-components'
import theme from "../../../Styles/themes/main";

const oneLine = css`
    white-space: nowrap;
`

const LeftTd = styled.td`
  ${oneLine}
  text-align: left;
  white-space: normal;
  margin-right: 10px;
`
const RightTd = styled.td`
  ${oneLine}
  text-align: right;
`
const CenterTd = styled.td`
  ${oneLine}
  text-align: center;
`
const Footer = styled.div`
  display:flex;
  justify-content:space-between;
`
const Total = styled.b`
  font-size: 1.3em;
  color:${theme.colors.secondary}
`

export{
  LeftTd,
  RightTd,
  CenterTd,
  Footer,
  Total
}