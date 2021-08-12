import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5em;
`
const ContainerContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 340px);
  grid-auto-flow: dense;
  grid-column-gap: 30px;
  column-gap: 30px;
  row-gap: 30px;
  justify-content: center;
  padding-bottom: 4em;
`
const ContainerBodegas = styled.div`
  border-radius: 5px;
  height: 25em;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const BodegasLogoContainer = styled.div`
  width: 8em;
  height: 5em;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`
const BodegasLogo = styled.img`
  width: 7em;
`
const BodegasParragraph = styled.p`
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
`

export {
  Container,
  ContainerContent,
  ContainerBodegas,
  BodegasParragraph,
  BodegasLogo,
  BodegasLogoContainer,
}
