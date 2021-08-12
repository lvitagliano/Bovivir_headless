import { gql } from 'graphql-request'

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

const GENERATE_TOKEN = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`

const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($cart_id: String!, $cart_item_id: Int!) {
    removeItemFromCart(input: { cart_id: $cart_id, cart_item_id: $cart_item_id }) {
      cart {
        id
      }
    }
  }
`

const UPDATE_ITEMS_IN_CART = gql`
  mutation updateCartItems($cart_id: String!, $cart_items: [CartItemUpdateInput]!) {
    updateCartItems(input: { cart_id: $cart_id, cart_items: $cart_items }) {
      cart {
        id
      }
    }
  }
`

const ADD_ITEM_TO_CART = gql`
  mutation addSimpleProductsToCart($cart_id: String!, $cart_items: [SimpleProductCartItemInput]!) {
    addSimpleProductsToCart(input: { cart_id: $cart_id, cart_items: $cart_items }) {
      cart {
        items {
          id
          product {
            id
            sku
            name
          }
        }
      }
    }
  }
`

const ADD_COUPON_TO_CART = gql`
  mutation addCouponToCart($cart_id: String!, $coupon_code: String!) {
    applyCouponToCart(input: { cart_id: $cart_id, coupon_code: $coupon_code }) {
      cart {
        id
      }
    }
  }
`

const REMOVE_COUPON_FROM_CART = gql`
  mutation removeCouponFromCart($cart_id: String!) {
    removeCouponFromCart(input: { cart_id: $cart_id }) {
      cart {
        id
      }
    }
  }
`

const CREATE_EMPTY_CART = gql`
  mutation {
    createEmptyCart
  }
`

const MERGE_CARTS = gql`
mutation mergeCarts($src_cart_id: String!,$dst_cart_id: String!){
  mergeCarts(source_cart_id: $src_cart_id, destination_cart_id: $dst_cart_id){
    ${cart}
  }
}
`

const REMOVE_ITEM_WISHLIST = gql`
  mutation removeProductsFromWishlist($wishlistId: ID!, $wishlistItemsIds: [ID!]!) {
    removeProductsFromWishlist(wishlistId: $wishlistId, wishlistItemsIds: $wishlistItemsIds) {
      wishlist {
        id
        items {
          id
          qty
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
        }
      }
    }
  }
`

const ADD_ITEM_WISHLIST = gql`
  mutation addProductsToWishlist($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!) {
    addProductsToWishlist(wishlistId: $wishlistId, wishlistItems: $wishlistItems) {
      wishlist {
        id
        items {
          id
          qty
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
        }
      }
    }
  }
`

const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id) {
      Boolean
    }
  }
`

const ADD_PRODUCT_STOCK_ALERT = gql`
  mutation subscribeProductAlertStock($id: Int!) {
    subscribeProductAlertStock(productId: $id) {
      id
      product {
        sku
        name
      }
    }
  }
`

export {
  GENERATE_TOKEN,
  ADD_ITEM_TO_CART,
  UPDATE_ITEMS_IN_CART,
  REMOVE_ITEM_FROM_CART,
  ADD_COUPON_TO_CART,
  REMOVE_COUPON_FROM_CART,
  CREATE_EMPTY_CART,
  MERGE_CARTS,
  REMOVE_ITEM_WISHLIST,
  ADD_ITEM_WISHLIST,
  DELETE_CUSTOMER_ADDRESS,
  ADD_PRODUCT_STOCK_ALERT,
}
