import { gql } from 'graphql-request'

const items = `
items{
  id,
  prices{
    discounts{
      amount{value}
      label
    },
    price{value}
    row_total{value}
    row_total_including_tax{value}
    total_item_discount{value}
  }
  quantity
  product {
    id
    name
    sku
    price_range {
      maximum_price {
        final_price {
          currency,
          value
        },
        discount{
          amount_off,
          percent_off
        },
        fixed_product_taxes{
          amount {
            currency,
            value
          }, 
          label
        }
        regular_price{
          currency,
          value
        }
      }
    }
    image {
      label
      url
    },
    media_gallery{
      label
      url
    },
    thumbnail {
      label
      url
    }
  }
}
`

const GET_COUNTRIES = gql`
  query getProductById {
    products(filter: { category_id: { eq: "7" } }) {
      items {
        name
      }
    }
  }
`

const GET_CATEGORIES = gql`
  query {
    categoryList(filters: { ids: { eq: "2" } }) {
      id
      children {
        canonical_url
        include_in_menu
        name
        url_path
      }
    }
  }
`

const GET_CUSTOMER_CART = gql`
query{
  customerCart{
    id
    applied_coupons{
      code
    }
    prices {
      discounts{
        amount{
          currency
          value
        }
        label
      }
      grand_total {
         currency
          value
      }
      subtotal_excluding_tax {
         currency
          value
      }
      subtotal_including_tax {
         currency
          value
      }
      subtotal_with_discount_excluding_tax {
         currency
          value
      } 
    }
    ${items}
  }
}
`

const GET_CUSTOMER_ORDERS = gql`
  query {
    customerOrders {
      items {
        created_at
        grand_total
        id
        order_number
        status
      }
    }
  }
`

const simpleProduct = `
    id,
    image {
      label
      url
    },
    name,
    thumbnail { url }
    description {
      html
    },
    sku,
    media_gallery {
      label
      url
    },
    only_x_left_in_stock,
    stock_status,
    short_description{html},
    vino_cepa,
    vino_bodega,
    vino_variedad,
    vino_seleccion,
    price_range {
      maximum_price {
        final_price {
          currency,
          value
        },
        discount{
          amount_off
        },
        fixed_product_taxes{
          amount {
            currency,
            value
          }, 
          label
        }
        regular_price{
          currency,
          value
        }
      }
    }
`

const SEARCH_PRODUCTS = gql`
  query searchProducts($filter: String!) {
    products(search: $filter) {
      items {
        ${simpleProduct}
        related_products {
          ${simpleProduct}
        }
      }
    }
  }
`

const GET_CUSTOMER_WISHLIST = gql`
  query {
    customer {
      wishlist {
        id
        items {
          id
          product {
            descuento_socios
            dos_por_uno
            envio_gratis
            id
            image {
              label
              url
            }
            name
            sku
            price_range {
              maximum_price {
                regular_price {
                  value
                }
              }
            }
            precio_de_mercado
            short_description {
              html
            }
            small_image {
              label
              url
            }
            thumbnail {
              label
              url
            }
          }
          qty
        }
      }
    }
  }
`

const GET_CUSTOMER_ADDRESSBOOK = gql`
  query {
    customer {
      addresses {
        city
        country_code
        default_billing
        default_shipping
        firstname
        id
        lastname
        postcode
        region {
          region
          region_code
        }
        street
        telephone
      }
    }
  }
`

export {
  GET_COUNTRIES,
  GET_CUSTOMER_CART,
  GET_CATEGORIES,
  GET_CUSTOMER_ORDERS,
  SEARCH_PRODUCTS,
  GET_CUSTOMER_WISHLIST,
  GET_CUSTOMER_ADDRESSBOOK,
}
