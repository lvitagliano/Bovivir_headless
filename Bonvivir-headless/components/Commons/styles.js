import styled from 'styled-components'
import device from "../../Styles/device";
import theme from "../../Styles/themes/main";

const SectionDataContainer = styled.section.attrs(props => ({
  align: props.align,
  margin: props.margin || "30px 10%"
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin:${props => props.margin} ;
  justify-content:  ${props => props.align};

  @media ${device.maxMobileL} { 
    flex-direction: column;
    margin: 0;
  }
`
const DescriptionSelectionCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 20px 5% 40px 5%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 5px 0px;
  border-radius: 5px;
  margin: 0 20px 0 20px;

  @media ${device.maxMobileL} { 
    padding: 0;
    width: 90%;
    align-items: center;
    box-shadow: none;
  }
`
const FormCard = styled.div.attrs(props => ({
  width: props.width,
  minWidth: props.minWidth,
  padding: props.padding
}))`
  min-width: ${props => props.minWidth};
  width: ${props => props.width || '40%'};
  padding: ${props => props.padding || '20px 2% 20px 2%'};
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  @media ${device.maxMobileL} { 
    padding: 0;
    width: 90%;
    box-shadow: none;
  }
`
const FormTitle = styled.h1`
  text-align: center;
  margin: 10px 0;
  font-size: 20px;
`
const ContainerOneColumn = styled.div.attrs(props => ({
  width: props.width
}))`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  width: ${props => props.width};

  @media ${device.maxMobileL} { 
    width: 100%;
  }
`
const ContainerOneRow = styled.div`  
  display: flex;
  justify-content: ${props => props.justifyContent || 'space-between'};
  @media ${device.maxMobileL} { 
    flex-direction: column;
  }
`
const ButtonConfirm = styled.button`
  background: #762057;
  padding: 0 10px;
  height: 35px;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const ButtonRadio = styled.input`
  margin: 0 5px 4px 0;
`
const TarjImg = styled.img.attrs(props => ({
  src: props.src,
}))`
  z-index: 2;
  width: 90%;
  height: auto;
`

const CustomButton = styled.button.attrs(props => ({
  width: props.width || "fit-content",
  bold: props.bold,
  alignSelf: props.alignSelf || ""
}))`
    align-self: ${props => props.alignSelf};
    cursor: pointer;
    display: flex;
    align-items:  center;
    justify-content:space-evenly;
    text-align: center; 
    white-space:nowrap;
    border: none;
    border-radius: 0px;
    padding: 5px 15px;
    width: ${props => props.width};
    height: 3em;
    font-weight:${props => props.bold ? '800':'500'};
    transition: 0.3s;
    margin: 20px 0 0 0;
    
    &.primary {
      background-color: Transparent;
      color: black;
      border: 1px black solid;
    }
    &.secondary{
      background-color: ${theme.colors.secondary};
      color:white;
    }
    &>svg{
      width:20px;
      height:20px;
      margin-right:5px;
    }
    /* hover del boton */
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
      box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
      background: #ab3881;
    }

    /* seleccion del boton */
    &:focus {
        outline: none;
    }

    &:disabled {
      color: #d12028;
      background: #aaa;
    }
`

export {
  SectionDataContainer,
  FormCard,
  FormTitle,
  ContainerOneColumn,
  ContainerOneRow,
  DescriptionSelectionCard,
  ButtonConfirm,
  ButtonRadio,
  CustomButton,
  TarjImg,
}
