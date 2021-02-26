import styled from 'styled-components'
import device from '../../../Styles/device'

const BannerContainer = styled.div`
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  height: 30em;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    width: 40%;
    text-align: center;
  }

  @media ${device.maxMobileL} {
    flex-direction: column;
    align-items: center;

    & > p {
      width: 100%;
    }
  }
`

export { BannerContainer }
