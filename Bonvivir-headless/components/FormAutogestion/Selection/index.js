import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOffers } from '../../../store/actions/offersAction'
import {
  TitleSelection,
  SelectionContainer,
  SelectionSuscription,
  StyleContainer,
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
} from './styles'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const SwitchStyled = withStyles({
  switchBase: {
    color: '#762057',
    '&$checked': {
      color: '#762057',
    },
    '&$checked + $track': {
      backgroundColor: '#762057',
    },
  },
  checked: {},
  track: {},
})(Switch);

export const Selection = props => {
  const [checkbox, setValue] = useState(false)
  const { offers, loading } = useSelector(state => state.offers)
  const imgClubLaNacion = __dirname + 'images/la-nacion.png'

  const dispatch = useDispatch()

  const handleChangeCheckbox = () => {
    setValue(!checkbox)
  }

  useEffect(() => {
    dispatch(getAllOffers())
  }, [])

  const renderGroup = items => (
    <>
      <SelectionContainer>
        {items.map((item, index) => (
          <SelectionSuscription key={index}>
            <img src={item.imagePath} alt=" " />
            <SelectionDetailsTitle>{item.title}</SelectionDetailsTitle>

            <div>
              {item.selectionDetails.map((item, index) => (
                <SelectionDetailsContainerPrice
                  ref={props.register}
                  id="selection"
                  name="selection"
                  value={item.item}
                  key={index}
                >
                  <div>
                    <SelectionLabel key={index}>{item.item}</SelectionLabel>
                  </div>

                  <SelectionContainerPrice>
                    <ContainerPrice>
                      <PriceTitle>Precio</PriceTitle>
                      <PriceDetails>${item.commonPrice}</PriceDetails>
                    </ContainerPrice>

                    <ContainerPrice>
                      <img src={imgClubLaNacion} alt="" style={{ width: '75px' }}></img>
                      <PriceDetails>${item.clubLaNacionPrice}</PriceDetails>
                    </ContainerPrice>
                  </SelectionContainerPrice>
                </SelectionDetailsContainerPrice>
              ))}
            </div>

            <SelectionDetailsParagraph>{item.subtitle}</SelectionDetailsParagraph>
          </SelectionSuscription>
        ))}
      </SelectionContainer>

      <ContainerColumn>
        <ContainerRow>
          <PriceDetails>Hasta 20% de descuento, todos los meses con </PriceDetails>
          <img src={imgClubLaNacion} alt="" style={{ width: '75px' }}></img>
        </ContainerRow>
        <ContainerRow>
          <SwitchStyled
            checked={checkbox}
            onChange={handleChangeCheckbox}
            name="checkbox"
          />
          <SelectionDetailsParagraph>Tengo la tarjeta Club LA NACION</SelectionDetailsParagraph>
        </ContainerRow>
      </ContainerColumn>
    </>
  )

  return (
    <StyleContainer>
      <TitleSelection>Seleccion</TitleSelection>
      {renderGroup(offers)}
      <input hidden ref={props.register} name="step" value={props.step} />
    </StyleContainer>
  )
}
