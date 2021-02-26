import { Container, ContainerDisplayer, DivImage, DivText } from './styles'
import Displayer from '../../Commons/Displayer'
import { SubTitle, Title2, Text2 } from '../utils/commonStyles'
import Button from '../../Commons/Button'

export default function GoTienda({ items, selecciones }) {
  return (
    <>
      <Container flexDirection={'row'}>
        <DivImage image={items.imagee.sourceUrl} />
        <DivText>
          <SubTitle>{items.titlee}</SubTitle>
          <Title2 text={items.subtitle} color="#333" />
          <Text2>{items.descriptionn}</Text2>
          <Button text={items.buttonn.textt} />
        </DivText>
      </Container>
      <ContainerDisplayer flexDirection={'column'}>
        <Displayer arrows={true} amount={4}>
          {selecciones}
        </Displayer>
      </ContainerDisplayer>
    </>
  )
}
