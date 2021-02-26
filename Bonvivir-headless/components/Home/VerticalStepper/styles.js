import styled from 'styled-components'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import device from '../../../Styles/device'

const Container = styled.div.attrs(props => ({
  bgcolor: props.bgcolor || '#edeae1',
}))`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: ${props => props.bgcolor};

  @media ${device.maxMobileL} {
    flex-direction: column;
    align-items: center;
  }
`
const Dot = styled(FiberManualRecordIcon)`
  color: ${props => props.theme.colors.primary};
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
    width: 100vw;
    padding: 10px;
  }
`
const Label = styled.p`
  margin-top: 15px;
`

export { Container, DivImage, DivStepper, Dot, ActiveDot, Label }
