import { withRouter } from 'next/router'
import Pay from '../components/Pay'

function Pagos({ router }) {
  const { query } = router

  return <Pay data={query} />

}


export default withRouter(Pagos)