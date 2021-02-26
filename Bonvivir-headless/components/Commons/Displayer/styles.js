
import { red,blue } from "@material-ui/core/colors";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styled from "styled-components";

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
    min-height: 30em;
    box-sizing: border-box;
    margin:0;
    padding:0;
    display:flex;
    align-items: center;
    justify-content: space-around;

    .slide-left {
      -webkit-animation: slide-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
              animation: slide-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    }

    .slide-right {
      -webkit-animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
              animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    .fade-in {
      -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
              animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    @-webkit-keyframes slide-left {
      0% {
        -webkit-transform: translateX(100%);
                transform: translateX(100%);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }
    @keyframes slide-left {
      0% {
        -webkit-transform: translateX(100%);
                transform: translateX(100%);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    @-webkit-keyframes slide-right {
      0% {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }
    @keyframes slide-right {
      0% {
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    @-webkit-keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }


`

const ChevronRightIconCircle = styled(ChevronRightIcon) `
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
  
`
const ChevronLeftIconCircle = styled(ChevronLeftIcon) `
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
  
`

export {
  Container,
  Slider,
  ChevronRightIconCircle,
  ChevronLeftIconCircle
}
