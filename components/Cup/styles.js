import styled from "styled-components";

const CupContainer = styled.div`
    width: 84px;
    margin: 40px auto 25px auto;
    height: 159px;
`

const CupImg = styled.img.attrs(props => ({
    src: props.src,
  }))`
    position: absolute;
    z-index: 2;
`

const Bowl = styled.div.attrs(props => ({
    // x: props.x || '0px',
    // y: props.y ||'0px',
    // xmlns: props.xmlns ||'http://www.w3.org/2000/svg',
    // width: props.width ||'50',
    // height: props.height ||'100',
    // viewBox: props.viewBox ||'0 0 300 300',
    // version: props.version ||'1.1',
}))`
    /* fill: ${props => props.theme.colors.secondary}; */
    
`
const Inner = styled.div`
    border-radius: 0 0 100px 100px;
    width: 64px;
    height: 76px;
    position: relative;
    left: 12px;
    top: 10px;
    overflow: hidden;
`

const Fill = styled.div`
    transition: all 0.5s ease;
`

const Wave = styled.svg.attrs(props => ({
    x: props.x || '0px',
    y: props.y ||'0px',
    xmlns: props.xmlns ||'http://www.w3.org/2000/svg',
    width: props.width ||'50',
    height: props.height ||'100',
    viewBox: props.viewBox ||'0 0 300 300',
    version: props.version ||'1.1',
}))`
    fill: ${props => props.theme.colors.secondary};
    animation-name: waveAction;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 0.5s;
    width: 133px;
    height: 152px;

    @keyframes waveAction {
    0% {
        -webkit-transform: translate(-64px, 0)
    }

    100% {
        -webkit-transform: translate(0, 0)
    }
}

`

export {
    CupImg,
    Bowl,
    Inner,
    CupContainer,
    Wave,
    Fill,
}