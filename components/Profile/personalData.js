import DefaultAddress from './defaultAddress'
import { useDispatch, useSelector } from 'react-redux'

export default function PersonalData({ data, title }) {
  const { addresses } = useSelector(state => state.m2.customerData)
  const [rows, setRows] = React.useState(addresses)
  const [defaultShipping, setDefaultShipping] = React.useState(rows.find(i => i.default_shipping))
  const [defaultBilling, setDefaultBilling] = React.useState(rows.find(i => i.default_billing))

  return (
    <>
      <h3 style={{ color: '#47484A' }}>{title}</h3>
      <h4>Información de la cuenta</h4>
      <hr />

      <label>
        {data.firstname} {data.lastname}
      </label>
      <label>{data.email}</label>

      <DefaultAddress defaultShipping={defaultShipping} defaultBilling={defaultBilling} />
    </>
  )
}
