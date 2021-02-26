import styled from 'styled-components'
import device from '../../../Styles/device'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: space-evenly;
  width: 100%;
  padding: 10px 20px;
`
const ContainerDisplayer = styled.div`
  width: 80%;
  margin: auto;
`

const DivImage = styled.img.attrs(props => ({
  src: props.image,
}))`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 10px 0px;
  height: 30em;
  width: 40em;
  object-fit: cover;

  @media ${device.maxMobileL} {
    display: none;
  }
`
const DivText = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 25em;
  padding: 40px 0px;
`

export { Container, ContainerDisplayer, DivImage, DivText }
