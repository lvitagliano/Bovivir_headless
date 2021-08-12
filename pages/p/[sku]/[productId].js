import ProductComponent from '../../../components/product/Product'
import withRouter from 'next/dist/client/with-router'

function Product(props) {
  const { query } = props.router
  return (
      <ProductComponent sku={query.sku} />
  )
}

export default withRouter(Product)
