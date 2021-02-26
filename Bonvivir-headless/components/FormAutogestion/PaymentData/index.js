import React from 'react'
import { useSelector } from "react-redux"
import {
    SectionDataContainer,
    FormCard,
    FormTitle,
    ContainerOneColumn,
    ContainerOneRow,
  } from '../../Commons/styles'
import InputForm from '../../Commons/InputForm'
import LabelForm from '../../Commons/LabelForm'
import { Controller } from "react-hook-form"
import DescriptionSelection from '../DescriptionSelection'
import {CreditCardDiv, CreditCardImg} from './styles'
import {ruleString} from "../../../constants/validationRules"
import {getCardTypeByValue} from './hardcord'
import {Select,FormControl} from '@material-ui/core';

const TypeOfCard = ({onChange,onBlur,value}) => {
    return (
      <FormControl variant="outlined">
        <LabelForm>Seleccione un tipo de tarjeta</LabelForm>
        <Select
            native
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={{height:"32px"}}
          >
            <option key={0} value={0}>Debito</option>
            <option key={1} value={1}>Credito</option>
          </Select>
      </FormControl>
    );
  }

export const PaymentData = ({step,control,register,errors,watch}) => {
    const { step5 } = useSelector(state => state.register)
    return (
        <>
        <SectionDataContainer>
            <DescriptionSelection/>
                <FormCard>
                    <FormTitle style={{marginBottom: '30px'}}>Datos de pago</FormTitle>
                    <LabelForm>Tarjeta de credito de la suscripcion *</LabelForm>
                    <CreditCardDiv>
                        <ContainerOneRow style={{alignItems: 'flex-end'}}>
                            <ContainerOneColumn>
                            <Controller
                                control={control}
                                defaultValue={step5.debito}
                                name="card"
                                valueName={step5.debito} 
                                as = {TypeOfCard}
                                />
                            </ContainerOneColumn>
                            <ContainerOneColumn>
                                <CreditCardImg
                                    src={getCardTypeByValue(0).image}
                                    alt='logo'
                                />
                            </ContainerOneColumn>
                        </ContainerOneRow>
                        <ContainerOneColumn>
                            <Controller 
                                as={InputForm} 
                                label='Numero de tarjeta *'
                                defaultValue={step5.name}
                                name="creditCard" 
                                control={control} 
                                placeholder="xxxx-xxxx-xxxx-xxxx-xxxx"
                                type="number"
                                width="100%"
                                rules={ruleString}
                                error={errors.name && errors.name["message"]}
                            />   
                        </ContainerOneColumn>
                        <ContainerOneColumn>
                            <Controller 
                                as={InputForm} 
                                label='Nombre completo *'
                                defaultValue={step5.name}
                                name="name" 
                                control={control} 
                                placeholder="John Pepitona"
                                type="text"
                                width="100%"
                                rules={ruleString}
                                error={errors.name && errors.name["message"]}
                            />   
                        </ContainerOneColumn>
                    </CreditCardDiv>
                    <input hidden ref={register} name="step" value={step} />
                </FormCard>
            </SectionDataContainer>
        </>
    )
}
