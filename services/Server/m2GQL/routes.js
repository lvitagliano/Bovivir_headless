const { GraphQLClient, gql } = require('graphql-request')
const url = `${process.env.M2_CONFIG_HOST}/graphql`
const graphqlHttp = new GraphQLClient(url)

// OBJECTS
const simpleProduct = `
    id,
    html_wide,
    url_key,
    url_suffix,
    image {
      label
      url
    },
    name,
    categories{
      name
    },
    envio_gratis,
    contenido,
    cantidad,
    dos_por_uno,
    special_date,
    qty,
    descuento_socios,
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
    short_description { html },
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
        discount {
          amount_off
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
`

// MUTATIONS
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
const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteCustomerAddress($ID: Int!) {
    deleteCustomerAddress(id: $ID)
  }
`
const ADD_CUSTOMER_ADDRESS = gql`
  mutation createCustomerAddress(
    $street: [String!]!
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean!
    $default_billing: Boolean!
    $covedisa_latitude: String!
    $covedisa_longitude: String!
    $region: String
  ) {
    createCustomerAddress(
      input: {
        country_code: AR
        street: $street
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: $default_shipping
        default_billing: $default_billing
        covedisa_latitude: $covedisa_latitude
        covedisa_longitude: $covedisa_longitude
        region: { region: $region }
      }
    ) {
      id
    }
  }
`
const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation updateCustomerAddress(
    $id: Int!
    $street: [String!]!
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean!
    $default_billing: Boolean!
    $covedisa_latitude: String!
    $covedisa_longitude: String!
    $region: String
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        country_code: AR
        street: $street
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: $default_shipping
        default_billing: $default_billing
        covedisa_latitude: $covedisa_latitude
        covedisa_longitude: $covedisa_longitude
        region: { region: $region }
      }
    ) {
      id
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
const UPDATE_CUSTOMER_DATA = gql`
  mutation updateCustomer(
    $firstname: String
    $lastname: String
    $gender: Int
    # $taxvat_type: String
    $taxvat: String
    $dob: String
  ) {
    updateCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        gender: $gender
        taxvat_type: "246"
        taxvat: $taxvat
        date_of_birth: $dob
      }
      custom_attributes: {}
    ) {
      customer {
        firstname
      }
    }
  }
`
const UPDATE_CUSTOMER_EMAIL_M2 = gql`
  mutation updateCustomer($email: String!) {
    updateCustomer(input: { email: $email }, custom_attributes: {}) {
      customer {
        email
        firstname
      }
    }
  }
`
const UPDATE_CUSTOMER_DATA_CLN = gql`
  mutation updateCustomer($covedisa_tarjeta_cln: String) {
    updateCustomer(input: { covedisa_tarjeta_cln: $covedisa_tarjeta_cln }, custom_attributes: {}) {
      customer {
        firstname
      }
    }
  }
`
const UPDATE_CUSTOMERLOGED_PASSWORD = gql`
  mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      email
    }
  }
