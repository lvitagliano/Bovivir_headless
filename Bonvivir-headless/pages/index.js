import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useLazyState from 'react-storefront/hooks/useLazyState'
import createLazyProps from 'react-storefront/props/createLazyProps'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import theme from '../Styles/themes/main'
import { ThemeProvider } from 'styled-components'
import Carousel from '../components/Home/Carousel'
import MarqueeDisplayer from '../components/Home/MarqueeDisplayer'
import BannerSelection from '../components/Home/BannerSelection'
import VerticalStepper from '../components/Home/VerticalStepper'
import BigBanner from '../components/Home/BigBanner'
import BannerTest from '../components/Home/BannerTest'
import GoTienda from '../components/Home/GoTienda'
import ContentDisplay from '../components/Commons/ContentDisplay'
import NewsLetter from '../components/Home/NewsLetter'
import { Paper, Grid } from '@material-ui/core'
import Button from '../components/Commons/Button'
import ProductItem from '../components/product/ProductItem'
import Head from 'next/head'
import {
  getHomeCarousel,
  getHomeVerticalStepper,
  getHomeBigBanner,
  getHomeBannerSelection,
  getHomeGoTienda,
  getHomeBannerTest,
  getHomeContentDisplay,
} from '../services/Client/GraphQl/wp/GQLAPI'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

const content = {
  title: 'disfrutá nuestro contenido',
  description:
    'mirá nuestras últimas notas sobre el mundo del vino y los maridajes que proponemos para tus vinos.',
}

const items = [
  {
    title: 'club bonvivir',
    label: 'Bonvivir',
    description: 'Catas a ciegas: ¿Como son las catas a ciegas de Club BONVIVIR?',
    link: { label: 'Leer artículo', href: '/wordpress' },
    image: './images/clubBonvivir.PNG',
    banner: {
      image: './images/slider_bonvivir_1.jpg',
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
    title: 'Maridajes',
    label: 'Club',
    description: 'Vino Gauchezco Reserva Malbec: Silla de cordero a las brasas con cebolla...',
    link: { label: 'Leer artículo', href: '/wordpress' },
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
    title: 'Novedades',
    label: 'Tienda',
    description: 'Wine News: cinco lanzamientos que debes descorchar',
    link: { label: 'Leer Artículo', href: '/wordpress' },
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

const itemsSelecciones = [
  {
    image: './images/seleccionExclusiva.PNG',
    titulo: 'Selección exclusiva',
    texto:
      'Diferentes cepas y estilos de vinos cuidadosamente elegidos. Incluye fichas coleccionables con maridajes',
    button1: {
      text: 'ver selección',
      variant: 'primary',
      link: '',
    },
  },
  {
    image: './images/seleccionExclusiva.PNG',
    titulo: 'Selección exclusiva 2',
    texto:
      'Diferentes cepas y estilos de vinos cuidadosamente elegidos. Incluye fichas coleccionables con maridajes',
    button1: {
      text: 'ver selección',
      variant: 'primary',
      link: '',
    },
  },
  {
    image: './images/seleccionExclusiva.PNG',
    titulo: 'Selección exclusiva 3',
    texto:
      'Diferentes cepas y estilos de vinos cuidadosamente elegidos. Incluye fichas coleccionables con maridajes',
    button1: {
      text: 'ver selección',
      variant: 'primary',
      link: '',
    },
  },
]

const productList = [
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2018',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2018',
      type: 'image',
    },
  },
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2019',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2019',
      type: 'image',
    },
  },
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2020',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2020',
      type: 'image',
    },
  },
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2021',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2021',
      type: 'image',
    },
  },
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2022',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2022',
      type: 'image',
    },
  },
  {
    id: 'BTI000060414',
    name: 'Brazos de los Andes 2023',
    price: '3.810',
    basePriceText: '$3.810',
    thumbnail: {
      src:
        'http://qa-tienda2.bonvivir.com/pub/media/catalog/product/placeholder/default/img_faltante_tienda.png',
      alt: 'Brazos de los Andes 2023',
      type: 'image',
    },
  },
]

