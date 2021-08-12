import Button from '../Commons/Button'
import DefaultAddress from './defaultAddress'
import TableAllAddress from './tableAllAddress'
import { useSelector } from 'react-redux'
import FormAddress from '../formAddressCustomerM2'
import React, { useState, useEffect } from 'react'

export default function AddressBook({ title }) {
  const { addresses } = useSelector(state => state.m2.customerData)
  const [rows, setRows] = useState(addresses)
  const [defaultShipping, setDefaultShipping] = useState(rows?.find(i => i.default_shipping))
  const [defaultBilling, setDefaultBilling] = useState(rows?.find(i => i.default_billing))
  const [AddressForm, setAddressForm] = useState(false)
  const [AddressFormState, setAddressFormState] = useState(null)

  const handleFormAddress = (action, idAddress) => {
    setAddressFormState({ action, idAddress })
    setAddressForm(true)
  }

  // Al elimiar o agregar una nueva direccion actualizara las rows de la tabla
  useEffect(() => {
    setRows(addresses)
    setDefaultShipping(addresses?.find(i => i.default_shipping))
    setDefaultBilling(addresses?.find(i => i.default_billing))
  }, [addresses])

  return (
    <>
      {AddressForm ? (
        <FormAddress AddressFormState={AddressFormState} redirectionHandler={setAddressForm} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ color: '#47484A' }}>{title}</h3>
            <Button text="Agregar Direccion" onClick={() => handleFormAddress('Agregar')} />
          </div>
          <div>
            <DefaultAddress defaultShipping={defaultShipping} defaultBilling={defaultBilling} />
            <br />
            <TableAllAddress rows={rows} handleFormAddress={handleFormAddress} />
          </div>
        </div>
      )}
    </>
  )
}