`
// QUERYS
const GET_PRODUCT_BY_SKU = gql`
query products($sku: String!)
{
  products(filter: { sku: { eq: $sku } }) {
    items {
      ${simpleProduct}
      related_products {
        ${simpleProduct}
      }
      crosssell_products {
        ${simpleProduct}
      }
      upsell_products {
        ${simpleProduct}
      }
    }
  }
}
`
// Custom Attribute Metadata M2
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

const GET_PRODUCTS = gql`
  query products(
    $search: String
    $categoryId: String
    $pageSize: Int!
    $MinPrice: String
    $MaxPrice: String
    $VinoBodega: [String]
    $VinoVariedad: [String]
    $VinoCepa: [String]
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      pageSize: $pageSize
      currentPage: 1
      filter: {
        category_id: { eq: $categoryId }
        price: { from: $MinPrice, to: $MaxPrice }
        vino_bodega: { eq: "", in: $VinoBodega }
        vino_variedad: { eq: "", in: $VinoVariedad }
        vino_cepa: { eq: "", in: $VinoCepa }
      }
      sort: $sort
    ) {
      aggregations {
        attribute_code
        count
        label
        options {
          count
          label
          value
        }
      }

      sort_fields {
        default
        options {
          label
          value
        }
      }

      total_count
      page_info {
        page_size
        current_page
        total_pages
      }

      items {
        id
        html_wide
        url_key
        url_suffix
        image {
          label
          url
        }
        name
        envio_gratis
        contenido
        cantidad
        dos_por_uno
        special_date
        qty
        descuento_socios
        thumbnail {
          url
        }
        description {
          html
        }
        sku
        media_gallery {
          label
          url
        }
        only_x_left_in_stock
        stock_status
        short_description {
          html
        }
        vino_cepa
        vino_bodega
        vino_variedad
        vino_seleccion
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            discount {
              amount_off
              percent_off
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`
// VALIDATE_EMAIL_ISAVAILABLE_M2
const VALIDATE_EMAIL_ISAVAILABLE_M2 = gql`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`

// CATEGORIES_OF_MENU_SHOP
const CATEGORIES_OF_MENU_SHOP = gql`
  query {
    categoryList(filters: {}) {
      id
      name
      include_in_menu
      url_path
    }
  }
`
module.exports = app => {
  // DELETE_CUSTOMER_ADDRESS
  app.post('/m2GQL/deleteCustomerAddressServer', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors } = await graphqlHttp.rawRequest(DELETE_CUSTOMER_ADDRESS, req.body)
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // ADD_CUSTOMER_ADDRESS
  app.post('/m2GQL/addCustomerAddressServer', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
      ADD_CUSTOMER_ADDRESS,
      req.body
    )
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // UPDATE_CUSTOMER_ADDRESS
  app.post('/m2GQL/updateCustomerAddressServer', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
      UPDATE_CUSTOMER_ADDRESS,
      req.body
    )
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // GET_PRODUCT_BY_SKU
  app.post('/m2GQL/products', async (req, res) => {
    try {
      graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
      const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
        GET_PRODUCT_BY_SKU,
        req.body
      )
      if (data) res.json(data)
    } catch (error) {
      res.json(error.response.data)
    }
  })

  // GENERATE_TOKEN
  app.post('/m2GQL/generateTokenServer', async (req, res) => {
    try {
      const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
        GENERATE_TOKEN,
        req.body
      )
      graphqlHttp.setHeader('Authorization', `Bearer ${data.generateCustomerToken.token}`)
      if (!errors) res.json(data)
    } catch (error) {
      res.status(400).json({
        success: false,
        result: error.response.errors[0].message,
      })
    }
  })

  // UPDATE_CUSTOMERLOGED_PASSWORD
  app.post('/m2GQL/updateCustomerLogedPassword', async (req, res) => {
    try {
      const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
        UPDATE_CUSTOMERLOGED_PASSWORD,
        req.body
      )
      if (!errors) res.json(data)
    } catch (error) {
      res.status(400).json({
        success: false,
        result: error.response.errors[0].message,
      })
    }
  })

  // GET_PRODUCTS
  app.post('/m2GQL/getProductsServer', async (req, res) => {
    const { data, errors } = await graphqlHttp.rawRequest(GET_PRODUCTS, req.body)
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  app.post('/m2GQL/customAttributes', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors } = await graphqlHttp.rawRequest(GET_CUSTOM_ATTRIBUTES, req.body)
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  app.post('/m2GQL/productStockAlert', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors } = await graphqlHttp.rawRequest(ADD_PRODUCT_STOCK_ALERT, req.body)
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // UPDATE_CUSTOMER_DATA
  app.post('/m2GQL/updateCustomerDataServer', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
      UPDATE_CUSTOMER_DATA,
      req.body
    )
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // UPDATE_CUSTOMER_DATA_CLN
  app.post('/m2GQL/updateCustomerDataCLNServer', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)
    const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
      UPDATE_CUSTOMER_DATA_CLN,
      req.body
    )
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // UPDATE_CUSTOMER_EMAIL_MD
  app.post('/m2GQL/updateCustomerEmailM2Server', async (req, res) => {
    graphqlHttp.setHeader('Authorization', `${req.headers.authorization} `)

    const { data, errors, extensions, headers, status } = await graphqlHttp.rawRequest(
      UPDATE_CUSTOMER_EMAIL_M2,
      req.body
    )

    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // VALIDATE_EMAIL_ISAVAILABLE_M2
  app.post('/m2GQL/validateEmailIsAvailableM2Server', async (req, res) => {
    const { data, errors } = await graphqlHttp.rawRequest(VALIDATE_EMAIL_ISAVAILABLE_M2, req.body)
    if (!errors) res.json(data.isEmailAvailable.is_email_available)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })

  // CATEGORIES_OF_MENU_SHOP
  app.post('/m2GQL/getListMenuM2', async (req, res) => {
    const { data, errors } = await graphqlHttp.rawRequest(CATEGORIES_OF_MENU_SHOP)
    if (!errors) res.json(data)
    else
      res.status(error.response.status || 400).json({
        success: false,
        result: errors,
      })
  })
}
