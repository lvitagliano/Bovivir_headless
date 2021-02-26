import { BannerContainer, Container1, Container2 } from './style'
import { Title2, Text2, Text4, SubTitle3 } from '../../../Home/utils/commonStyles'

export default function PorQueAsociarmeCB({ data, ...props }) {
  return (
    <BannerContainer>
      <Title2 text={data.title} color="#333" />
      {data.subtitle ? <Text2 alignment="center">{data.subtitle}</Text2> : null}

      <Container1>
        {data.items.map((item, i) => (
          <Container2>
            <img src={`/${item.img}`} alt=" " />
            <SubTitle3>{item.subtitle}</SubTitle3>
            <Text4>{item.text}</Text4>
          </Container2>
        ))}
      </Container1>
    </BannerContainer>
  )
}
