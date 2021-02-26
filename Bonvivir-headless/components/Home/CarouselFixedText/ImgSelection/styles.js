import styled from "styled-components";
import device from "../../../../Styles/device";

const ImgSelecciones = styled.div `
    width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media ${device.maxMobileL} { 
        display: none;
    }  
`

const BottleSelection = styled.img`
    width: 420px;
`

const BottleSelectionparagraph = styled.p`
    width: 90%;
    text-align: center;
`

export {
    ImgSelecciones,
    BottleSelection,
    BottleSelectionparagraph
}