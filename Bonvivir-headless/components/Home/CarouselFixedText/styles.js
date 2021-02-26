
import styled from "styled-components";
import device from "../../../Styles/device";

const Container = styled.div`
  position: relative; 
  display:flex;
  justify-content: space-between;

  & .arrow-icon {
    & :hover {
      background-color : #fff;
      border-radius: 50%;
      border: 1px solid #eeeeee;
    }
  }

  & .arrow-left {
    cursor: pointer;
    position:absolute;
    top:50%;
    left: 5px;
    transform:translateY(-50%);
    width:35px;
    height:35px;
  }

  & .arrow-right {
    cursor: pointer;
    position:absolute;
    top:50%;
    right: 5px;
    transform:translateY(-50%);
    width:35px;
    height:35px;
  }

`

const Slider = styled.div`
    width: 100%;
    height: 30em;
    box-sizing: border-box;
    margin:0;
    padding:0;
    display:flex;
    align-items: center;
    overflow:hidden;

    @media ${device.maxMobileL} { 
      height: 60em;
    }  
`

const Item = styled.div`
    background-color: #e4dad0;
    /* background-color: #eee; */
    min-width: 100%;
    height: 30em;
    transition: 0.5s;
    overflow:hidden;

    @media ${device.maxMobileL} { 
      height: 60em;
    }  
` 

const Stepper = styled.ul`
  position: absolute;
  bottom:0;
  left:0;
  right: 0;

  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
`

const StepperCircle = styled.li`
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin-right:10px;
    background-color: #999;
    border-radius: 50%;
    display:inline-block;

    &.active {
    background-color: ${ props => props.theme.colors.secondary} !important;
    }

`
const StepperButton = styled.li`
    cursor: pointer;
    height: 35px;
    width: 20%;
    border-top: 2px solid rgba(192,192,192,0.3);
  
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    &.active {
      border-top: 2px solid #fff !important;
    }
`
const ConocerMas = styled.div`
    position:absolute;
    display:flex;
    height: 80%;
    width: 100%;
    padding: 40px 0px 0 5em;
    /* margin-left: 5em; */
    margin-top:2em;

    @media ${device.maxMobileL} { 
      bottom:0;
      padding:20em 0 0 35px;
    }  
`
// * container *
const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 55vh;
`
const ConocerSelecciones = styled.div`
  width: 40%;
  margin-top: 20px;
  
  @media ${device.maxMobileL} { 
      width: 100%;
      margin: 0;
  }
`

export {
  Container,
  Slider,
  Item,
  Stepper,
  StepperCircle,
  StepperButton,
  ConocerMas,
  ConocerSelecciones,
  ContainerInfo
}
