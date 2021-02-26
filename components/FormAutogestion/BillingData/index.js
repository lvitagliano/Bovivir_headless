import React, { useState, useEffect } from 'react'
import {
  SectionDataContainer,
  FormCard,
  FormTitle,
  ContainerOneColumn,
} from '../../Commons/styles'
import InputForm from '../../Commons/InputForm'
import LabelForm from '../../Commons/LabelForm'
import DescriptionSelection from '../DescriptionSelection'
import {Select,FormControl} from '@material-ui/core'
import { Controller } from "react-hook-form"
import { useSelector } from "react-redux"
import {ruleDni,ruleCuit} from "../../../constants/validationRules"

export const BillingData = ({step,control,register,errors,watch}) => {
  const { step4 } = useSelector(state => state.register)
  const watchFields = watch(["voucherType"])
  const [voucher, setVoucher] = useState("1");

  const handleChangeCheck = event => {
    setstate({ ...state, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    setVoucher(watchFields.voucherType)
  }, [watchFields.voucherType,setVoucher]);

  const SelectVoucher = ({onChange,onBlur,value}) => (
    <FormControl variant="outlined">
      <LabelForm>Tipo de comprobante *</LabelForm>
       <Select
          native
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          style={{height:"32px"}}
        >
          <option value="1">Consumidor final</option>
          <option value="2">Responsable Inscripto</option>
        </Select>
    </FormControl>
  )

  return (
    <SectionDataContainer>
      <DescriptionSelection/>
      <FormCard>
        <FormTitle>Datos de facturación</FormTitle>

          <ContainerOneColumn>
          <Controller
              control={control}
              defaultValue={step4.voucherType}
              name="voucherType"
              valueName={step4.voucherType} 
              as = {SelectVoucher}
            />
          </ContainerOneColumn>
          
            {voucher === '1' ? (
              <ContainerOneColumn>
                <Controller 
                  as={InputForm} 
                  label='DNI o Pasaporte*'
                  placeholder='XXXXXXXX'
                  defaultValue={step4.dni}
                  name="dni" 
                  control={control} 
                  type="text"
                  rules={ruleDni}
                  error={errors.dni && errors.dni["message"]}
                />
              </ContainerOneColumn>
              
            ) : (
              <ContainerOneColumn>
                 <Controller 
                  as={InputForm} 
                  label='CUIT*'
                  placeholder='XX-XXXXXXXX-X'
                  defaultValue={step4.cuit}
                  name="cuit" 
                  control={control} 
                  type="text"
                  rules={ruleCuit}
                  error={errors.cuit && errors.cuit["message"]}
                />
              </ContainerOneColumn>
              
            )}
             <input hidden ref={register} name="step" value={step} />
      </FormCard>
    </SectionDataContainer>
  )
}