const bannerinfo = {
  title: 'Club bonvivir',
  title2: 'LOS BENEFICIOS DE SER PARTE',
  image: './images/combosBonvivir.jpg',
  subtitle: 'Se parte del club',
  text:
    'Recibi todos los meses una seleccion de vinos realizada por nuestros sommerliers en catas a ciegas',
  height: '50em',
  position: 'right bottom',
  textcolor: '#fff',
  listItem: [
    'Envio sin cargo a todo el pais',
    'Contenido exclusivo',
    'Etiquetas originales',
    'Descuentos en tienda Bonvivir',
  ],
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
}
const bannerSelectionInfo = {
  title: 'Club bonvivir',
  subtitle: 'Conoce nuestras selecciones',
  text: 'Etiquetas originales seleccionadas por expertos sommerliers a través de catas a ciegas',
  linea: false,
  button1: {
    text: 'Conocer el club',
    variant: 'primary',
    link: '',
  },
  textcolor: '#333',
}

const steps = [
  {
    text: '#Elegimos# las mejores etiquetas a través de catas a ciegas',
    image: 'https://headless-dev.bonvivir.com/images/mean.PNG',
    mobileImage: '',
  },
  {
    text: 'Te llegan #directo a tu casa# en cualquier lugar del país',
    image: 'https://headless-dev.bonvivir.com/images/cajabonvivir.PNG',
    mobileImage: '',
  },
  {
    text: '#Descubrís y disfrutás# tus vinos junto a los que más querés',
    image: 'https://headless-dev.bonvivir.com/images/humans.PNG',
    mobileImage: '',
  },
]

export default function Index(props) {
  const classes = useStyles()
  // const [state] = useLazyState(lazyProps)

  const selecciones = [...items, ...items].map((item, index) => (
    <Paper key={index} elevation={3}>
      <Grid container direction="column" justify="space-evenly" alignItems="center">
        <Grid item>
          <div style={{ width: '240px', height: '320px'}}>{item.title}</div>
        </Grid>
        <Grid item>
          <Button text="Test"></Button>
        </Grid>
      </Grid>
    </Paper>
  ))

  // NO BORRAR ESTE METODO
  const selecciones2 = props.bannerselection.bannerselectioninfoSelecciones.map((item, index) => (
    <Paper key={index} elevation={3}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="space-between"
        style={{ width: '320px', transform: 'translateY(-20px)',}}
      >
        <Grid spasing={0} style={{ height: '20em' }} item>
          <img src={item.cf_home_bannerselection_selecciones.imageSeleccion.sourceUrl} alt="" />
        </Grid>
        <Grid spasing={0} item>
          <h2 style={{ margin: '0', textAlign: 'center' }}>
            {item.cf_home_bannerselection_selecciones.tituloSeleccion}
          </h2>
        </Grid>
        <Grid spasing={0} item>
          <p style={{ textAlign: 'center', margin: '10px 0px', width: '100%'}}>
            {item.cf_home_bannerselection_selecciones.textoSeleccion}
          </p>
        </Grid>
        <Grid spasing={0} item>
          <Button text="Ver selección" style={{margin: '10px auto'}}></Button>
        </Grid>
      </Grid>
    </Paper>
  ))
  // NO BORRAR ESTE METODO
  const products = productList.map((prod, i) => (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '5px',
        minHeight: '26em',
        minWidth: '13em',
      }}
    >
      <ProductItem product={prod} index={i} key={i} colorSelector={false} displayButton={false} />
    </div>
  ))

  return (
    <main>
      <Head>
        <title>Bonvivir</title>
        <meta name="description" content="Homepage Bonvivir" />
      </Head>
      <ThemeProvider theme={theme}>
        <Carousel items={props.carousel} stepper="button" autoPlay={3000} />
        <VerticalStepper
          steps={props.verticalstepper.homeVerticalstepper}
          title={props.verticalstepper.title}
        />
        <BigBanner bannerinfo={props.bigbanner} />
        <BannerSelection selecciones={selecciones2} bannerinfo={props.bannerselection} />
        <GoTienda items={props.gotienda} selecciones={products} />
        <MarqueeDisplayer items={products} arrows={true}></MarqueeDisplayer>
        <ContentDisplay data={props.contentdisplay} max={3} />
        <BannerTest data={props.bannertest} />
        <NewsLetter />
      </ThemeProvider>
    </main>
  )
}

// Index.getInitialProps = createLazyProps(options => {
//   const { res } = options
//   if (res) res.setHeader('Cache-Control', 'max-age=99999')
//   return fetchFromAPI(options)
// })

Index.getInitialProps = async context => {
  return {
    carousel: await getHomeCarousel(),
    verticalstepper: await getHomeVerticalStepper(),
    bigbanner: await getHomeBigBanner(),
    bannerselection: await getHomeBannerSelection(),
    gotienda: await getHomeGoTienda(),
    contentdisplay: await getHomeContentDisplay(),
    bannertest: await getHomeBannerTest(),
  }
}
