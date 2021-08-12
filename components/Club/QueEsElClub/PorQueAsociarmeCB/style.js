import styled from "styled-components";
import device from "../../../../Styles/device";

const BannerContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    height: ${props => props.height || '100%'};
    width: 100%;
    padding: 5em 10em;
    background: ${props => props.background || '#EDEAE1'};

    @media ${device.maxMobileL} { 
    }
`
const Container1 = styled.div`
    margin-top: 3em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    @media ${device.minMobileL} { 
        flex-direction: row;
        width: 70em;

    }
`
const Container2 = styled.div`
    width: 20em;
    height: 20em;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export {
    BannerContainer,
    Container1,
    Container2
}