import styled from 'styled-components'
import device from '../../../Styles/device'

const BannerContainer = styled.div`
  background: ${props => props.background || '#EDEAE1'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  padding-top: 1rem;

  @media ${device.maxMobileL} {
  }
`

const ItemsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: ${props => (props.small ? 'space-between' : 'center')};
  flex-wrap: wrap;
  width: ${props => (props.small ? 90 : 100)}%;

  @media ${device.maxMobileL} {
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: ${props => (props.small ? 200 : 300)}px;
  padding: ${props => (props.small ? 0 : '2rem')};
  margin: ${props => (props.small ? 0 : '2rem')};
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 10px;

  ${props =>
    props.animation
      ? !props.visible
        ? `transform: translateY(20px) scale(0.9);
    opacity: 0;`
        : `visibility: visible;
    -webkit-transform: translateY(0) scale(1);
    opacity: 1;
    transform: translateY(0) scale(1);
    opacity: 1;
    -webkit-transition: -webkit-transform 1s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 1s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    transition: transform 1s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 1s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;`
      : ''}
`

const Title = styled.div`
  font-size: ${props => (props.small ? 12 : 15)}px;
  color: #762057;
  font-weight: bold;
`

const Text = styled.div`
  font-size: ${props => (props.small ? 11 : 14)}px;
  opacity: 0.8;
`

export { BannerContainer, ItemsContainer, Item, Title, Text }
