import styled,{css} from 'styled-components'
import theme from "../../../Styles/themes/main";

const oneLine = css`
    white-space: nowrap;
`

const LeftTd = styled.td`
  ${oneLine}
  text-align: left;
  white-space: normal;
`
const RightTd = styled.td`
  ${oneLine}
  text-align: right;
  white-space: normal;
`
const CenterTd = styled.td`
  ${oneLine}
  text-align: center;
  white-space: normal;
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
