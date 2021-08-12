import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import device from '../../Styles/device'

const ContainerLgCustom = styled(Container)`
  display: flex;
  justify-content: space-evenly;
  align-items: ${props => props.alignItems || 'center'};
  width: 100%;
  padding: ${props => props.padding || '10px 20px'};
  background-color: ${props => props.bgcolor};
  flex-direction: ${props => props.flexDirection || ''};

  @media ${device.maxMobileL} {
    flex-direction: column;
    align-items: center;
  }
`

export { ContainerLgCustom }
