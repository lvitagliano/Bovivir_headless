// :root {
//   --marquee-width: 80vw;
//   --marquee-height: 20vh;
//   /* --marquee-elements: 12; */ /* defined with JavaScript */
//   --marquee-elements-displayed: 5;
//   --marquee-element-width: calc(var(--marquee-width) / var(--marquee-elements-displayed));
//   --marquee-animation-duration: calc(var(--marquee-elements) * 3s);
// }
import styled from "styled-components";


const Marquee = styled.div `
  width:100%;
  height: ${props => props.elemHeight};
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  margin: 3em 0;

  &:before{
    position: absolute;
    top: 0;
    width: .3rem;
    height: 100%;
    content: "";
    z-index: 1;
    left: 0;
    background: linear-gradient(to right, #fff 0%, transparent 100%);
  }
  &:after{
    position: absolute;
    top: 0;
    width: .3rem;
    height: 100%;
    content: "";
    z-index: 1;
    right: 0;
    background: linear-gradient(to left, #fff 0%, transparent 100%);
  }
`
const MarqueeContent = styled.ul `
  list-style: none;
  height: 100%;
  display: flex;
  animation: scrolling calc(${props => props.numElems} * 5s) linear infinite;

  & li {
     display: flex;
     justify-content: center;
     align-items: center;
     flex-shrink: 0;
     width: ${props => props.elemWidth}px;
     max-height: 100%;
     white-space: nowrap;
     margin: 0 4em;
   }

  &:hover {
    animation-play-state: paused;
  }

  @keyframes scrolling {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-1 * ${props => props.elemWidth}px * ${props => props.numElems})); }
  }

`


export {
  Marquee,
  MarqueeContent
}