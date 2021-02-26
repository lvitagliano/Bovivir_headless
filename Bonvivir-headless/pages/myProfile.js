import Profile from '../components/Profile/index'
import { useRouter } from 'next/router'
import { setCustomerOrder } from '../store/actions/m2Action'

export default function MyProfile(props) {
  const router = useRouter()
  return <Profile data={props} />
}

MyProfile.getInitialProps = async context => {
  // PRUEBA PARA CAPTURAR ERROR GRAPHQL
  await setCustomerOrder()
  return {}
}
