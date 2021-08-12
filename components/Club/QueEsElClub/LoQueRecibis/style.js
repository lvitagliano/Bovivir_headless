import styled from 'styled-components'
import { Check } from '@styled-icons/bootstrap/Check'
import device from '../../../../Styles/device'

const BannerContainer = styled.div.attrs(props => ({}))`
  height: ${props => props.height};
  width: 100%;
  display: flex;
  position: relative;

  @media ${device.maxMobileL} {
    height: 51em;
    display: flex;
    flex-direction: column;
    position: none;
  }
`

const ImageContainer = styled.div.attrs(props => ({
  src: props.image,
}))`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
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
    background-size: contain;
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
  top: 15em;
  left: 10em;

  @media ${device.maxMobileL} {
    justify-content: center;
    width: auto;
    top: 22em;
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
  margin: 0 0 30px 0;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.maxMobileL} {
    height: none;
  }
`
const ListItem = styled.li`
  font-weight: bold;
  color: #fff;

  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  @media ${device.maxMobileL} {
    color: #333;
  }
`

const SubTitle1 = styled.p.attrs(props => ({
  color: props.color,
  width: props.width || '17em',
  size: props.size || '1.3rem',
}))`
  color: ${props => props.color};
  width: ${props => props.width};
  font-size: ${props => props.size};

  & strong {
    color: ${props => props.color || props.theme.colors?.secondary};
  }

  @media ${device.maxMobileL} {
    width: 15em;
    text-align: left !important;
    color: #333;
  }
`

const MainTitle = styled.div.attrs(props => ({
  color: props.color || '#fff',
}))`
  color: ${props => props.color};
  text-transform: uppercase;
  text-align: ${props => props.alignment};
  font-size: 2em;
  font-weight: 200;

  & > b {
    font-weight: 700;
    margin-left: 0.3em;
    margin-right: 0.3em;
  }

  @media ${device.maxMobileL} {
    color: #333;
  }
`

const Title = ({ text, alignment, ...props }) => {
  const textArr = text.split(' ')
  const title =
    textArr.length > 2
      ? textArr.slice(0, textArr.length - 2).join(' ')
      : textArr.slice(0, textArr.length - 1).join(' ')

  const title2 =
    textArr.length > 2
      ? textArr.slice(textArr.length - 2, textArr.length).join(' ')
      : textArr.slice(textArr.length - 1, textArr.length).join(' ')

  return (
    <MainTitle {...props} alignment={alignment}>
      {title}
      <b>{title2}</b>
    </MainTitle>
  )
}

const CircleNumber = styled.div`
  width: 49px;
  height: 47px;
  display: flex;
  border-radius: 50%;
  color: #762057;
  box-shadow: 0px 0px 6px 0px black;
  align-items: center;
  justify-content: center;
  font-size: large;
  margin-right: 10px;
  background-color: white;
`

const CheckImg = styled.img`
  width: 15px;
  margin: 0 10px 0 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;
  & button {
    margin-right: 2em;
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
  ImageContainer,
  CircleNumber,
  SubTitle1,
  Title,
}
