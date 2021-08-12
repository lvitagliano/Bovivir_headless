import ProductItem from './ProductItem'
import { Typography } from '@material-ui/core'
import Displayer from '../Commons/Displayer'
import { useSelector } from 'react-redux'

export default function CrosssellProducts({ crosssell_products }) {
  const { customerWishList } = useSelector(state => state.m2)
  const handleFavourite = id =>
    customerWishList?.items?.find(i => i.product.id === id) ? true : false

  return (
    <>
      <Typography variant="h6" component="h3">
        También te puede interesar
      </Typography>
      <Displayer arrows={true} amount={4}>
        {crosssell_products?.map((prod, i) => (
          <ProductItem key={i} product={prod} index={i} favouriteF={handleFavourite(prod.id)} />
        ))}
      </Displayer>
    </>
  )
}
