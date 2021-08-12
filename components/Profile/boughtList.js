import { useSelector } from 'react-redux'
import Table from '../Commons/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BoughtDetails from './boughtDetails'
import { useState } from 'react'

const columns = [
  { id: 'order_number', label: 'Orden #', minWidth: 100 },
  { id: 'created_at', label: 'Fecha', minWidth: 100, type: 'date' },
  { id: 'grand_total', label: 'Monto', minWidth: 100, type: 'currency' },
  { id: 'status', label: 'Estado', minWidth: 100 },
]

export default function BoughtList({ title }) {
  const { customerBoughtList } = useSelector(state => state.m2)
  const [open, setOpen] = useState(false)

  customerBoughtList?.items?.map((value, i) => {
    if (value.status) {
      switch (true) {
        case value.status === 'pending':
          value.status = 'Pendiente'
          break

        case value.status === 'error_integracion_covedisa':
          value.status = 'Procesando pedido'
          break

        case value.status === 'complete':
          value.status = 'Completo'
          break

        case value.status === 'generate_shipment':
          value.status = 'Generando envío'
          break

        default:
          break
      }
    }
  })

  return (
    <>
      <Table
        title={title}
        columns={columns}
        data={customerBoughtList?.items}
        enableActions="Detalle"
        initialIdSort={'created_at'}
        initialDirSort={'desc'}
        customActions={[
          {
            component: (
              <VisibilityIcon
                onClick={() => setOpen(true)}
                style={{ cursor: 'pointer', margin: '15px 0 0 0' }}
              />
            ),
          },
        ]}
      />
      <BoughtDetails handler={{ open, setOpen }} />
    </>
  )
}
