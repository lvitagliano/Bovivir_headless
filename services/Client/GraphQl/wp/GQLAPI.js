import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import {
  GET_SELECTIONS,
  GET_DATA_HOME_CAROUSEL,
  GET_DATA_HOME_VERTICALSTEPPER,
  GET_DATA_HOME_BIGBANNER,
  GET_DATA_HOME_BANNERSELECTION,
  GET_DATA_HOME_GOTIENDA,
  GET_DATA_HOME_BANNERTEST,
  GET_DATA_HOME_CONTENTDISPLAY,
  GET_DATA_FOOTER,
  GET_ALL_CELLARS,
  GET_ALL_EVENTS,
  GET_ALL_PERKS,
  GET_ALL_PAIRINGS,
  FOOTER_SOCIAL_MEDIA,
  GET_ALL_SELECTIONS,
  GET_TERMS_AND_CONDITIONS,
  GET_CONTACT,
  GET_EVENT_BY_ID,
  GET_ALL_POSTS,
  GET_CATEGORIES_BY_NAME,
  GET_PAIRINGS,
  GET_DATA_FAQS,
} from './query'

const uriWP = `${process.env.WP_CONFIG_HOST || 'https://qa.bonvivir.com'}/graphql`
const wpHttpGQL = new GraphQLClient(uriWP)

// PAGE MARIDAJES - FILTERS
export const getCategoriesByName = variables => wpHttpGQL.request(GET_CATEGORIES_BY_NAME, variables)

// PAGE MARIDAJES
export const getPairings = variables => wpHttpGQL.request(GET_PAIRINGS, variables)

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

// GET_DATA_FOOTER
export const getDataFooter = async () => {
  const { postBy } = await wpHttpGQL.request(GET_DATA_FOOTER)
  return postBy.cf_footer
}
//GET_DATA_FREQUENT_QUESTIONS
export const getFrequentQuestions = async () => {
  const { pageBy } = await wpHttpGQL.request(GET_DATA_FAQS)
  return pageBy
}

export const getAllCellers = () => {
  let body = {
    query: GET_ALL_CELLARS,
  }

  return axios.post(uriWP, body)
}

export const getAllEventsClient = () => {
  let body = {
    query: GET_ALL_EVENTS,
  }

  return axios.post(uriWP, body)
}

export const getEventByIdClient = ID => {
  let body = {
    query: GET_EVENT_BY_ID,
    variables: { idEvent: ID },
  }
  return axios.post(uriWP, body)
}

export const getAllPerksClient = () => {
  let body = {
    query: GET_ALL_PERKS,
  }

  return axios.post(uriWP, body)
}

export const getAllPairingsClient = () => {
  let body = {
    query: GET_ALL_PAIRINGS,
  }

  return axios.post(uriWP, body)
}

export const getSocialMedia = () => {
  let body = {
    query: FOOTER_SOCIAL_MEDIA,
  }

  return axios.post(uriWP, body)
}

export const getAllSelectionsClient = () => {
  let body = {
    query: GET_ALL_SELECTIONS,
  }

  return axios.post(uriWP, body)
}

export const getAllPostsClient = () => {
  let body = {
    query: GET_ALL_POSTS,
  }

  return axios.post(uriWP, body)
}
//Terms And Conditions
export const getTermsAndConditionsPageClient = async () => {
  const { pageBy: page } = await wpHttpGQL.request(GET_TERMS_AND_CONDITIONS)
  return page
}

export const getContactPageClient = async () => {
  const { pageBy: page } = await wpHttpGQL.request(GET_CONTACT)
  return page
}
