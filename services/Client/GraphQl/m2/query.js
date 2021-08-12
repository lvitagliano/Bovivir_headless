import { gql } from 'graphql-request'

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
const cart = `
id
total_quantity
applied_coupons {
  code
}
prices {
  discounts {
    amount {
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
items {
  id
  prices {
    discounts {
      amount {
        value
      }
      label
    }
    price {
      value
    }
    row_total {
      value
    }
    row_total_including_tax {
      value
    }
    total_item_discount {
      value
    }
  }
  quantity
  product {
    id
    new_from_date
    new_to_date
    only_x_left_in_stock
    envio_gratis
    dos_por_uno
    special_date
    descuento_socios
    stock_status
    qty
    sku
    url_key
    name
    price_range {
      maximum_price {
        final_price {
          value
        }
        regular_price {
          value
        }
      }
    }
    image {
      label
      url
    }
    media_gallery {
      label
      url
    }
    thumbnail {
      label
      url
    }
  }
}
`
const GET_CUSTOMER_CART = gql`
query{
  customerCart{
    ${cart}
  }
}
`
const GET_GUEST_CART = gql`
query cart($cart_id: String!){
  cart(cart_id: $cart_id){
    ${cart}
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

const simpleProductForSearch = gql`
    id
    name
    sku
    url_key
    image {
      label
      url
    }
`
const SEARCH_PRODUCTS = gql`
  query searchProducts($filter: String!) {
    products(search: $filter) {
      items {
        ${simpleProductForSearch}
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
            url_key
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
        street
        telephone
      }
    }
  }
`

const GET_CUSTOM_ATTRIBUTES = gql`
  {
    customAttributeMetadata(
      attributes: [
        { attribute_code: "cantidad", entity_type: "catalog_product" }
        { attribute_code: "vino_bodega", entity_type: "catalog_product" }
        { attribute_code: "vino_cepa", entity_type: "catalog_product" }
        { attribute_code: "vino_seleccion", entity_type: "catalog_product" }
        { attribute_code: "vino_variedad", entity_type: "catalog_product" }
      ]
    ) {
      items {
        attribute_code
        attribute_type
        entity_type
        input_type
        attribute_options {
          value
          label
        }
      }
    }
  }
`
// Categorias para el submenu de tienda
const CATEGORIES_OF_MENU_SHOP = `
query{
  categoryList(filters:{}){
    id
    name
		include_in_menu
    url_path
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
  GET_CUSTOM_ATTRIBUTES,
  GET_GUEST_CART,
  CATEGORIES_OF_MENU_SHOP,
}
