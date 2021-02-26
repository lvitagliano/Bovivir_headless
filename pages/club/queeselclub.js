import Banner from '../../components/Commons/Banner'
import PorQueAsociarmeCB from '../../components/Club/QueEsElClub/PorQueAsociarmeCB'
import DiferencialDelCB from '../../components/Club/QueEsElClub/DiferencialDelCB'
import ImageTextDiplayerCB from '../../components/Club/QueEsElClub/ImageTextDiplayerCB'
import ComoFuncionaCB from '../../components/Club/QueEsElClub/ComoFuncionaCB'
import ContentDisplay from '../../components/Commons/ContentDisplay'
import { ThemeProvider } from 'styled-components'
import theme from '../../Styles/themes/main'

export default function Queeselclub() {
  const baner1 = {
    height: '70vh',
    title: 'club bonvivir',
    label: 'Bonvivir',
    description: 'Catas a ciegas: ¿Como son las catas a ciegas de Club BONVIVIR?',
    link: { label: 'Ver beneficio', href: '/wordpress' },
    position: 'right',
    image: './images/imagen_principal.jpg',
    title: 'holaaa titlee',
    title2: 'holaa subtittle',
    subtitle: 'Descubri la experiencia Bonvivir',
    textcolor: '#fff',
    text:
      'Toda experiencia nos marca un camino, Te invitamos a transitar la ruta del vino y vivir nuestras exquisitas selecciones.',
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
    height: '95vh',
    title: 'club bonvivir',
    label: 'Bonvivir',
    description: 'Catas a ciegas: ¿Como son las catas a ciegas de Club BONVIVIR?',
    link: { label: 'Ver beneficio', href: '/wordpress' },
    position: '',
    image: './images/loquerecibis.jpg',
    title: 'holaaa titlee',
    title2: 'holaa subtittle',
    subtitle: 'Descubri la experiencia Bonvivir',
    textcolor: '#fff',
    text:
      'Toda experiencia nos marca un camino, Te invitamos a transitar la ruta del vino y vivir nuestras exquisitas selecciones.',
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
    listItem: [
      'Seleccion de botella del mes',
      'Ficha técnica y tastin note de cada vino',
      'Nuestra caja',
    ],
  }

  const content = {
    title: 'beneficios para socios',
    description:
      'Club bonVivir invita a sus socios a ssr parte de u mundo único de experiencias relacionadas con el mundo del vino:',
  }

  const items = [
    {
      title: 'Contenido exclusivo',
      label: 'Bonvivir',
      description: 'Curso de vinos 1',
      link: { label: 'Ver beneficio', href: '/wordpress' },
      image: './images/clubBonvivir.PNG',
      banner: {
        image:
          'https://images.pexels.com/photos/1618993/pexels-photo-1618993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        title: '',
        title2: ' ',
        subtitle: 'Descubri la experiencia Bonvivir',
        textcolor: '#fff',
        text:
          'Toda experiencia nos marca un camino, Te invitamos a transitar la ruta del vino y vivir nuestras exquisitas selecciones.',
        button1: {
          text: 'unite al club',
          variant: 'primary',
          link: '',
        },
        linea: false,
        button2: {
          text: 'explora la tienda',
          variant: 'secundary',
          link: '',
        },
      },
    },
    {
      title: 'Beneficio',
      label: 'Club',
      description: 'Envio Sin Cargo a Todo el País',
      link: { label: 'Ver beneficio', href: '/wordpress' },
      image: './images/maridaje.PNG',
      textcolor: '#fff',
      banner: {
        image: 'https://source.unsplash.com/featured/?wine',
        title2: 'LOS BENEFICIOS DE SER PARTE',
        subtitle: 'Se parte del club',
        text:
          'Recibi todos los meses una seleccion de vinos realizada por nuestros sommerliers en catas a ciegas',
        listItem: ['Envio sin cargo a todo el pais'],
        button1: {
          text: 'XXX',
          variant: 'secundary',
          link: '',
        },
        button2: {
          text: 'Unite ahora',
          variant: 'secundary',
          link: '',
        },
      },
    },
    {
      title: 'Contenido exclusivo',
      label: 'Tienda',
      description: 'Curso de vinos y grastronómicos',
      link: { label: 'Ver beneficio', href: '/wordpress' },
      image: './images/novedades.PNG',
      textcolor: '#fff',
      banner: {
        image: 'https://source.unsplash.com/featured/?whitewine',
        title2: 'LOS BENEFICIOS DE SER PARTE',
        subtitle: 'Se parte del club',
        text:
          'Recibi todos los meses una seleccion de vinos realizada por nuestros sommerliers en catas a ciegas',
        listItem: ['Contenido exclusivo'],
        button1: {
          text: 'Conoce el club',
          variant: 'primary',
          link: '',
        },
        button2: {
          text: 'Unite ahora',
          variant: 'secundary',
          link: '',
        },
      },
    },
  ]

  const porQueAsociarmeaClubBonvivir = {
    height: '70.3em',
    background: '#EDEAE1',
    title: '¿por qué asociarme a club bonvivir?',
    subtitle: '',
    items: [
      {
        img: './images/etiquetasOriginales.PNG',
        subtitle: 'Etiquetas Originales',
        text:
          'Etiquetas originales seleccionadas seleccionadas por expertos sommeliers. Cada entrega incluye fichas coleccionables con maridajes.',
      },
      {
        img: './images/etiquetasOriginales.PNG',
        subtitle: 'Contenido Exclusivo',
        text: 'Contenido exclusivo ideal para aprender a disfrutar mejor la experiencia del vino.',
      },
      {
        img: './images/etiquetasOriginales.PNG',
        subtitle: 'Degustaciones y eventos',
        text: 'Invitacion a degustaciones y descuentos en eventos del mundo del vino.',
      },
      {
        img: './images/etiquetasOriginales.PNG',
        subtitle: 'Envio sin cargo a todo el pais',
        text:
          'Envio mensual de una seleccion de vinos con gasto de envio bonificado a todo el pais.',
      },
      {
        img: './images/etiquetasOriginales.PNG',
        subtitle: 'Descuentos Exclusivos',
        text:
          'descuentos permanentes y exclusivos para socios en Tienda BONVIVIR en vinos, canvas y accesorios.',
      },
    ],
  }
  const comoFuncionaBonvivir = {
    height: '70vh',
    background: '#F7F7F7',
    title: '¿Cómo funciona club bonvivir?',
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
      text1: 'asdadqwdqwdqdqdw',
      text2: 'Harry',
      text3: 'caba',
    },
    {
      text1: '11111111111111115tgwbazrbe',
      text2: 'Minabel',
      text3: 'caba',
    },
    {
      text1: 'bebrbewgt3562465363656546  ',
      text2: 'Martin',
      text3: 'caba',
    },
  ]
  const imageTextDiplayerCB = {
    bimage: './images/testimonios.jpg',
    data: imageTextDiplayerCBObject.map((item, i) => (
      <div>
        <div>{item.text1}</div>
        <div>{item.text2}</div>
        <div>{item.text3}</div>
      </div>
    )),
  }

  return (
    <ThemeProvider theme={theme}>
      <Banner bannerinfo={baner1} />
      <PorQueAsociarmeCB data={porQueAsociarmeaClubBonvivir} />
      <Banner bannerinfo={baner2} />
      <DiferencialDelCB data={diferencialDelClub} />
      <ImageTextDiplayerCB data={imageTextDiplayerCB} />
      <ContentDisplay
        title={content.title}
        description={content.description}
        articles={items}
        max={3}
        bcolor="#EDEAE1"
      />
      <ComoFuncionaCB data={comoFuncionaBonvivir} />
    </ThemeProvider>
  )
}
