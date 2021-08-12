import { ContaineGoTienda, ContainerDisplayer, DivImage, DivText } from './styles'
import Displayer from '../../Commons/Displayer'
import { SubTitle, Title2, Text2 } from '../utils/commonStyles'
import Button from '../../Commons/Button'
import ProductItem from '../../product/ProductItem'
import { getProductsForIndexGOTIENDAClient } from '../../../services/Client/GraphQl/m2GQL'
import { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'

export default function GoTienda({ items }) {
  const [products, setproducts] = useState(null)

  useEffect(() => {
    getProductsForIndexGOTIENDAClient().then(resp =>
      setproducts(resp?.items.map((prod, i) => <ProductItem key={i} product={prod} index={i} />))
    )
  }, [])

  return (
    <Container maxWidth="lg" disableGutters="true">
      <ContaineGoTienda flexDirection={'row'}>
        <DivImage image={items.imagee.sourceUrl} />
        <DivText>
          <SubTitle>{items.titlee}</SubTitle>
          <Title2 text={items.subtitle} color="#333" />
          <Text2 style={{ fontWeight: '500' }}>{items.descriptionn}</Text2>
          <a href="/tienda/vinos" style={{ textDecoration: 'none' }}>
            <Button text={items.buttonn.textt} />
          </a>
        </DivText>
      </ContaineGoTienda>
      <ContainerDisplayer flexDirection={'column'}>
        {products && (
          <Displayer arrows={true} amount={4} spaceBetweenArrows={'36px'}>
            {products}
          </Displayer>
        )}
      </ContainerDisplayer>
    </Container>
  )
}
