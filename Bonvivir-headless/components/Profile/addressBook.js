import Button from '../Commons/Button'
import DefaultAddress from './defaultAddress'
import TableAllAddress from './tableAllAddress'
import { useDispatch, useSelector } from 'react-redux'

export default function AddressBook({ title, setDetail }) {
  const { addresses } = useSelector(state => state.m2.customerData)
  const [rows, setRows] = React.useState(addresses)
  const [defaultShipping, setDefaultShipping] = React.useState(rows.find(i => i.default_shipping))
  const [defaultBilling, setDefaultBilling] = React.useState(rows.find(i => i.default_billing))

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ color: '#47484A' }}>{title}</h3>
        <Button text="Agregar Direccion" onClick={() => setDetail(4)} />
      </div>
      <div>
        <DefaultAddress defaultShipping={defaultShipping} defaultBilling={defaultBilling} />
        <br />
        <TableAllAddress rows={rows} />
      </div>
    </>
  )
}
