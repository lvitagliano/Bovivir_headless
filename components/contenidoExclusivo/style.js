import styled from 'styled-components'

const ContainerHeader = styled.div`
  height: 40em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: ${props => props.padding || '0 0 50px 10em'};
  background-color: #000;
  background-image: ${props => `url(${props.backgroundImage})` || 'none'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Paragraph = styled.p`
  font-weight: ${props => props.fontWeight || 'bold'};
  margin: 0 0 10px 0;
  color: ${props => props.color || '#fff'};
  width: ${props => props.width || '52em'};
  text-transform: ${props => props.textTransform || 'capitalize'};
`
const Title = styled.h1`
  font-size: ${props => props.fontSize || '3em'};
  color: ${props => props.color || '#fff'};
  font-weight: ${props => props.fontWeight || 'bold'};
  width: ${props => props.width || '18em'};
  margin: 0 0 20px 0;
  text-align: ${props => props.textAlign || 'start'};
`
const ContainerFlex = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  align-items: ${props => props.alignItems || 'center'};
  width: ${props => props.width || '100%'};
  justify-content: ${props => props.justifyContent || 'center'};
  overflow: ${props => props.overflow || 'none'};
  border-radius: 5px;
  margin: 10px 0;
  background-color: ${props => props.backgroundColor || '#fff'};
`
const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-flow: dense;
  grid-column-gap: 145px;
  column-gap: 145px;
  justify-content: center;
  width: 90%;
`
const ButtonLocation = styled.button`
  width: 50%;
  height: 4em;

  font-weight: bold;
  color: #b0b0b2;
  background-color: #f5f5f3;
  border: none;

  &:focus {
    color: #752057;
    background-color: #edeae1;
    border: none;
  }
`

export { ContainerHeader, Paragraph, Title, ContainerFlex, ContainerGrid, ButtonLocation }
