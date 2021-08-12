import Subcategory from './tienda/[subcategoryId]'
import { useRouter } from 'next/router'

export default function search() {
  const router = useRouter()
  const formatRouter = router.asPath.split('=')[1]
  const formatSearchFilter = formatRouter.split('%20').join(' ')
  return <Subcategory search={formatSearchFilter} />
}
