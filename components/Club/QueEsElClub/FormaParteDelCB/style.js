import styled from 'styled-components'
import device from '../../../../Styles/device'

const BannerContainer = styled.div.attrs(props => ({
  src: props.image || '',
  height: props.height || '30em',
  position: props.position || 'center',
}))`
  background-image: url(${props => props.src});
  background-position: ${props => props.position};
  background-repeat: no-repeat;
  background-size: ${props => props.size || 'cover'};
  height: ${props => props.height};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  left: ${props => props.left || ''};
`
const BannerContainerContent = styled.div`
  width: 50em;
  height: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const BannerContainerText = styled.p`
  color: #fff;
  font-size: 2em;
  margin: 0 0 10px 0;
  @media ${device.maxMobileL} {
    font-size: 1.7em;
  }
`

const ButtonsContainer = styled.div`
  display: flex;

  @media ${device.maxMobileL} {
    flex-direction: column;
  }
`

export { BannerContainer, BannerContainerContent, BannerContainerText, ButtonsContainer }
