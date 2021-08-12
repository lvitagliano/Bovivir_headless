import { useEffect, useState } from 'react'
import Banner from '../../components/Commons/Banner'
import PorQueAsociarmeCB from '../../components/Banners/PorQueAsociarmeCB'
import DiferencialDelCB from '../../components/Club/QueEsElClub/DiferencialDelCB'
import ImageTextDiplayerCB from '../../components/Club/QueEsElClub/ImageTextDiplayerCB'
import ComoFuncionaCB from '../../components/Club/QueEsElClub/ComoFuncionaCB'
import FormaParteDelCB from '../../components/Club/QueEsElClub/FormaParteDelCB'
import LoQueRecibis from '../../components/Club/QueEsElClub/LoQueRecibis'
import ContentDisplay from '../../components/Commons/ContentDisplay'
import { ThemeProvider } from 'styled-components'
import theme from '../../Styles/themes/main'
import { SubTitle } from '../../components/Home/utils/commonStyles'
import { getAllPerksClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../store/actions/eventsActions'
import { getAllPerks } from '../../store/actions/perksActions'
import NewsLetter from '../../components/Home/NewsLetter'
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import { Typography } from 'styled-icons/octicons'

export default function Queeselclub() {
  const dispatch = useDispatch()
  const { events, loading: eventsLoading } = useSelector(state => state.events.allEvents)
  const { perks, loading: perksLoading } = useSelector(state => state.perks.allPerks)

  useEffect(() => {
    perks.length === 0 && dispatch(getAllPerks())
    events.length === 0 && dispatch(getAllEvents())
  }, [])

  const baner1 = {
    height: '80vh',
    title: 'club bonvivir',
    label: 'Bonvivir',
    description: 'Catas a ciegas: ¿Como son las catas a ciegas de Club BONVIVIR?',
    link: { label: 'Ver beneficio', href: '/wordpress' },
    position: 'right',
    image: './images/imagen_principal.jpg',
    title: '',
    title2: 'holaa subtittle',
    subtitle: 'Formá parte de nuestro club',
    textcolor: '#fff',
    text2: 'a partir de $2.364',
    text:
      'Recibí todos los meses una selección de vinos realizada por nuestros sommeliers a través de catas a ciegas',
    button1: {
      text: 'unite al club',
      variant: 'primary',
      link: '',
    },
    linea: false,
    // button2: {
    //   text: 'explora la tienda',
    //   variant: 'secundary',
    //   link: ''
    // }
  }

  const baner2 = {
    height: '100vh',
    title: 'club bonvivir',
    label: 'Bonvivir',
    description: 'Catas a ciegas: ¿Como son las catas a ciegas de Club BONVIVIR?',
    link: { label: 'Ver beneficio', href: '/wordpress' },
    position: '',
    image: './images/loquerecibis.jpg',
    title: '',
    title2: 'holaa subtittle',
    subtitle: 'Lo que recibís',
    textcolor: '#fff',
    text: 'Sorprendete todos los meses con lo que elegimos y preparamos para vos:',
    button1: {
      text: 'asociate hoy',
      variant: 'primary',
      link: '',
    },
    linea: false,
    // button2: {
    //   text: 'explora la tienda',
    //   variant: 'secundary',
    //   link: ''
    // }
    listItem: [
      'Seleccion de vinos del mes',
      'Ficha técnica, nota de cata y maridaje para cada vino',
      'Packaging sustentable (100% reciclable)',
    ],
  }

  const content = {
    title: 'lo mejor de nuestra comunidad',
    description:
      'Club BONVIVIR invita a sus socios a ser parte de un mundo único de Experiencias relacionadas con el mundo del vino:',
  }

  // const items = [
  //   {
  //     title: 'Sietes razones para formar parte de un club de vinos',
  //     label: 'Bonvivir',
  //     description: '',
  //     link: { label: 'Ver mas', href: '/wordpress' },
  //     image: './images/razonesParaSerParteDelCB.PNG',
  //     banner: {
  //       image:
  //         'https://images.pexels.com/photos/1618993/pexels-photo-1618993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //       title: '',
  //       title2: ' ',
  //       subtitle: 'Descubri la experiencia Bonvivir',
  //       textcolor: '#fff',
  //       text: 'Recibi',
  //       button1: {
  //         text: 'unite al club',
  //         variant: 'primary',
  //         link: '',
  //       },
  //       linea: false,
  //       button2: {
  //         text: 'explora la tienda',
  //         variant: 'secundary',
  //         link: '',
  //       },
  //     },
  //   },
  //   {
  //     title: '35% de descuento por 4 meses para socio Club MOVISTAR',
  //     label: 'Club',
  //     description: '',
  //     link: { label: 'Ver mas', href: '/wordpress' },
  //     image: './images/clubMovistar.PNG',
  //     textcolor: '#fff',
  //     banner: {
  //       image: 'https://source.unsplash.com/featured/?wine',
  //       title2: 'LOS BENEFICIOS DE SER PARTE',
  //       subtitle: 'Se parte del club',
  //       text:
  //         'Recibi todos los meses una seleccion de vinos realizada por nuestros sommerliers en catas a ciegas',
  //       listItem: ['Envio sin cargo a todo el pais'],
  //       button1: {
  //         text: 'XXX',
  //         variant: 'secundary',
  //         link: '',
  //       },
  //       button2: {
  //         text: 'Unite ahora',
  //         variant: 'secundary',
  //         link: '',
  //       },
  //     },
  //   },
  //   {
  //     title: 'Expo Vinos de la patagonia 2020: para disfrutar en casa',
  //     label: 'Tienda',
  //     description: '',
  //     link: { label: 'Ver mas', href: '/wordpress' },
  //     image: './images/expoVinos.PNG',
  //     textcolor: '#fff',
  //     banner: {
  //       image: 'https://source.unsplash.com/featured/?whitewine',
  //       title2: 'LOS BENEFICIOS DE SER PARTE',
  //       subtitle: 'Se parte del club',
  //       text:
  //         'Recibi todos los meses una seleccion de vinos realizada por nuestros sommerliers en catas a ciegas',
  //       listItem: ['Contenido exclusivo'],
  //       button1: {
  //         text: 'Conoce el club',
  //         variant: 'primary',
  //         link: '',
  //       },
  //       button2: {
  //         text: 'Unite ahora',
  //         variant: 'secundary',
  //         link: '',
  //       },
  //     },
  //   },
  // ]

  const porQueAsociarmeaClubBonvivir = {
    height: '70.3em',
    background: '#EDEAE1',
    title: '¿por qué asociarme a club bonvivir?',
    subtitle: '',
    items: [
      {
        img: './images/porqueasociarmeVino.PNG',
        subtitle: 'Etiquetas Originales',
        text:
          'Vinos seleccionados por expertos sommeliers. Incluye fichas coleccionables con maridajes.',
      },
      {
        img: './images/porqueasociarmeTargetas.PNG',
        subtitle: 'Contenido Exclusivo',
        text: 'Ideal para aprender a disfrutar mejor la experiencia del vino.',
      },
      {
        img: './images/porqueasociarmeCopa.PNG',
        subtitle: 'Degustaciones y eventos',
        text:
          'Acceso a experiencias relacionadas al mundo del vino, pueden ser presenciales o virtuales.',
      },
      {
        img: './images/porqueasociarmeCucardas.PNG',
        subtitle: 'Envio sin cargo a todo el pais',
        text: 'Llega a tu casa cada mes una seleccion de vinos para sorprenderte.',
      },
      {
        img: './images/porqueasociarmeCaja.PNG',
        subtitle: 'Descuentos Exclusivos',
        text:
          'Ofertas permanentes en nuestra tienda online para socios en vinos, cavas, accesorios y mas.',
      },
    ],
  }
  const comoFuncionaBonvivir = {
    height: '60vh',
    background: '#fff',
    title: '¿Cómo funciona?',
    subtitle:
      'Encontrá vinos, whiskies, aceites y mucho más en pocos clics. Tenemos envíos a todo el país, cuotas sin interés, descuentos y promos exclusivas',
  }
  const diferencialDelClub = {
    height: '70vh',
    background: '#F7F7F7',
    title: 'El diferencial del club',
    subtitle: '',
  }

  const imageTextDiplayerCBObject = [
    {
      text1:
        'Lo que más valoro son las etiquetas que me presenta el club en cada momento del año y la variedad que voy conociendo según me llegan las cajas.',
      text2: 'Tomas, socio de BONVIVIR',
      text3: 'caba',
    },
    {
      text1: 'lorem ipsum',
      text2: 'lorem ipsum',
      text3: 'lorem ipsum',
    },
    {
      text1: 'lorem ipsum',
      text2: 'lorem ipsum',
      text3: 'lorem ipsum',
    },
  ]

  const Comillas = () => (
    <FormatQuoteIcon style={{ color: '#752157', fontSize: '5rem', transform: 'rotate(180deg)' }} />
  )

  const imageTextDiplayerCB = {
    bimage: './images/testimonios.jpg',
    data: imageTextDiplayerCBObject.map((item, i) => (
      <div style={{ width: '30em' }} key={i}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Comillas />
          <p style={{ fontSize: '1.4em', textAlign: 'center', color: '#333' }}>{item.text1}</p>
          <Comillas />
        </div>
        <SubTitle color="#752057" style={{ textAlign: 'center', marginTop: '20px' }}>
          {item.text2}
        </SubTitle>
      </div>
    )),
  }

  const buildItemsContentDisplay = () => {
    const lastEvent = events[events.length - 1]
    const beforeLastEvent = events[events.length - 2]
    const lastPerk = perks[perks.length - 1]
    return [
      {
        title: lastEvent?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${lastEvent?.uri}` },
        image: { sourceUrl: lastEvent?.featuredImage.node.guid },
      },
      {
        title: lastPerk?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${lastPerk?.uri}` },
        image: { sourceUrl: lastPerk?.featuredImage.node.guid },
      },
      {
        title: beforeLastEvent?.title,
        label: 'Bonvivir',
        description: '',
        link: { label: 'Ver mas', href: `${beforeLastEvent?.uri}` },
        image: { sourceUrl: beforeLastEvent?.featuredImage.node.guid },
      },
    ]
  }

  return (
    <ThemeProvider theme={theme}>
      <FormaParteDelCB bannerinfo={baner1} />
      <ComoFuncionaCB data={comoFuncionaBonvivir} />
      <LoQueRecibis bannerinfo={baner2} />
      <PorQueAsociarmeCB small />
      <DiferencialDelCB data={diferencialDelClub} />
      <ImageTextDiplayerCB data={imageTextDiplayerCB} />
      <ContentDisplay
        queesclub
        loading={perksLoading || eventsLoading}
        title={content.title}
        description={content.description}
        articles={buildItemsContentDisplay()}
        max={3}
        bcolor="#EDEAE1"
      />
      <NewsLetter />
    </ThemeProvider>
  )
}
