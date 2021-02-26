
import styled from "styled-components";
import device from "../../Styles/device";

const Container = styled.div`
  background-color: #762057;
  color: white;
  bottom:0;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
`

const RowContainer = styled.div`
  padding-top:10px;
  padding-left: 2em;
  padding-right:2em;
  position: relative; 
  display:grid;
  grid-template-columns: repeat(5, 1fr);

  @media ${device.maxMobileL} { 
    grid-template-columns: repeat(2, 1fr);
  }  

`

const SocialNetwork  = styled.div`
  position:absolute;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin-right:10em;

  & svg {
    width:3em;
    height:3em;
    margin:0.4em;
  }
  
  @media ${device.maxMobileL} { 
    transform: translate(-30px,-30px);
    & svg {
      margin:1.5em;
    }
  }  

`

const List = styled.ul` 
  list-style-type: none;
  text-transform: uppercase;
  font-size: 0.85em;

  & li:first-child{
    font-weight: 800;
  }

  & li{
    cursor: pointer;
    padding-top:0.9em;
  }
`

const Wording = styled.div`
  text-align:center;
  padding:10px;
  font-size:0.7em;

  @media ${device.maxMobileL} { 
    margin-top:3em;
  }  
`
export {
  Container,
  RowContainer,
  List,
  SocialNetwork,
  Wording
}