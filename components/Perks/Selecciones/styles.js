import styled from 'styled-components'
import device from '../../../Styles/device'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('../images/fondo_elegituseleccion.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-color: #ffffff;

  @media ${device.maxMobileL} {
    padding: 0 10px;
  }
`

const SelectionCards = styled.div`
  display: flex;

  @media ${device.maxMobileL} {
  }
`

const SelectionCard = styled.div`
  border: 1px solid #e6e6e6;
  width: 80em;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 2em 2em 1em 2em;
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

  @media ${device.maxMobileL} {
    margin-top: 15px;
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
  Container,
  SelectionCard,
  ImgCajaSelection,
  SelectionExclusiveContainer,
  SelectionExclusiveContent,
  ContentAling,
  ImgLogoSelection,
  ListUl,
  ExplorerSelectionContainer,
  SelectionCards,
}
