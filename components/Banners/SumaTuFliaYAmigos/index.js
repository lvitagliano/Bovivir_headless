import Button from '../../Commons/Button'
import { BannerContainer, TextContainer, Title, Subtitle, Divider } from './style'

export default function SumaTuFliaYAmigos(props) {
  return (
    <BannerContainer>
      <img src="/images/SumaTuFamiliaYAmigos.png" alt="" />
      <TextContainer>
        <Title>
          {' '}
          Sumá tu familia y amigos <br /> a BONVIVIR
        </Title>
        <Divider />
        <Subtitle>
          Si recomendás Club BONVIVIR a un amigo
          <br /> y este se suscribe, <br />{' '}
          <Subtitle bold> ¡tu próxima selección es GRATIS!</Subtitle>
        </Subtitle>
        <a href="#" style={{ textDecoration: 'none', color: 'white' }}>
          <Button
            style={{ color: 'white', borderColor: 'white' }}
            text="ENTERATE COMO HACÉRLO"
            variant="primary"
          />
        </a>
      </TextContainer>
    </BannerContainer>
  )
}
