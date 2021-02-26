import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('../images/fondo_elegituseleccion.jpg');
  background-position: center top;
  background-repeat: no-repeat;
`

const SelectionCard = styled.div`
  border: 1px solid #e6e6e6;
  width: 80em;
  display: flex;
  padding: 30px;
  justify-content: space-around;
  margin: 1em 3em 1em 3em;
  border-radius: 20px;
`
const SelectionExclusiveContainer = styled.div`
  width: 30em;
  padding: 0;
`
const ImgLogoSelection = styled.img`
  width: 5em;
  margin: 1em 0;
`

const SelectionExclusiveContent = styled.div`
  display: flex;
  flex-direction: column;
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
}
