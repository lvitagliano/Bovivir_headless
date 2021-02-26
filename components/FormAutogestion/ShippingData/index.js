import React, { useState } from 'react'
import { PROVINCIA } from '../../../constants/form'
import {
  SectionDataContainer,
  FormTitle,
  FormCard,
  ContainerOneColumn,
  ContainerOneRow,
} from '../../Commons/styles'
import {Select,FormControl} from '@material-ui/core';
import InputForm from '../../Commons/InputForm'
import LabelForm from '../../Commons/LabelForm'
import { Controller } from "react-hook-form"
import TextAreaForm from '../../Commons/TextAreaForm'
import DescriptionSelection from '../DescriptionSelection'
import {ruleApartm,ruleString,ruleNumber,ruleReq} from "./validationRules"
import { useSelector } from "react-redux"

export const ShippingData = ({control,errors,watch,step,register}) => {
  const { step3 } = useSelector(state => state.register)


const SelectState = ({onChange,onBlur,value}) => 
    <FormControl variant="outlined">
      <LabelForm>Provincia *</LabelForm>
      <Select
        native
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{height:"32px"}}
      >
        {PROVINCIA.map(item => (
          <option key={item.value} value={item.value}>
            {item.description}
          </option>
        ))}
      </Select>
    </FormControl>


return (
    <SectionDataContainer>
      <DescriptionSelection/>
      <FormCard>
        <FormTitle>Datos de envío</FormTitle>

        <ContainerOneRow>
          <ContainerOneColumn width="65%">
            <Controller 
              as={InputForm} 
              label='Calle *'
              placeholder='Avenida del Libertador'
              defaultValue={step3.street}
              name="street" 
              control={control} 
              type="text"
              rules={ruleString(50)}
              error={errors.street && errors.street["message"]}
            />   
          </ContainerOneColumn>
          <ContainerOneColumn width="30%">
            <Controller 
                as={InputForm} 
                label='Altura *'
                placeholder='101'
                defaultValue={step3.number}
                name="number" 
                control={control} 
                type="text"
                rules={ruleNumber(5)}
                error={errors.number && errors.number["message"]}
              />   
          </ContainerOneColumn>
        </ContainerOneRow>

        <ContainerOneRow>
          <ContainerOneColumn width="30%">
            <Controller 
                as={InputForm} 
                label='Código Postal *'
                placeholder='1638'
                defaultValue={step3.zipCode}
                name="zipCode" 
                control={control} 
                type="text"
                rules={ruleNumber(4)}
                error={errors.zipCode && errors.zipCode["message"]}
              />   
          </ContainerOneColumn>
          <ContainerOneColumn width="30%">
              <Controller 
                as={InputForm} 
                label='Piso'
                placeholder='10'
                defaultValue={step3.floor}
                name="floor" 
                control={control} 
                type="text"
                rules={ruleNumber(2)}
                error={errors.floor && errors.floor["message"]}
              />   
          </ContainerOneColumn>
          <ContainerOneColumn width="30%">
              <Controller 
                as={InputForm} 
                label='Depto.'
                placeholder='203'
                defaultValue={step3.apartm}
                name="apartm" 
                control={control} 
                type="text"
                rules={ruleApartm}
                error={errors.apartm && errors.apartm["message"]}
              />
          </ContainerOneColumn>
        </ContainerOneRow>

        <ContainerOneRow>
          <ContainerOneColumn width="48%">
              <Controller 
                as={InputForm} 
                label='Barrio'
                placeholder='Vicente López'
                defaultValue={step3.nbhood}
                name="nbhood" 
                control={control} 
                type="text"
                rules={ruleString(30)}
                error={errors.nbhood && errors.nbhood["message"]}
              />
          </ContainerOneColumn>
          <ContainerOneColumn width="47%">
              <Controller 
                as={InputForm} 
                label='Partido *'
                placeholder='Vicente López'
                defaultValue={step3.zone}
                name="zone" 
                control={control} 
                type="text"
                rules={ruleString(20)}
                error={errors.zone && errors.zone["message"]}
              />
          </ContainerOneColumn>
        </ContainerOneRow>

        <ContainerOneRow>
          <ContainerOneColumn width="47%">
            <Controller
              control={control}
              defaultValue={step3.state}
              name="state"
              valueName={step3.state} 
              as = {SelectState}
            />
          </ContainerOneColumn>

          <ContainerOneColumn width="47%">
              <Controller 
                as={InputForm} 
                label='Pais *'
                placeholder='Argentina'
                defaultValue={step3.country}
                name="country" 
                control={control} 
                type="text"
                rules={ruleString(30)}
                error={errors.country && errors.country["message"]}
              />
          </ContainerOneColumn>
        </ContainerOneRow>

        <ContainerOneColumn>
            <Controller 
              as={TextAreaForm} 
              label='Datos Adicionales (opcional)'
              placeholder='Datos Adicionales (opcional)'
              defaultValue={step3.aditional}
              name="aditional" 
              control={control} 
              type="text"
              rules={ruleString(100)}
              error={errors.aditional && errors.aditional["message"]}
            />
        </ContainerOneColumn>
        <input hidden ref={register} name="step" value={step} />
      </FormCard>
    </SectionDataContainer>
  )
}
