import { BannerContainer, Container1, Container2 } from './style'
import { Title2, Text2, Text4, SubTitle5 } from '../../../Home/utils/commonStyles'

export default function PorQueAsociarmeCB({ data, ...props }) {
  return (
    <BannerContainer>
      <Title2 text={data.title} color="#333" />
      {data.subtitle ? <Text2 alignment="center">{data.subtitle}</Text2> : null}

      <Container1>
        {data.items.map((item, i) => (
          <Container2 key={i}>
            <img src={`/${item.img}`} alt=" " style={{width: '10em'}}/>
            <SubTitle5 color='#762057'>{item.subtitle}</SubTitle5>
            <Text4 color='#888'>{item.text}</Text4>
          </Container2>
        ))}
      </Container1>
    </BannerContainer>
  )
}
