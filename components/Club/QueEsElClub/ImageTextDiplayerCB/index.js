import { Container, ContainerDisplayer } from '../../../Home/BannerSelection/styles'
import Displayer from '../../../Commons/Displayer'

export default function ImageTextDiplayerCB({ data, ...props }) {
  return (
    <Container image={`/${data.bimage}`} fdirection="row-reverse">
      <ContainerDisplayer>
        <Displayer arrows={true} amount={1} oneArrow>
          {data.data}
        </Displayer>
      </ContainerDisplayer>
    </Container>
  )
}
