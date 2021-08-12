import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  ruleString,
  ruleNumber,
  ruleReqUndefined,
  ruleReqDatePicker,
} from '../../constants/validationRules'
import InputForm from '../Commons/InputForm'
import Button from '../Commons/Button'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { updateCustomerDataM2Action } from '../../store/actions/m2Action'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

// USESTYLES
const useStyles = makeStyles(theme => ({}))
const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#762057',
    },
  },
})

// Constants for selectsForm components
const genders = {
  inputName: 'gender',
  title: 'Genero',
  subTitle: 'Seleccione...',
  options: [
    {
      name: 'Masculino',
      value: 1,
    },
    {
      name: 'Femenino',
      value: 2,
    },
  ],
}
const idType = {
  inputName: 'taxvat_type',
  title: 'Tipo de documento',
  subTitle: 'Seleccione...',
  options: [
    {
      name: 'DNI',
      value: '246',
    },
    {
      name: 'Pasaporte',
      value: '252',
    },
  ],
}

export default function FormCustomerData({ redirectionHandler }) {
  const classes = useStyles()
  // REDUX
  const dispatch = useDispatch()
  const { firstname, lastname, gender, taxvat, dob, custom_attributes } = useSelector(
    state => state.m2.customerData
  )

  // const [taxvat_typeValue, setTaxvat_typeValue] = useState(
  //   custom_attributes?.find(i => i.attribute_code === 'taxvat_type')?.value || 'undefined'
  // )
  const [genderValue, setGenderValue] = useState(gender || 'undefined')
  const [loading, setLoading] = useState(false)
  const [datePickerError, setDatePickerError] = useState(null)

  // USEFORM
  const { errors, handleSubmit, control, getValues, setValue, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  // HANDLERS & METHODS
  const onSubmit = async (data, event) => {
    event.preventDefault()
    if (data.dod === 'Invalid Date') {
      console.log('fecha es invalida')
    } else {
      setLoading(true)
      await dispatch(
        updateCustomerDataM2Action({ ...data, dob: new Date(data.dob).toLocaleDateString('en-US') })
      )
      redirectionHandler(false)
    }
    setLoading(false)
  }

  const handleBackCancel = () => {
    redirectionHandler(false)
  }

  // SELECT STATE COMPONENT
  const handleSelectState = e => {
    switch (true) {
      case e.target.name === 'gender':
        setGenderValue(e.target.value)
        setValue('gender', e.target.value)
        break
      case e.target.name === 'taxvat_type':
        setTaxvat_typeValue(e.target.value)
        setValue('taxvat_type', e.target.value)
        break
    }
  }
  const SelectState = ({ onChange, value, object, selectValue = 'undefined' }) => {
    return (
      <FormControl variant="outlined">
        <label style={{ fontWeight: 'bold', color: '#762057' }}>{object.title}</label>
        <Select
          name={object.inputName}
          value={selectValue}
          onChange={e => handleSelectState(e)}
          style={{ height: '32px' }}
        >
          <MenuItem value={'undefined'}>{object.subTitle}</MenuItem>
          {object.options.map((item, index) => (
            <MenuItem key={item.value} value={item.value} selected={item.value === value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  const disabledSubmit = () => {
    return !formState.isValid || datePickerError !== ''
  }

  const currentDate = new Date()
  const calculateOlderAge = new Date().setFullYear(new Date().getFullYear() - 18)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem 4rem' }}
        >
          <Controller
            as={InputForm}
            label="Nombre"
            placeholder="Ingrese su Nombre"
            defaultValue={firstname}
            name="firstname"
            control={control}
            type="firstname"
            rules={ruleString()}
            error={errors.firstname && errors.firstname['message']}
          />
          <Controller
            as={InputForm}
            label="Apellido"
            placeholder="Ingrese su Apellido"
            defaultValue={lastname}
            name="lastname"
            control={control}
            type="lastname"
            rules={ruleString()}
            error={errors.lastname && errors.lastname['message']}
          />

          {/* <Controller
          as={InputForm}
          label="Email"
          placeholder="Ingrese su Email"
          defaultValue={''}
          name="email"
          control={control}
          type="email"
          rules={ruleString()}
          error={errors.email && errors.email['message']}
        />
        <Controller
          as={InputForm}
          label="Constraseña"
          placeholder="Ingrese su Constraseña"
          defaultValue={''}
          name="password"
          control={control}
          type="password"
          rules={ruleString()}
          error={errors.password && errors.password['message']}
        /> 
      */}
          <Controller
            control={control}
            defaultValue={genderValue}
            name="gender"
            as={SelectState({
              value: genderValue,
              object: genders,
              selectValue: genderValue,
            })}
            rules={ruleReqUndefined}
            error={errors.gender && errors.gender['message']}
          />
          {/* 
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '40%' }}>
              <Controller
                control={control}
                defaultValue={taxvat_typeValue === '0' ? 'undefined' : taxvat_typeValue}
                name="taxvat_type"
                as={SelectState({
                  value: taxvat_typeValue === '0' ? 'undefined' : taxvat_typeValue,
                  object: idType,
                  selectValue: taxvat_typeValue === '0' ? 'undefined' : taxvat_typeValue,
                })}
                rules={ruleReqUndefined}
                error={errors.taxvat_type && errors.taxvat_type['message']}
              />
            </div>
            <div style={{ width: '50%' }}> */}
          <Controller
            width="100%"
            as={InputForm}
            label="Numero de Documento"
            placeholder="Ingrese su Numero de documento"
            defaultValue={taxvat}
            name="taxvat"
            control={control}
            type="taxvat"
            rules={ruleNumber(8, 7)}
            error={errors.taxvat && errors.taxvat['message']}
          />
          {/* </div>
          </div> */}

          <Controller
            width="100%"
            control={control}
            name="dob"
            rules={ruleReqDatePicker}
            defaultValue={
              dob ? new Date(dob?.replaceAll('-', '/')).toLocaleDateString('en-US') : currentDate
            }
            render={({ onChange, value }) => (
              <>
                <label style={{ fontWeight: 'bold', color: '#762057' }}>Fecha de Nacimiento</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      invalidDateMessage="Fecha invalida"
                      inputVariant="outlined"
                      maxDateMessage="Debes ser mayor de 18 años."
                      format="dd/MM/yyyy"
                      maxDate={calculateOlderAge}
                      onError={(error, value) => setDatePickerError(error)}
                      value={value}
                      onChange={e => {
                        e === null ? onChange('Invalid Date') : onChange(e)
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      InputAdornmentProps={{ position: 'start' }}
                      cancelLabel={'Cancelar'}
                      okLabel={'Confirmar'}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </>
            )}
          />
        </div>
      </div>
      {/* Button's section */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button margin="20px 0 10px 0" text={'Cancelar'} type="button" onClick={handleBackCancel} />
        <Button
          margin="20px 0 10px 0"
          text={'Confirmar'}
          type="submit"
          loading={loading}
          disabled={disabledSubmit()}
        />
      </div>
    </form>
  )
}
