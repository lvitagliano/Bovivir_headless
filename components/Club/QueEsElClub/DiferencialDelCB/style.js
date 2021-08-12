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
        display: none;
    }
`
const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 0px 0px;
    grid-template-areas:
    "beneficio club-bonvivir otros-clubes-de-vino vinotecas supermercados";
    margin: 70px 0 0 0;
`

const Beneficio = styled.div`
    background: #fff;
    grid-area: beneficio;
    border: 1px solid #efeef1;
    border-radius: 10px 0 0 10px;
    height: 998px;
    width: 390px;
`
const ClubBonvivir = styled.div`
    background: #752057;
    grid-area: club-bonvivir;
    border: 1px solid #843568;
    border-radius: 10px;
    padding: 30px 0;

    height: 75em;
    width: 150px;
    position: relative;
    top: -30px;
`
const OtrosClubesDeVino = styled.div`
    background: #fff;
    grid-area: otros-clubes-de-vino;
    border: 1px solid #efeef1;
    height: 998px;
    width: 150px;
`
const Vinotecas = styled.div`
    background: #fff;
    grid-area: vinotecas;
    border: 1px solid #efeef1;
    height: 998px;
    width: 150px;

`
const Supermercados = styled.div`
    background: #fff;
    grid-area: supermercados;
    border: 1px solid #efeef1;

    border-radius: 0 10px 10px 0;
    height: 998px;
    width: 150px;

`
const TableTitle = styled.div`
    height: 5em;
    color:${props => props.color || "333"};
    font-size: 0.9em;
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 1px solid #efeef1;
    text-align: center;
    padding: 30px 20px;
   
    height: 90px;
    display: flex;
    justify-content: ${props => props.justifyContent || "center"};
    align-items: center;
`
const Tablecontent = styled.div`
    padding: 15px 15px 15px 30px;
    color: #737476;
    font-size: 0.9em;
    border-bottom: 1px solid #efeef1;
`
const TableIcon = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #efeef1;

`
export {
    BannerContainer,
    TableContainer,
    Beneficio,
    ClubBonvivir,
    OtrosClubesDeVino,
    Vinotecas,
    Supermercados,
    TableTitle,
    Tablecontent,
    TableIcon
}