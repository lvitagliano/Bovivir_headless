import { gql } from 'graphql-request'

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
