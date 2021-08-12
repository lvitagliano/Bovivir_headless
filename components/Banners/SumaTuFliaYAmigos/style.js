import styled from 'styled-components'
import device from '../../../Styles/device'

const BannerContainer = styled.div`
  display: flex;
  background-color: #662356;

  @media ${device.maxMobileL} {
    flex-direction: column;
    padding-bottom: 2rem;
  }
`

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 4rem;
  user-select: none;
  @media ${device.maxMobileL} {
    padding-right: 0;
  }
`

const Title = styled.div`
  font-size: 27px;
  color: white;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Divider = styled.div`
  height: 1px;
  background-color: white;
  opacity: 0.5;
  width: 100%;
`

const Subtitle = styled.div`
  color: white;
  margin-top: 1rem;
  font-weight: ${props => (props.bold ? 'bold' : 'none')};
`

export { BannerContainer, TextContainer, Divider, Title, Subtitle }
