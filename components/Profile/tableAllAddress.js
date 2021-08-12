import { deleteCustomerAddressM2Action } from '../../store/actions/m2Action'
import { useDispatch } from 'react-redux'
import Table from '../Commons/Table'
import { useState } from 'react'

const columns = [
  { id: 'firstname', label: 'Nombre', minWidth: 100 },
  { id: 'lastname', label: 'Apellido', minWidth: 100 },
  { id: 'street', label: 'Calle', minWidth: 100 },
  { id: 'city', label: 'Ciudad', minWidth: 100 },
  { id: 'postcode', label: 'CP', minWidth: 100 },
  { id: 'telephone', label: 'Telefono', minWidth: 100 },
]

export default function TableAllAddress({ rows, handleFormAddress }) {
  const dispatch = useDispatch()

  return (
    <Table
      title={'Todas mis direcciones'}
      columns={columns}
      data={rows}
      enableActions="Acciones"
      removeDialogConfig={{ title: 'Direcciones', text: '¿Estás seguro que deseas eliminar?' }}
      disableRowsDelete={rows?.filter(row => row.default_shipping && row.default_billing)}
      onDeleteClick={(e, row) => dispatch(deleteCustomerAddressM2Action(row))}
      onUpdateClick={(e, row) => handleFormAddress('Editar', row)}
    />
  )
}
