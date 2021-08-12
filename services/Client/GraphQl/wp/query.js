import { gql } from 'graphql-request'

// PAGE MARIDAJES PAIRINGS - FILTERS
export const GET_CATEGORIES_BY_NAME = gql`
  query getCategoriesByName($name: [String!]) {
    categories(where: { name: $name }) {
      nodes {
        name
        children {
          nodes {
            name
            count
            categoryId
          }
        }
      }
    }
  }
`
// PAGE MARIDAJES PAIRINGS
export const GET_PAIRINGS = gql`
  query getPairings($page: String, $quantity: Int!, $categoryIn: [ID]) {
    pairings(after: $page, first: $quantity, where: { categoryIn: $categoryIn }) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        featuredImage {
          node {
            guid
          }
        }
        title
        uri
      }
    }
  }
`

//SELECTIONS
export const GET_SELECTIONS = gql`
  query MyQuery {
    postBy(slug: "Selecciones") {
      cf_selecciones {
        title1selection
        title2selection
        subtitleselection
        selecciones {
          ... on Post {
            cf_seleccion {
              logoselection {
                sourceUrl
              }
              cajaselection {
                sourceUrl
              }
              cantidadselection
              selection
              textselection
              titleselection
              vinosselection {
                ... on Post {
                  cf_vinoSeleccion {
                    vinoseleccion
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
//HOME
//CAROUSEL
export const GET_DATA_HOME_CAROUSEL = gql`
  query {
    postBy(slug: "Home_Carrousel") {
      cf_home_carrousel {
        carrousel {
          ... on Post {
            id
            cf_home_carrousel_banners {
              banner {
                image {
                  sourceUrl
                }
                label
                subtitle
                text
                title2
                linea
                button1 {
                  link
                  text
                }
                button2 {
                  link
                  text
                }
                listitem {
                  ... on Post {
                    id
                    cf_Home_carrousel_banners_listItem {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
//VERTICALSTEPPER
export const GET_DATA_HOME_VERTICALSTEPPER = gql`
  query {
    postBy(slug: "Home_verticalStepper") {
      cf_home_verticalStepper {
        title
        homeVerticalstepper {
          ... on Post {
            cf_home_verticalStepper_step {
              text
              image {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`
//BIGBANNER
export const GET_DATA_HOME_BIGBANNER = gql`
  query {
    postBy(slug: "Home_bigBanner") {
      cf_home_bigBanner {
        imageBigbanner {
          sourceUrl
        }
        button1Bigbanner {
          textButton1Bigbanner
          link
        }
        button2Bigbanner {
          textButton2Bigbanner
          link
        }
        titleBigbanner
        title2Bigbanner
        textBigbanner
        subtitleBigbanner
        listitemBigbanner {
          ... on Post {
            id
            cf_home_bigBanner_listItem {
              listitem
            }
          }
        }
      }
    }
  }
`
// BANNERSELECTION
export const GET_DATA_HOME_BANNERSELECTION = gql`
  query {
    postBy(slug: "Home_BannerSelection") {
      cf_home_bannerselection {
        imageBannerselection {
          sourceUrl
        }
        titleBannerselectioninfo
        textBannerselectioninfo
        subtitleBannerselectioninfo
        button1Bannerselectioninfo {
          linkButton1Bannerselectioninfo
          textButton1Bannerselectioninfo
        }
        bannerselectioninfoSelecciones {
          ... on Post {
            id
            cf_home_bannerselection_selecciones {
              imageSeleccion {
                sourceUrl
              }
              tituloSeleccion
              textoSeleccion
            }
          }
        }
      }
    }
  }
`
// GOTIENDA
export const GET_DATA_HOME_GOTIENDA = gql`
  query {
    postBy(slug: "Home_goTienda") {
      cf_home_goTienda {
        imagee {
          sourceUrl
        }
        buttonn {
          linkk
          textt
        }
        descriptionn
        titlee
        subtitle
      }
    }
  }
`
// BANNERTEST
export const GET_DATA_HOME_BANNERTEST = gql`
  query {
    postBy(slug: "Home_bannerTest") {
      id
      cf_home_bannerTest {
        titletest
        descriptiontest
        buttontest {
          buttontexttest
          buttonlinktest
        }
        imagetest {
          sourceUrl
        }
      }
    }
  }
`
// CONTENTDISPLAY
export const GET_DATA_HOME_CONTENTDISPLAY = gql`
  query {
    postBy(slug: "Home_ContentDisplay") {
      cf_home_contentDisplay {
        titledisplay
        descriptiondisplay
        button1display {
          text1display
          linkdisplay
        }
        button2display {
          text1display
          linkdisplay
        }
        itemsdisplay {
          ... on Post {
            cf_home_contentDisplay_item {
              title
              description
              link {
                label
                href
              }
              image {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`

// GET_DATA_FOOTER
export const GET_DATA_FOOTER = gql`
  query MyQuery {
    postBy(slug: "footer") {
      cf_footer {
        footer {
          ... on Post {
            id
            cf_footer_secciones {
              name
              objects {
                ... on Post {
                  id
                  cf_footer_seccion_objetc {
                    href
                    label
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

//TERMS AND CONDITIONS -> Cambiar url al pasar a prod
export const GET_TERMS_AND_CONDITIONS = gql`
  query MyQuery {
    pageBy(uri: "/terminos-y-condiciones/") {
      title
      content
    }
  }
`

//CONTACT -> Cambiar url al pasar a prod
export const GET_CONTACT = gql`
  query MyQuery {
    pageBy(uri: "/contacto/") {
      title
      content
    }
  }
`

//INSTRUCCIONES SIN GQL PARA AXIOS GRAPHQL
// GET SELECTIONS
export const GET_ALL_SELECTIONS = `query allSelections {
  selections {
    nodes {
      guid
      title
      uri
      link
      date
      slug
      id
      featuredImage {
        node {
          guid
        }
      }
      quality
      selectionWines {
        wine_1
        wine_2
        wine_3
      }
      boxes {
        nodes {
          bottles
          bottles_per_label
          price
        }
      }
    }
  }
}`

export const GET_ALL_SELECTIONS_BY_ID = `query selectionById($idSelection: ID!) {
  selection(id: $idSelection) {
    id
    slug
    title
  }`

// GET WINES
export const GET_ALL_WINES = `query allWines {
  wines {
    edges {
      node {
        id
      }
    }
  }
}`

export const GET_WINE_BY_ID = `query allWinesById($idSWine: ID!) {
  wine(id: $idSWine) {
    id
    slug
    title
  }`

// GET CELLAR - BODEGAS
export const GET_ALL_CELLARS = `query AllCellars {
  cellars {
    nodes {
      id
      link
      slug
      uri
      title
      status
      guid
      logo
    }
  }
}`

export const GET_CELLAR_BY_ID = `query allcellarById($idcellar: ID!) {
  cellar(id: $idcellar) {
    nodes {
      id
      link
      slug
      uri
      title
      status
      guid
      featuredImage {
        node {
          guid
        }
      }
    }
  }
}`

// GET EVENTS
export const GET_ALL_EVENTS = `query AllEvents {
      events {
        nodes {
          content
          featuredImage {
            node {
              guid
            }
          }
          id
          slug
          date
          status
          title
          uri
        }
      }
    }`

export const GET_EVENT_BY_ID = `query eventById($idEvent: ID!) {
      event(id: $idEvent) {
          content
          featuredImage {
            node {
              guid
            }
          }
          id
          slug
          status
          title
          uri
          date
      }
    }`

// GET PAIRINGS - Meridajes
export const GET_ALL_PAIRINGS = `query AllPairings {
  pairings {
    nodes {
      guid
      content
      featuredImage {
            node {
              guid
            }
          }
      slug
      title
      uri
      link
      status
      date
      id
    }
  }
}`

export const GET_PAIRING_BY_ID = `query allPairingById($idPairing: ID!) {
  pairing(id: $idPairing) {
    nodes {
      guid
      content
      slug
      title
      uri
      link
      status
      date
      id
    }
  }
}`

// GET PERKS - Beneficios
export const GET_ALL_PERKS = `query AllPerks {
  perks {
    nodes {
          content
          featuredImage {
            node {
              guid
            }
          }
          id
          slug
          status
          title
          uri
        }
  }
}`

export const GET_ALL_PERK_BY_ID = `query allPerkById($idPerk: ID!) {
  perk(id: $idPerk) {
    id
    slug
    title
  }`

export const FOOTER_CATEGORIES = `query getFooterCategories {
  menu(id: "dGVybToyNg==") {
    slug
    menuItems {
      nodes {
        url
        label
      }
    }
  }
  }`

export const FOOTER_SOCIAL_MEDIA = `query getFooterSocialMedia {
  menu(id: "dGVybToyNw==") {
    slug
    menuItems {
      nodes {
        url
        label
      }
    }
  }
  }`

export const GET_ALL_POSTS = `query allPosts {
    posts {
    nodes {
      uri
      title
      featuredImage {
        node {
          guid
        }
      }
    }
  }
      }`

//GET FAQS - PREGUNTAS FRECUENTES
export const GET_DATA_FAQS = gql`
  query MyQuery {
    pageBy(uri: "faqs") {
      title
      content
      featuredImageDatabaseId
    }
  }
`
