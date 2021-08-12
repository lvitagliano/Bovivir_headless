import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../Styles/themes/main'
import { ThemeProvider } from 'styled-components'
import Carousel from '../components/Home/Carousel'
import BannerSelection from '../components/Home/BannerSelection'
import VerticalStepper from '../components/Home/VerticalStepper'
import BigBanner from '../components/Home/BigBanner'
import GoTienda from '../components/Home/GoTienda'
import NewsLetter from '../components/Home/NewsLetter'
import { Paper, Grid } from '@material-ui/core'
import Button from '../components/Commons/Button'
import Head from 'next/head'
import BodegasDelMes from '../components/Home/BodegasDelMes/index'
import {
  getHomeCarousel,
  getHomeVerticalStepper,
  getHomeBigBanner,
  getHomeBannerSelection,
  getHomeGoTienda,
  getHomeBannerTest,
  getHomeContentDisplay,
} from '../services/Client/GraphQl/wp/GQLAPI'
import DisfrutaNuestroContenido from '../components/Home/DisfrutaNuestroContenido'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

export default function Index(props) {
  const classes = useStyles()

  // NO BORRAR ESTE METODO
  const selecciones2 = props.bannerselection.bannerselectioninfoSelecciones.map((item, index) => (
    <Paper key={index} elevation={3}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        style={{ width: 'min-content', transform: 'translateY(-20px)' }}
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
          <p style={{ textAlign: 'center', margin: '10px 0px', width: '100%' }}>
            {item.cf_home_bannerselection_selecciones.textoSeleccion}
          </p>
        </Grid>
        <Grid spasing={0} item>
          <a href="/selecciones" style={{ textDecoration: 'none' }}>
            <Button text="Ver selección" style={{ margin: '10px auto' }}></Button>
          </a>
        </Grid>
      </Grid>
    </Paper>
  ))

  return (
    <main>
      <Head>
        <title>BONVIVIR</title>
        <meta name="description" content="Homepage Bonvivir" />
      </Head>
      <ThemeProvider theme={theme}>
        <Carousel items={props.carousel} stepper="button" />
        <VerticalStepper
          steps={props.verticalstepper.homeVerticalstepper}
          title={props.verticalstepper.title}
        />
        <BigBanner bannerinfo={props.bigbanner} />
        <BodegasDelMes />
        <BannerSelection selecciones={selecciones2} bannerinfo={props.bannerselection} />
        <GoTienda items={props.gotienda} />

        <DisfrutaNuestroContenido contentDisplay={props.contentdisplay} />
        <NewsLetter />
      </ThemeProvider>
    </main>
  )
}

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
