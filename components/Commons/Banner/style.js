import styled from 'styled-components'
import device from '../../../Styles/device'
import { Check } from '@styled-icons/bootstrap/Check'

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
  position: relative;
  left: ${props => props.left || ''};
  top: ${props => props.top || ''};

  @media ${device.maxMobileL} {
    left: ${props => props.leftMobile || '1.1rem'};
    height: ${props => props.left && '25em'};
  }
`
const InfoContainer = styled.div.attrs(props => ({
  height: props.height || '40%',
}))`
    display: flex;
    flex-direction: column;
    height: ${props => props.height};
    width: 35%;
    position:absolute;
    top: 5em;
    ${props => `${props.position || `left`}:5em;`}
    

    @media ${device.maxMobileL} { 
        justify-content: center;
        height: auto;
        width: auto;
        top: 2em;
        left: 1em;
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
  margin: 0 0 0px 0;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ListItem = styled.li`
  font-weight: bold;
  color: #fff;
`
const CheckImg = styled.img`
  width: 15px;
  margin: 0 10px 0 0;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  & button {
    margin-right: 2em;
  }
  @media ${device.maxMobileL} {
    width: 25em;
    align-items: center;
  }
`
const CustomCheck = styled(Check)`
  color: #fff;
  width: 2em;
`
export {
  BannerContainer,
  InfoContainer,
  ListUl,
  ListItem,
  CheckImg,
  Linea,
  ButtonContainer,
  CustomCheck,
}
