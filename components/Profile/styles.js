import styled from 'styled-components'
import device from '../../Styles/device'

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

  @media ${device.maxMobileL} {
    width: 100%;
    padding: 0.5rem;
  }
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
const Title = styled.h2`
  font-size: 1.5em;
  color: #333;
`
const SubTitle = styled.p`
  font-size: 0.9em;
  color: #9e9e9e;
  /* font-weight: bold; */
  margin: 0 0 5px 0;
`
const Text = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: #333;
`
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DetailsContainerContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  width: 90%;
`
const TableContainer = styled.div`
  outline: 1px solid #d2d2d2;
  background: #fff;
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-around;
`
const TableContainerColumn = styled.div`
  width: url(${props => props.width});
`
const TableTitleColumn = styled.h1`
  margin: 0;
  padding: 5px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 0.9em;
`
const TableParagraphRow = styled.p`
  padding: 10px 0 10px 0;
  margin: 0;
  font-weight: url(${props => props.fontWeight});
`
export {
  MenuProfile,
  ItemProfile,
  DetailProfile,
  OutlineGrey,
  Content,
  TitleContent,
  Title,
  SubTitle,
  Text,
  DetailsContainer,
  DetailsContainerContent,
  TableContainer,
  TableContainerColumn,
  TableTitleColumn,
  TableParagraphRow,
}
