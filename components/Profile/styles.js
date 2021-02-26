import styled from 'styled-components'

const MenuProfile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 8em 1em 1em;
  margin: 2em 3em 0em 0em;
  height: fit-content;
  width: 270px;
  background-color: #ffffff;
  border-radius: 3px;
`

const ItemProfile = styled.button`
  cursor: pointer;
  display: flex;
  width: 100%;
  margin: 0.5em 4em 0.2em 1em;
  border: none;
  background: transparent;
  transition: 0.2s ease-out;
  color: '#A9A9A9';

  &:hover {
    color: '#3D3D41';
    font-weight: bold;
  }

  /* seleccion del boton */
  &:focus {
    color: black;
    font-weight: bold;
    background-color: #eee;
    border-radius: 5px;
  }
`

const DetailProfile = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 2em 0em 0em 0em;
  width: 70%;
  height: 100%;
  padding: 2em 3em;
  border-radius: 3px;
`

const TitleContent = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || ''};
`

const OutlineGrey = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1em;
  border: 1px solid rgb(137 139 140 / 20%);
  border-radius: 5px;
  padding-left: 30px;
`

const Content = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || 'center'};
  padding-bottom: ${props => props.paddingBottom || ''};
  max-width: 10em;
  min-width: 10em;
  font-weight: bold;
  color: #575759;
  align-items: center;
`

export { MenuProfile, ItemProfile, DetailProfile, OutlineGrey, Content, TitleContent }
