import styled from 'styled-components'
import device from '../../../Styles/device'
import { Check } from '@styled-icons/bootstrap/Check'

const BigBannerContainer = styled.div.attrs(props => ({}))`
  height: ${props => props.height};
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 1rem;

  @media ${device.maxMobileL} {
    height: 58em;
    display: flex;
    flex-direction: column;
    position: none;
  }
`

const ImageContainer = styled.div.attrs(props => ({
  src: props.image,
}))`
  background-image: url(${props => props.src});
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  @media ${device.maxMobileL} {
    background-repeat: none;
    background-size: none;
    height: none;
    width: none;
    position: none;
    height: 100%;
    background-position: top;
  }
`

const InfoContainer = styled.div.attrs(props => ({
  height: props.height || '40%',
}))`
  display: flex;
  flex-direction: column;
  height: ${props => props.height};
  width: 35%;
  position: absolute;
  top: 5em;
  left: 5em;

  @media ${device.maxMobileL} {
    justify-content: center;
    width: auto;
    top: 25em;
    left: 1em;
    height: 100%;
    position: initial;
  }
`

const Linea = styled.div`
  height: 5px;
  width: 50px;
  margin: 15px 0;
  background-color: #fff;
`

const ListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ListItem = styled.li`
  font-weight: bold;
  color: #fff;

  @media ${device.maxMobileL} {
    color: #333;
  }
`
const CheckImg = styled.img`
  width: 15px;
  margin: 0 10px 0 0;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  & button {
    margin-right: 3em;
  }
`
const CustomCheck = styled(Check)`
  color: #fff;
  width: 2em;

  @media ${device.maxMobileL} {
    color: #333;
  }
`
export {
  InfoContainer,
  ListUl,
  ListItem,
  CheckImg,
  Linea,
  ButtonContainer,
  CustomCheck,
  BigBannerContainer,
  ImageContainer,
}
