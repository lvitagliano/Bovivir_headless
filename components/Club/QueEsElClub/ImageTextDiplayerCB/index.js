import { Container, ContainerDisplayer } from './style'
import Displayer from '../../../Commons/Displayer'
import { Title2 } from '../../../Home/utils/commonStyles'
export default function ImageTextDiplayerCB({ data, ...props }) {
  return (
    <Container image={`/${data.bimage}`} fdirection="row">
      <Title2
        text="Lo que se dice del club"
        color="#000"
        style={{ margin: '90px 0 0 50px', width: '10em', fontSize: '3em' }}
      />
      <ContainerDisplayer>
        <Displayer arrows={true} amount={1} oneArrow>
          {data.data}
        </Displayer>
      </ContainerDisplayer>
    </Container>
  )
}
