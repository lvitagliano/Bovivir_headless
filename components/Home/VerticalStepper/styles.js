import styled from 'styled-components'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import device from '../../../Styles/device'

const ContainerStepper = styled.div.attrs(props => ({
  bgcolor: props.bgcolor || '#edeae1',
}))`
  background-color: ${props => props.bgcolor};
`
const Dot = styled(FiberManualRecordIcon).attrs(props => ({
  active: props.active ? 1 : 0,
}))`
  color: ${props => (props.active ? props.theme.colors.secondary : props.theme.colors.primary)};
`

const ActiveDot = styled(FiberManualRecordIcon)`
  color: ${props => props.theme.colors.secondary};
`

const DivImage = styled.img.attrs(props => ({
  src: props.image,
}))`
  display: flex;
  flex-direction: column;
  height: 30em;
  width: 40em;
  border-radius: 5px;
  margin: 10px 0px;
  object-fit: cover;

  @media ${device.maxMobileL} {
    display: none;
  }
`
const DivStepper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 26em;
  padding: 40px 0px;
  margin-left: 2em;

  @media ${device.maxMobileL} {
    width: 100%;
    padding: 10px;
  }
`
const Label = styled.div`
  margin-top: 15px;
`

export { ContainerStepper, DivImage, DivStepper, Dot, ActiveDot, Label }
