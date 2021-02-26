import styled from "styled-components";

const Container = styled.div`
  position: relative; 
  display:flex;
  justify-content: space-between;

  margin-top: 1px;

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
`

const Item = styled.div`
    background-color: #625261;
    background-position: center;
    background-size: cover;
    min-width: 100%;
    height: 30em;
    transition: 0.5s;
    overflow:hidden;
` 

const Stepper = styled.ul`
  width: 95%;
  position: absolute;
  bottom:0;
  left: 50%;
  right: 0;

  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
  transform: translateX(-50%);
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
    min-width: 30%;
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

export {
  Container,
  Slider,
  Item,
  Stepper,
  StepperCircle,
  StepperButton,
}
