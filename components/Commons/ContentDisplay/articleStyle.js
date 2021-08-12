import styled from 'styled-components'
import device from '../../../Styles/device'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  align-items: center;
  justify-content: center;
  flex: 1;

  @media ${device.maxMobileL} {
    margin-bottom: 1rem;
  }
`

const DivImage = styled.img.attrs(props => ({ src: props.image }))`
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 360px;
  object-fit: cover;
  margin: 10px 0px;

  @media ${device.maxMobileL} {
    width: 100%;
  }
`

const Link = styled.a`
  text-transform: uppercase;
  color: ${props => props.theme.colors?.primary};
  text-decoration: underline;
  font-weight: 700;
  &:hover {
    color: ${props => props.theme.colors?.secondary};
  }
`

const DescContainer = styled.div`
  text-align: center;
  max-width: 25em;
`

export { Container, DivImage, Link, DescContainer }
