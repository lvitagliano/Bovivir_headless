import { GraphQLClient, request } from 'graphql-request'
import {
  GET_SELECTIONS,
  GET_DATA_HOME_CAROUSEL,
  GET_DATA_HOME_VERTICALSTEPPER,
  GET_DATA_HOME_BIGBANNER,
  GET_DATA_HOME_BANNERSELECTION,
  GET_DATA_HOME_GOTIENDA,
  GET_DATA_HOME_BANNERTEST,
  GET_DATA_HOME_CONTENTDISPLAY,
} from './query'

const uriWP = `${process.env.WP_CONFIG_HOST || 'https://qa.bonvivir.com'}/graphql`
const wpHttpGQL = new GraphQLClient(uriWP)

// SELECTIONS
export const getSelections = async () => {
  const { postBy } = await wpHttpGQL.request(GET_SELECTIONS)
  return postBy.cf_selecciones
}

// HOME
// CAROUSEL
export const getHomeCarousel = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_CAROUSEL)
  return postBy.cf_home_carrousel.carrousel
}
// VERTICALSTEPPER
export const getHomeVerticalStepper = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_VERTICALSTEPPER)
  return postBy.cf_home_verticalStepper
}
// BIGBANNER
export const getHomeBigBanner = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_BIGBANNER)
  return postBy.cf_home_bigBanner
}
// BANNERSELECTION
export const getHomeBannerSelection = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_BANNERSELECTION)
  return postBy.cf_home_bannerselection
}
// GOTIENDA
export const getHomeGoTienda = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_GOTIENDA)
  return postBy.cf_home_goTienda
}
// BANNERTEST
export const getHomeBannerTest = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_BANNERTEST)
  return postBy.cf_home_bannerTest
}
// GET_DATA_HOME_CONTENTDISPLAY
export const getHomeContentDisplay = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_HOME_CONTENTDISPLAY)
  return postBy.cf_home_contentDisplay
}
