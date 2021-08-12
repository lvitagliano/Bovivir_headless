import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPerks } from '../../store/actions/perksActions'
import PorQueAsociarmeCB from '../Banners/PorQueAsociarmeCB'
import SumaTuFliaYAmigos from '../Banners/SumaTuFliaYAmigos'
import ContentDisplay from '../Commons/ContentDisplay'
import SeleccionesComponent from './Selecciones'
import { MemberPerksContainer, MembersPerksTitle, MemberPerksSubtitle } from './styles'
import device from '../../Styles/device'

const Perks = props => {
  const { selections } = props

  const dispatch = useDispatch()
  const { perks, loading: perksLoading } = useSelector(state => state.perks.allPerks)

  useEffect(() => {
    perks.length === 0 && dispatch(getAllPerks())
  }, [])

  const buildArticles = () => {
    return perks.map((perk, i) => ({
      title: perk.title,
      label: 'Bonvivir',
      description: '',
      link: { label: 'Ver mas', href: `${perk.uri}` },
      image: { sourceUrl: perk.featuredImage.node.guid },
    }))
  }

  const BannerMemberPerks = () => (
    <MemberPerksContainer>
      <MembersPerksTitle>BENEFICIOS PARA SOCIOS</MembersPerksTitle>
      <MemberPerksSubtitle>
        Club BONVIVIR te invita a ser parte de las experiencias únicas del mundo del vino.
        <br />
        Date el gusto de descubrir lo que cada cepa tiene para sorprenderte
      </MemberPerksSubtitle>
    </MemberPerksContainer>
  )

  return (
    <>
      <BannerMemberPerks />
      <PorQueAsociarmeCB hiddenTitle />
      <SumaTuFliaYAmigos />
      <ContentDisplay
        queesclub
        loading={perksLoading}
        title="LO MEJOR DE NUESTRA COMUNIDAD"
        description="Club BonVivir invita a sus socios a ser parte de un mundo único de experiencias relacionadas con el mundo del vino:"
        articles={buildArticles()}
        max={3}
        bcolor="#EDEAE1"
        hiddenFooterButtons
      />
    </>
  )
}

export default Perks
