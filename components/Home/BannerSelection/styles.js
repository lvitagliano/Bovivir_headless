import styled from 'styled-components'
import device from '../../../Styles/device'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.fdirection || 'row'};
  height: 42em;
  overflow: hidden;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 3em;

  @media ${device.maxMobileL} {
    flex-direction: column;
    align-items: center;
    height: 100%;

    & > div:first-child {
      margin-top: 2em;
      /* height: 30em; */
    }
  }
`

const ContainerDisplayer = styled.div`
  overflow: hidden;
  width: 50%;
  height: 100%;
  margin-top: 6%;
  margin-bottom: 6%;
  margin-right: 10%;
  & p {
    margin: 10px;
  }
  @media ${device.maxMobileL} {
    width: 95%;
    margin: 3em;
  }
`
export { Container, ContainerDisplayer }
