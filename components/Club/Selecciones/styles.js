import styled from 'styled-components'
import device from '../../../Styles/device'

const ContainerSeleccion = styled.div`
  background-image: url('../images/fondo_elegituseleccion.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-color: #ffffff;
  background-size: contain;

  @media ${device.maxMobileL} {
    padding: 0 10px;
    background-size: auto;
  }
`

const SelectionCard = styled.div`
  border: 1px solid #e6e6e6;
  width: 80em;
  display: flex;
  padding: 30px;
  justify-content: space-around;
  margin: 1em 3em 1em 3em;
  border-radius: 20px;

  @media ${device.maxMobileL} {
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
  }
`
const SelectionExclusiveContainer = styled.div`
  width: 30em;
  padding: 0;

  @media ${device.maxMobileL} {
    flex-direction: column;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
  }
`
const ImgLogoSelection = styled.img`
  width: 5em;
  margin: 1em 0;
`

const SelectionExclusiveContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 40%;

  @media ${device.maxMobileL} {
    margin-top: 15px;
    flex: none;
    max-width: none;
  }
`
const ContentAling = styled.div`
  display: flex;
`
const ImgCajaSelection = styled.img`
  width: 100px;
  margin: 0 10px 0 0;
`
const ListUl = styled.ul`
  padding: 0;
  list-style: none;
`
const ExplorerSelectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e6e6e6;
  padding: 1em 5em 0 0;
`
export {
  ContainerSeleccion,
  SelectionCard,
  ImgCajaSelection,
  SelectionExclusiveContainer,
  SelectionExclusiveContent,
  ContentAling,
  ImgLogoSelection,
  ListUl,
  ExplorerSelectionContainer,
}
