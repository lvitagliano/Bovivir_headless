import styled from "styled-components";
import device from "../../../Styles/device";

const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction: ${props => props.flexDirection};
    align-items: center;
    justify-content: space-around;
    padding: 30px 20px;
   
    height: 51em;
    background-color: ${props => props.bcolor || ""};

    @media ${device.maxMobileL} { 
      flex-direction:column;
    }
`
const ArticleContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  align-items: start;
  justify-content: space-around;

  margin-top: 30px;

  @media ${device.maxMobileL} { 
    flex-direction:column;
  }
`
const ButtonContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content:flex-start;

  & button {
      margin-right:3em;
  }
`
const TextContainer = styled.div`
  max-width:30em;
`

export {
    Container,
    TextContainer,
    ArticleContainer,
    ButtonContainer,
  }