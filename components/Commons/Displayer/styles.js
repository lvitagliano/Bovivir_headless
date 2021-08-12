import { red, blue } from '@material-ui/core/colors'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import styled from 'styled-components'
import device from '../../../Styles/device'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 3.5rem;
  @media ${device.maxMobileL} {
    width: 100%;
    overflow: hidden;
  }

  & .arrow-icon {
    & :hover {
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #eeeeee;
    }
  }

  & .arrow-left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
  }

  & .arrow-right {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
  }
`

const Slider = styled.div.attrs(props => ({
  spaceBetweenArrows: props.spaceBetweenArrows || 0,
  disableMinHeight: props.disableMinHeight ? undefined : '30em',
}))`
  width: 100%;
  min-height: ${props => props.disableMinHeight};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: ${props => props.spaceBetweenArrows};
  padding-right: ${props => props.spaceBetweenArrows};
  .slide-left {
    -webkit-animation: slide-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: slide-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  .slide-right {
    -webkit-animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .fade-in {
    -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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

const ChevronRightIconCircle = styled(ChevronRightIcon)`
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
`
const ChevronLeftIconCircle = styled(ChevronLeftIcon)`
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
`

export { Container, Slider, ChevronRightIconCircle, ChevronLeftIconCircle }
