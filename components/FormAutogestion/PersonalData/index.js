import React, { useState,useEffect } from 'react'
import moment from 'moment'
import { MONTHS } from '../../../constants/form'
import DescriptionSelection from '../DescriptionSelection'
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
import {ruleString,ruleNumber,ruleEmail} from "../../../constants/validationRules"
import { useSelector } from "react-redux"
import {Select,FormControl} from '@material-ui/core';

export const PersonalData = ({step,control,register,errors,watch}) => {
  const { step2 } = useSelector(state => state.register)
  const [days, setDays] = useState(31);
  const [months, setMonths] = useState(12);
  const watchFields = watch(["years", "months","days"]);

  const dateLast = moment()
    .add(-18, 'years')
    .get('year')
  const dateInit = moment()
    .subtract(100, 'years')
    .get('year')
  let YEARS = []
  for (var i = dateInit; i <= dateLast; i++) {
    YEARS.push(i)
  }

  const SelectDay = ({onChange,onBlur,value}) => {
    return (
      <FormControl variant="outlined">
        <LabelForm>Día</LabelForm>
        <Select
            native
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            style={{height:"32px"}}
          >
          {[...new Array(days)].map((value, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
      </FormControl>
    );
  }
    
  const SelectMonth = ({onChange,onBlur,value}) => (
    <FormControl variant="outlined">
      <LabelForm>Mes</LabelForm>
      <Select
        native
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{height:"32px"}}
      >
        {MONTHS.map(item => {
          if(months>=item.id){
            return  <option key={item.id} value={item.id}>
                      {item.mes}
                    </option>
          }
        })}
    </Select>
    </FormControl>
  )
  const SelectYear = ({onChange,onBlur,value}) => (
      <FormControl variant="outlined">
        <LabelForm> Año</LabelForm>
        <Select
          native
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          style={{height:"32px"}}
        >
          {YEARS.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
    </FormControl>
  )

  useEffect(() => {
    if(watchFields.years && watchFields.months){
      const month = moment(`${watchFields.years}-${watchFields.months.padStart(2,0)}`)
      let maxDays = 1;
      for (let i = 1; i <= month.daysInMonth(); i++) {
        if(moment().diff(`${watchFields.years}-${watchFields.months.padStart(2,0)}-${i+1}`,'years',false)>=18){
          maxDays=i;
        }
      }
      setDays(maxDays);
    }
  }, [watchFields.years,watchFields.months,setDays]);

  useEffect(() => {
    if(watchFields.years){
      let maxMonth = 1;
      for (let i = 1; i <= 12; i++) {
        if(moment().diff(`${watchFields.years}-${i.toString().padStart(2,0)}-01`,'years',false)>=18){
          maxMonth=i;
        }
      }
      setMonths(maxMonth);
    }
  }, [watchFields.years,setMonths]);

  return (
    <>
    <SectionDataContainer>
      <DescriptionSelection/>
      <FormCard>
        <FormTitle>Datos personales</FormTitle>
        <ContainerOneColumn>
          <Controller 
            as={InputForm} 
            label='Nombres *'
            defaultValue={step2.name}
            name="name" 
            control={control} 
            placeholder="John"
            type="text"
            width="100%"
            rules={ruleString()}
            error={errors.name && errors.name["message"]}
          />   
        </ContainerOneColumn>
        
        <ContainerOneColumn>
          <Controller 
            as={InputForm} 
            label='Apellidos *'
            defaultValue={step2.lastname}
            name="lastname" 
            control={control} 
            placeholder="Doe"
            type="text"
            width="100%"
            rules={ruleString()}
            error={errors.lastname && errors.lastname["message"]}
          /> 
        </ContainerOneColumn>

        <ContainerOneRow>
          <ContainerOneColumn width="30%">
            <Controller 
              as={InputForm} 
              label='Cod. Área (Sin 0)'
              defaultValue={step2.areacod}
              name="areacod" 
              control={control} 
              placeholder="11"
              type="text"
              width="100%"
              rules={ruleNumber(4, 2)}
              error={errors.areacod && errors.areacod["message"]}
            /> 
          </ContainerOneColumn>
              
          <ContainerOneColumn width="60%">
            <Controller 
              as={InputForm}
              label='Número telefónico (Sin 0)'
              defaultValue={step2.tel}
              name="tel" 
              control={control} 
              placeholder="12345678" 
              type="text"
              width="100%"
              rules={ruleNumber(12, 8)}
              error={errors.tel && errors.tel["message"]}
            /> 
          </ContainerOneColumn>
        </ContainerOneRow>

        <ContainerOneColumn>
          <Controller 
              as={InputForm} 
              label='Correo electrónico *'
              defaultValue={step2.email}
              name="email" 
              control={control} 
              placeholder='juanmartin@gmail.com'
              type="email"
              width="100%"
              rules={ruleEmail}
              error={errors.email && errors.email["message"]}
            /> 
        </ContainerOneColumn>

        <ContainerOneColumn>
          <LabelForm>Fecha de nacimiento *</LabelForm>
          <ContainerOneRow>
            <Controller
              control={control}
              defaultValue={step2.days}
              name="days"
              valueName={step2.days} 
              as = {SelectDay}
            />
            <Controller
              control={control}
              defaultValue={step2.months}
              valueName={step2.months}
              name="months"
              as={SelectMonth}
            />
             <Controller
              control={control}
              defaultValue={step2.years}
              valueName={step2.years}
              name="years"
              as={SelectYear}
            />
          </ContainerOneRow>
        </ContainerOneColumn>
        <input hidden ref={register} name="step" value={step} />
      </FormCard>
    </SectionDataContainer>
  </>
  )
}
