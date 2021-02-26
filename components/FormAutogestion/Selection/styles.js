import styled from 'styled-components'
import device from "../../../Styles/device";

const TitleSelection = styled.h1`
  margin: 20px auto;
  font-size: 30px;
`
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const SelectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-flow: dense;
  column-gap: 60px;
  justify-content: center;
`
const SelectionSuscription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`
const SelectionDetailsTitle = styled.h2`
  font-size: 19px;
  margin: 20px 0;
  color: #707070;
`
const SelectionDetailsContainerPrice = styled.button`
  width: 255px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  margin: 0 0 15px 0;
  padding: 10px;

  border: none;
  border-radius: 5px;
  background: #fff;
  border-bottom: 1px solid #70707082;
  transition: all 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 5px 0px;
  }
  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 5px 0px;
    background: #f6f6f6;
  }
`
const SelectionLabel = styled.div`
  margin: 0;
  font-weight: bold;
  color: #707070;

  width: 100%;
`
const SelectionContainerPrice = styled.div`
  display: flex;
  margin-left: 5px;
`
const ContainerPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &:nth-child(2) {
    margin: 0 0 0 10px;
  }
`
const PriceTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 6px 0;

  font-weight: bold;
  color: #707070;

  padding-top: 15px;
`
const PriceDetails = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: bold;
  color: #707070;
  text-align: right;
`
const SelectionDetailsParagraph = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #70707082;
`
const ContainerColumn = styled.div`
  margin: 30px auto 0px auto;
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;

`
const ContainerRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;

  &:nth-child(1) {
    @media ${device.maxMobileL} { 
    flex-direction: column;
    align-items: center;
  }
  }
`

export {
  TitleSelection,
  StyleContainer,
  SelectionContainer,
  SelectionSuscription,
  SelectionDetailsTitle,
  SelectionDetailsContainerPrice,
  SelectionLabel,
  SelectionContainerPrice,
  ContainerPrice,
  PriceTitle,
  PriceDetails,
  SelectionDetailsParagraph,
  ContainerRow,
  ContainerColumn,
}
