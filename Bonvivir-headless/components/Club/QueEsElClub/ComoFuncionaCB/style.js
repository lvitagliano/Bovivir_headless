import styled from "styled-components";
import device from "../../../../Styles/device";

const BannerContainer = styled.div`

    display: flex;
    flex-direction:column;
    align-items: center;
    height: ${props => props.height || '100vh'};
    width: 100%;
    padding: 5em 10em;
    background: ${props => props.background};

    @media ${device.maxMobileL} { 
    }
`

export {
    BannerContainer,
}