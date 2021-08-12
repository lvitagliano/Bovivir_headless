import styled from "styled-components";
import device from '../../Styles/device'

const Container = styled.div.attrs(props => ({
}))`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: ${props => props.flexDirection};
    padding: 50px 0 0 0;
    background-color: '#752057';

    @media ${device.maxMobileL} {
        flex-direction: column;
        align-items: center;
  }
`
const QuienesSomosContainer = styled.div.attrs(props => ({
}))`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: ${props => props.flexDirection};
    padding: 50px 0 0 0;
    height: 45em;
    z-index: -200;
    background-color: #752057;

    @media ${device.maxMobileL} {
        height: 70em;
        align-items: center;
        padding: 0 0 0 0;
        justify-content: flex-start;
        
  }
`
const ImgStyle = styled.img.attrs(props => ({
}))`
    
    border-radius: 10px;
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    z-index: 1;

    @media ${device.maxMobileL} {
        /* width: 90%; */
        margin: 0 0 0 0;
    } 
`
const ContainerContent = styled.div.attrs(props => ({
}))`
    width: 30em;
    padding-top: 50px;

    @media ${device.maxMobileL} {
        width: 80%;
        align-items: center;
    }
`
const ContainerFlex = styled.div.attrs(props => ({
}))`
    display: flex; 
    justify-content: center;
    margin-top: 100px;


    @media ${device.maxMobileL} {
        flex-direction: column;
        align-items: center;
        margin-top: 30px;

    }
` 
const ImageBottom = styled.img.attrs(props => ({
}))`
    position: relative; 
    bottom: 67px;

    @media ${device.maxMobileL} {
        display: none;
    } 
` 
const ImageBottom2 = styled.img.attrs(props => ({
}))`
    position: relative; 
    bottom: 90px; 
    border-bottom: 130px solid #f7f7f7;

    @media ${device.maxMobileL} {
        display: none;
    } 
`
const ImageCoup = styled.img.attrs(props => ({
}))`
    position: relative;
    left: 22px;
    bottom: 46px; 
    height: 20em;

    @media ${device.maxMobileL} {
        display: none;
    } 
`
const ContainerComunidad = styled.div.attrs(props => ({
}))`
    display: flex;
    justify-content: center; 
    margin-top: 100px;

    @media ${device.maxMobileL} {
       flex-direction: column;
       align-items: center;
       width: 23em;
       margin: 0;
       margin-bottom: 50px;
    } 
`
const ImgQuienesSomos = styled.img.attrs(props => ({
}))`
    margin: 0 40px 0 0;
    width: 27em;
    height: 35em;
    border-radius: 10px;
    z-index: 1;


    @media ${device.maxMobileL} {
        width: 19em; 
        height: 30em;
        margin: 0;
    } 
`
const ImgSeleccion = styled.img.attrs(props => ({  
}))`
    width: 40em;
    height: 29em;
    border-radius: 10px;
    margin: 0 50px 0 0;
    @media ${device.maxMobileL} {
        width: 20em; 
        height: 14em;
        margin: 0;
    } 
`
const ImgBotellas = styled.img.attrs(props => ({
}))`
    margin: 0 0 0 30px;
    width: 40em;
    height: 29em;

    @media ${device.maxMobileL} {
        margin: 0;
        width: 23em;
        height: 19em;
    } 
`
const ImgComunidad = styled.img.attrs(props => ({
}))`
     margin: 0 30px 0 0;
     width: 40em;
     height: 29em;
     z-index: 1;

    @media ${device.maxMobileL} {
        margin: 0;
        width: 22em;
        height: 18em;
    } 
`

export {
    Container,
    QuienesSomosContainer,
    ImgStyle,
    ContainerContent,
    ContainerFlex,
    ImageBottom,
    ImageCoup,
    ContainerComunidad,
    ImgQuienesSomos,
    ImgSeleccion,
    ImgBotellas,
    ImgComunidad,
    ImageBottom2
}