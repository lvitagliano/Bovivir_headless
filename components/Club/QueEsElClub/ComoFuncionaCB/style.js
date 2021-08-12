import styled from 'styled-components'
import device from '../../../../Styles/device'

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2em;
  padding-bottom: 3em;
  background: ${props => props.background};

  @media ${device.minMobileL} {
    padding-top: 3em;
    padding-bottom: 4em;
  }
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 10px 0 0 0;

  @media ${device.minMobileL} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`
const FlexContainerChild = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 20px 10px;
  align-self: center;

  @media ${device.maxMobileL} {
    align-self: flex-end;
  }
`
const FlexContainerChildContent = styled.div`
  width: 13em;
`
const TitleContent = styled.h2`
  margin: 0;
  font-size: 1.4em;
  color: #7d3665;
`
const ParagraphContent = styled.p`
  margin: 0;
  font-size: 1em;
  color: #8e8f94;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  & button {
    margin-right: 1em;
  }

  @media ${device.minMobileL} {
    flex-direction: row;
  }
`

export {
  BannerContainer,
  FlexContainer,
  FlexContainerChild,
  FlexContainerChildContent,
  TitleContent,
  ParagraphContent,
  ButtonContainer,
}
