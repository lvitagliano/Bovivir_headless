import { useEffect, useState, useContext } from 'react'
import CmsSlot from 'react-storefront/CmsSlot'
import MediaCarousel from 'react-storefront/carousel/MediaCarousel'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import AddToCartConfirmation from '../../components/product/AddToCartConfirmation'
import CrosssellProducts from './CrosssellProducts'
import TabPanel from 'react-storefront/TabPanel'
import QuantitySelector from 'react-storefront/QuantitySelector'
import Button from '../../components/Commons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, setCustomerWishList, setSuccess } from '../../store/actions/m2Action'
import { getProductBySku, addProductStockAlert } from '../../services/Client/GraphQl/m2GQL'
import CircularProgress from '@material-ui/core/CircularProgress'
import { StyledCucarda } from '../../components/product/styles'
import { useRouter } from 'next/router'
import { setLoginRequest } from '../../store/actions/userAction'
import { Context } from '../../services/Client/context/Context'
import { STOCK_OPTIONS } from '../../constants/m2'
import { Tooltip } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'
import Breadcrumbs from 'react-storefront/Breadcrumbs'

const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  carousel: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, -2),
      width: '100vw',
    },
  },
  lightboxCarousel: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%',
    },
  },
  confirmation: {
    padding: '2px 0',
  },
  dockedSnack: {
    [theme.breakpoints.down('xs')]: {
      left: '0',
      bottom: '0',
      right: '0',
    },
  },
  docked: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      padding: `${theme.spacing(2)}px`,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      borderRadius: '0',
    },
  },
  noShadow: {
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
  },
  bold: {
    fontWeight: '800',
  },
  semiBold: {
    fontWeight: '600',
  },
  detTitle: {
    fontSize: theme.typography.subtitle1.fontSize,
    color: '#555',
    fontSize: '1.2em',
  },
  detail: {
    color: '#555',
    fontSize: '1.1em',
  },
  shortdetail: {
    '& h2': {
      fontWeight: '100',
    },
    marginLeft: '5px',
  },
  cantidad: {
    fontSize: theme.typography.subtitle1.fontSize,
    marginRight: 5,
  },
  info: {
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '9em',
    marginBottom: '40px',
  },
  subtitle: {
    fontSize: '0.8em',
    textAlign: 'center',
    fontColor: '#888',
    fontWeight: '800',
  },
  name: {
    fontSize: '0.9',
    textAlign: 'left',
    maxHeight: '5em',
    minHeight: '61px',
    marginTop: '-1em',
    marginButtom: '10px',
  },
  discount: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: '0.8em',
    bottom: 5,
    right: 150,
    zIndex: 1,
  },
  discount2: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: '0.8em',
    bottom: 5,
    right: '32rem',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      right: '12.5rem',
    },
  },
  price: {
    width: '100%',
    fontSize: '1.5em',
    fontWeight: '800',
    textAlign: 'center',
  },
  priceOffer: {
    width: '100%',
    fontSize: '1em',
    fontWeight: '800',
    color: '#666',
    textAlign: 'left',
    textDecoration: 'line-through',
    marginTop: '5px',
  },
  priceOfferGreen: {
    position: 'relative',
    width: '100%',
    fontSize: '1.5em',
    fontWeight: '800',
    color: '#0f9c6c',
    textAlign: 'left',
    marginButton: '10px',
  },
  tabsColor: {
    '& span.MuiTabs-indicator': {
      backgroundColor: '#d0a9c2',
    },
  },
  quantityDescription: {
    margin: '10px',
  },
})

export default function ProductComponent({ sku }) {
  //Instances
  const { setOpen, attributesMetadata } = useContext(Context)
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  const dispatch = useDispatch()
  const router = useRouter()
  const priceObject = new Intl.NumberFormat('es-AR', {
    currency: 'ARS',
    style: 'currency',
  })

  // Selectors
  const { customerWishList } = useSelector(state => state.m2)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)

  // States
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [addToCartInProgress, setAddToCartInProgress] = useState(false)
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [hidden, setHidden] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [loadingAddToCart, setLoadingAddToCart] = useState(false)
  const [loadingBuyProduct, setLoadingBuyProduct] = useState(false)

  // useEffects
  useEffect(() => {
    producBySku()
  }, [sku])

  useEffect(() => {
    setFavourite(customerWishList?.items?.find(i => i.product.id === product.id) ? true : false)
  }, [product])

  // Functions
  async function producBySku() {
    setHidden(true)
    await getProductBySku({ sku }).then(p => {
      const { data } = p
      if (data.products.items.length > 0) {
        setProduct(data.products.items[0])
      }
    })
    setHidden(false)
  }

  // Handles
  const handleAdd = async (event, prodandqty, buy) => {
    setAddToCartInProgress(true)
    buy ? setLoadingBuyProduct(true) : setLoadingAddToCart(true)
    // disable the add to cart button until the request is finished
    try {
      let newItem = {
        sku: prodandqty.sku,
        quantity: prodandqty.quantity,
      }
      await dispatch(addItemToCart(newItem)).then(r => setOpen(true))
      if (buy) router.push(`/cart`, `/cart`, { shallow: true })
    } finally {
      // re-enable the add to cart button
      setAddToCartInProgress(false)
      buy ? setLoadingBuyProduct(false) : setLoadingAddToCart(false)
    }
  }

  const handleFavorite = async e => {
    e.stopPropagation()
    if (isLogedInM2 && isLogedInAuth0) {
      if (favourite) {
        dispatch(
          setCustomerWishList('REMOVE', {
            wishlistId: customerWishList?.id,
            wishlistItemsIds: [customerWishList?.items?.find(i => i.product.id === product.id).id],
          })
        )
      } else {
        dispatch(
          setCustomerWishList('ADD', {
            wishlistId: customerWishList?.id,
            wishlistItems: [{ sku: product.sku, quantity: 1 }],
          })
        )
      }
      setFavourite(!favourite)
    } else {
      dispatch(setLoginRequest(true))
    }
  }
  const handleProductStockAlert = async e => {
    e.stopPropagation()
    if (isLogedInM2 && isLogedInAuth0) {
      addProductStockAlert({ id: product.id }).then(
        dispatch(
          setSuccess({
            severity: 'success',
            errorMessage: 'Se ha suscripto a la alerta con éxito.',
            status: 200,
          })
        )
      )
    } else {
      dispatch(setLoginRequest(true))
    }
  }

  const BodyHtml = objecto => {
    const prod = objecto.product
    console.log(prod)
    const thumbnail = { alt: prod.name, src: prod.thumbnail?.url, type: 'image' }
    let full = []
    let thumbnails = []
    prod.media_gallery?.map(m => {
      full.push({ alt: m.label, src: m.url })
      thumbnails.push({ alt: m.label, src: m.url })
    })

    const related_product = prod.related_products?.[0] // Solo deberia venir 1
    const crosssell_products = prod.crosssell_products

    const cantidadAttr = attributesMetadata?.filter(x => x.attribute_code === 'cantidad')[0]
    const bodegaAttr = attributesMetadata?.filter(x => x.attribute_code === 'vino_bodega')[0]
    const cepaAttr = attributesMetadata?.filter(x => x.attribute_code === 'vino_cepa')[0]
    const variedadAttr = attributesMetadata?.filter(x => x.attribute_code === 'vino_variedad')[0]
    const seleccionAttr = attributesMetadata?.filter(x => x.attribute_code === 'vino_seleccion')[0]
    const vino_bodega = product.vino_bodega?.split(',')
    const vino_cepa = product.vino_cepa?.split(',')
    const vino_seleccion = product.vino_seleccion?.split(',')
    const vino_variedad = product.vino_variedad?.split(',')

    function maxItemsCalc(productos, value) {
      if (productos.stock_status === 'IN_STOCK') {
        if (value <= 5) {
          if (productos.qty >= value) {
            setQuantity(value)
          } else {
            alert('No hay stock suficiente para agregar otro')
          }
        } else {
          alert('Alcanzó la cantidad máxima permitida')
        }
      } else {
        alert('Artículo no se encuentra en stock')
      }
    }

    const breadCrumbsItems = prod.categories && [
      { text: 'Inicio', href: '/' },
      { text: prod.categories[0].name, href: `/tienda/${prod.categories[0].name.toLowerCase()}` },
      { text: prod.name, href: `/${prod.sku}/p/${prod.url_key}` },
    ]
    return (
      <>
        <Breadcrumbs items={breadCrumbsItems} />
        <Container
          maxWidth="lg"
          style={{ paddingTop: theme.spacing(2), backgroundColor: '#F7F7F7' }}
        >
          <Grid container spacing={4}>
            {isDesktop ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#7B7D81',
                    border: '0.5px solid rgb(251 244 244)',
                    borderRadius: '1px',
                  }}
                >
                  <MediaCarousel
                    className={classes.carousel}
                    lightboxClassName={classes.lightboxCarousel}
                    thumbnail={prod.thumbnail?.url}
                    height="100%"
                    media={{ full: full, thumbnails: thumbnails, thumbnail: thumbnail }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Row>
                        <Typography
                          variant="h5"
                          component="h1"
                          className={classes.bold}
                          gutterBottom
                        >
                          {prod.name}
                        </Typography>
                        <Hbox>
                          <CmsSlot>{prod.short_description?.html}</CmsSlot>
                        </Hbox>
                        {prod?.price_range?.maximum_price?.discount?.percent_off > 0 ? (
                          <>
                            <div className={classes.priceOffer}>
                              {priceObject.format(
                                prod?.price_range?.maximum_price?.regular_price?.value
                              )}
                            </div>
                            <div className={classes.priceOfferGreen}>
                              {priceObject.format(
                                prod?.price_range?.maximum_price?.final_price?.value
                              )}
                              <div className={classes.discount2}>
                                <StyledCucarda
                                  className="oferta"
                                  colour="#00bc8a"
                                  width="40px"
                                  text={`-${Math.trunc(
                                    prod?.price_range?.maximum_price?.discount?.percent_off
                                  )}%`}
                                  borderLeft="100px"
                                  margin={'0 0 0 -7rem'}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <Typography variant="h5" className={classes.semiBold}>
                            {priceObject.format(prod.price_range?.maximum_price.final_price.value)}
                          </Typography>
                        )}
                      </Row>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <AddToCartConfirmation
                      open={confirmationOpen}
                      setOpen={setConfirmationOpen}
                      product={prod}
                      quantity={quantity}
                      price={prod.priceText}
                    /> */}
                      <Hbox>
                        <CmsSlot inline={true}>
                          {
                            cantidadAttr?.attribute_options.find(
                              x => x.value === prod.cantidad?.toString()
                            )?.label
                          }
                          {prod.contenido}
                        </CmsSlot>
                      </Hbox>
                    </Grid>
                    <Grid item xs={12}>
                      <Hbox>
                        {prod?.qty === 0 && prod?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                          <div style={{ display: 'flex', margin: '0 0 1rem 1rem' }}>
                            <Tooltip title="Sin stock">
                              <span>
                                <Button
                                  margin="0"
                                  padding="0 30px"
                                  height="3.5em"
                                  width="70%"
                                  text="sin stock"
                                  disabled
                                />
                              </span>
                            </Tooltip>
                          </div>
                        ) : (
                          <>
                            <QuantitySelector
                              value={quantity}
                              onChange={value => maxItemsCalc(prod, value)}
                            />
                            <div style={{ display: 'flex', margin: '0 0 1rem 1rem' }}>
                              <Button
                                style={{ minWidth: '20%' }}
                                bold={true}
                                icon="add_shopping_cart"
                                disabled={addToCartInProgress}
                                loading={loadingAddToCart}
                                text="Agregar"
                                onClick={e =>
                                  handleAdd(e, { sku: prod?.sku, quantity: quantity }, false)
                                }
                              />
                              <Button
                                style={{ minWidth: '20%', marginLeft: '1em' }}
                                bold={true}
                                icon="shopping_cart"
                                disabled={addToCartInProgress}
                                loading={loadingBuyProduct}
                                text="Comprar"
                                onClick={e =>
                                  handleAdd(e, { sku: prod?.sku, quantity: quantity }, true)
                                }
                              />
                            </div>
                          </>
                        )}
                      </Hbox>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px', margin: '-2rem 0 0 0' }}>
                      <div className={classes.buttonContainer}>
                        <Button
                          style={{
                            backgroundColor: '#FFFFFF',
                            color: '#7B7D81',
                            border: '0.5px solid #e8dede',
                          }}
                          bold={true}
                          icon={favourite ? 'favorite' : 'favorite_border'}
                          disabled={addToCartInProgress}
                          text="agregar a Favoritos"
                          onClick={handleFavorite}
                        />
                        {prod?.qty === 0 && prod?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                          <Button
                            style={{
                              backgroundColor: '#FFFFFF',
                              color: '#7B7D81',
                              border: '0.5px solid #e8dede',
                              marginLeft: '1em',
                            }}
                            bold
                            icon={'add_alert'}
                            disabled={addToCartInProgress}
                            text="Suscribirme alerta de stock"
                            onClick={handleProductStockAlert}
                          />
                        ) : null}
                      </div>
                    </Grid>
                    {related_product && (
                      <div style={{ margin: '1rem', color: '#525356' }}>
                        <b>PODES AGREGAR EN ESTA COMPRA</b>
                        <div
                          style={{
                            width: '40rem',
                            height: '10rem',
                            display: 'flex',
                            border: '0.5px solid rgb(251 244 244)',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '1px',
                            marginTop: '1rem',
                          }}
                        >
                          <div style={{ width: '30%', height: '100%' }}>
                            <img
                              width="auto"
                              height="100%"
                              src={related_product?.image.url}
                              alt={related_product?.image.label}
                            />
                          </div>
                          <div
                            style={{
                              width: '50%',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'left',
                              alignItems: 'flex-start',
                            }}
                          >
                            <h5 style={{ color: '#818181', margin: '1rem 0 -0.5rem 0' }}>
                              4 Botellas
                            </h5>
                            <div className={classes.info}>
                              <div className={classes.name}>
                                <h4 style={{ color: '#818181' }}>{related_product?.name}</h4>
                              </div>
                              {false ? (
                                <>
                                  <div className={classes.priceOffer}>
                                    {priceObject.format(
                                      related_product?.price_range.maximum_price.regular_price.value
                                    )}
                                  </div>
                                  <div className={classes.priceOfferGreen}>
                                    {priceObject.format(
                                      related_product?.price_range.maximum_price.final_price.value
                                    )}
                                    <div className={classes.discount}>
                                      <StyledCucarda
                                        className="oferta"
                                        colour="#00bc8a"
                                        width="40px"
                                        text={`-${related_product?.price_range.maximum_price.discount.amount_off}%`}
                                        borderLeft="100px"
                                        margin={'0 0 0 -7rem'}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
                                  {priceObject.format(
                                    related_product?.price_range?.maximum_price.final_price.value
                                  )}
                                </Typography>
                              )}
                            </div>
                          </div>
                          <div style={{ width: '20%', height: '100%' }}>
                            {related_product?.qty === 0 &&
                            related_product?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                              <>
                                <Tooltip title="Sin stock">
                                  <span>
                                    <Button
                                      style={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#7B7D81',
                                        margin: '5px 0 0 60px',
                                      }}
                                      bold
                                      icon="remove_shopping_cart"
                                      disabled
                                    />
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <Button
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  color: '#7B7D81',
                                  margin: '5px 0 0 60px',
                                }}
                                bold
                                icon="add_shopping_cart"
                                disabled={addToCartInProgress}
                                onClick={e =>
                                  handleAdd(e, { sku: related_product?.sku, quantity: 1 }, false)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid container>
                <div style={{ margin: '10px' }}>
                  <Typography variant="h5" component="h1" className={classes.bold} gutterBottom>
                    {prod.name}
                  </Typography>
                  <Hbox>
                    <CmsSlot>{prod.short_description?.html}</CmsSlot>
                  </Hbox>
                  {prod?.price_range?.maximum_price?.discount?.percent_off > 0 ? (
                    <>
                      <div className={classes.priceOffer}>
                        {priceObject.format(prod?.price_range?.maximum_price?.regular_price?.value)}
                      </div>
                      <div className={classes.priceOfferGreen}>
                        {priceObject.format(prod?.price_range?.maximum_price?.final_price?.value)}
                        <div className={classes.discount2}>
                          <StyledCucarda
                            className="oferta"
                            colour="#00bc8a"
                            width="40px"
                            text={`-${prod?.price_range?.maximum_price?.discount?.percent_off.toFixed()}%`}
                            borderLeft="100px"
                            margin={'0 0 0 -7rem'}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Typography variant="h5" className={classes.semiBold}>
                      {priceObject.format(prod.price_range?.maximum_price.final_price.value)}
                    </Typography>
                  )}
                </div>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#7B7D81',
                    border: '0.5px solid rgb(251 244 244)',
                    borderRadius: '1px',
                  }}
                >
                  <MediaCarousel
                    className={classes.carousel}
                    lightboxClassName={classes.lightboxCarousel}
                    thumbnail={prod.thumbnail?.url}
                    height="100%"
                    media={{ full: full, thumbnails: thumbnails, thumbnail: thumbnail }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Hbox>
                    <CmsSlot className={classes.quantityDescription} inline={true}>
                      {
                        cantidadAttr?.attribute_options.find(
                          x => x.value === prod.cantidad?.toString()
                        )?.label
                      }
                      {prod.contenido}
                    </CmsSlot>
                  </Hbox>
                </Grid>
                <Grid item xs={12}>
                  <Hbox>
                    {prod?.qty === 0 && prod?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                      <div style={{ display: 'flex', margin: '0 0 1rem 1rem' }}>
                        <Tooltip title="Sin stock">
                          <span>
                            <Button
                              margin="0"
                              padding="0 30px"
                              height="3.5em"
                              width="70%"
                              text="sin stock"
                              disabled
                            />
                          </span>
                        </Tooltip>
                      </div>
                    ) : (
                      <>
                        <QuantitySelector value={quantity} onChange={value => setQuantity(value)} />
                        <div style={{ display: 'flex', margin: '0 0 1rem 1rem' }}>
                          <Button
                            style={{ minWidth: '20%' }}
                            bold={true}
                            icon="add_shopping_cart"
                            disabled={addToCartInProgress}
                            text="Agregar"
                            onClick={e =>
                              handleAdd(e, { sku: prod?.sku, quantity: quantity }, false)
                            }
                          />
                          <Button
                            style={{ minWidth: '20%', marginLeft: '1em' }}
                            bold={true}
                            icon="shopping_cart"
                            disabled={addToCartInProgress}
                            text="Comprar"
                            onClick={e =>
                              handleAdd(e, { sku: prod?.sku, quantity: quantity }, true)
                            }
                          />
                        </div>
                      </>
                    )}
                  </Hbox>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                  <div className={classes.buttonContainer}>
                    <Button
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#7B7D81',
                        border: '0.5px solid #e8dede',
                        width: '50%',
                      }}
                      bold={true}
                      icon={favourite ? 'favorite' : 'favorite_border'}
                      disabled={addToCartInProgress}
                      text="Favoritos"
                      onClick={handleFavorite}
                    />
                    {prod?.qty === 0 && prod?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                      <Button
                        style={{
                          backgroundColor: '#FFFFFF',
                          color: '#7B7D81',
                          border: '0.5px solid #e8dede',
                          marginLeft: '1em',
                          width: '50%',
                        }}
                        bold
                        icon={'add_alert'}
                        disabled={addToCartInProgress}
                        text="Alerta de stock"
                        onClick={handleProductStockAlert}
                      />
                    ) : null}
                  </div>
                </Grid>
                {related_product && (
                  <div style={{ margin: '1rem', color: '#525356' }}>
                    <b>PODES AGREGAR EN ESTA COMPRA</b>
                    <div
                      style={{
                        width: '100%',

                        display: 'flex',
                        border: '0.5px solid rgb(251 244 244)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1px',
                        marginTop: '1rem',
                      }}
                    >
                      <div style={{ width: '40%', height: '100%', paddingTop: '20px' }}>
                        <img
                          width="80%"
                          height="80%"
                          src={related_product?.image.url}
                          alt={related_product?.image.label}
                        />
                      </div>
                      <div
                        style={{
                          width: '40%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'left',
                          alignItems: 'flex-start',
                        }}
                      >
                        <h5 style={{ color: '#818181', margin: '1rem 0 0.5rem 0' }}>4 Botellas</h5>
                        <div className={classes.info}>
                          <div className={classes.name}>
                            <h4 style={{ color: '#818181' }}>{related_product?.name}</h4>
                          </div>
                          {false ? (
                            <>
                              <div className={classes.priceOffer}>
                                {priceObject.format(
                                  related_product?.price_range.maximum_price.regular_price.value
                                )}
                              </div>
                              <div className={classes.priceOfferGreen}>
                                {priceObject.format(
                                  related_product?.price_range.maximum_price.final_price.value
                                )}
                                <div className={classes.discount}>
                                  <StyledCucarda
                                    className="oferta"
                                    colour="#00bc8a"
                                    width="40px"
                                    text={`-${related_product?.price_range.maximum_price.discount.amount_off}%`}
                                    borderLeft="100px"
                                    margin={'0 0 0 -7rem'}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <Typography
                              variant="h6"
                              style={{ alignSelf: 'flex-start', margin: '20px 0' }}
                            >
                              {priceObject.format(
                                related_product?.price_range?.maximum_price.final_price.value
                              )}
                            </Typography>
                          )}
                        </div>
                      </div>
                      <div style={{ width: '20%', height: '100%' }}>
                        {related_product?.qty === 0 &&
                        related_product?.stock_status === STOCK_OPTIONS.OUT_OF_STOCK ? (
                          <>
                            <Tooltip title="Sin stock">
                              <span>
                                <Button
                                  style={{
                                    backgroundColor: '#FFFFFF',
                                    color: '#7B7D81',
                                  }}
                                  bold
                                  icon="remove_shopping_cart"
                                  disabled
                                />
                              </span>
                            </Tooltip>
                          </>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: '#FFFFFF',
                              color: '#7B7D81',
                            }}
                            bold
                            icon="add_shopping_cart"
                            disabled={addToCartInProgress}
                            onClick={e =>
                              handleAdd(e, { sku: related_product?.sku, quantity: 1 }, false)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Grid>
            )}
          </Grid>
          <div
            className={classes.tabsColor}
            style={{
              margin: '3rem 0rem',
              border: '0.5px solid rgb(251 244 244)',
              backgroundColor: '#FFFFFF',
              borderRadius: '1px',
              padding: '0.5rem 1.5rem',
            }}
          >
            <TabPanel>
              {isDesktop ? (
                <CmsSlot label="FICHA TÉCNICA">{`
            <div
            style="display: flex;
          width: 100%;
          height: 6rem;
          padding: 1rem;
          "
          >
            <div
              style="display: flex;
           min-width: 7rem;
           justify-content: space-between;
           margin: 0 6rem 0 0;"
              }}
            >
              <div
                style="
              margin-right: 1rem;
          background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
              background-position: -303px -224px;
              width: 36px;
              height: 35px;
              "
              ></div>
              <div>
                <div style="color: #762057;font-size: large;">
                  Bodega
                </div>
                <div>
                  ${vino_bodega?.map(
                    i => bodegaAttr?.attribute_options.find(x => x.value === i)?.label
                  )}
                </div>
              </div>
            </div>
            <div
              style="display: flex;
           min-width: 7rem;
           justify-content: space-between;
           margin: 0 6rem 0 0;"
              }}
            >
              <div
                style="
              margin-right: 1rem;
              background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
              background-position: -108px -212px;
              width: 27px;
              height: 34px;
              "
              ></div>
              <div>
                <div style="color: #762057;font-size: large;">
                  Tipo Vino
                </div>
                <div>
                  ${vino_cepa?.map(
                    i => cepaAttr?.attribute_options.find(x => x.value === i)?.label
                  )}
                </div>
              </div>
            </div>
            <div
              style="display: flex;
           min-width: 7rem;
           justify-content: space-between;
           margin: 0 6rem 0 0;"
              }}
            >
              <div
                style="
              margin-right: 1rem;
          background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
              background-position: -246px -121px;
              width: 38px;
              height: 53px;
              "
              ></div>
              <div>
                <div style="color: #762057;font-size: large;">
                  Vino Selección
                </div>
                <div>
                  ${vino_seleccion?.map(
                    i => seleccionAttr?.attribute_options.find(x => x.value === i)?.label
                  )}
                </div>
              </div>
            </div>
            <div
              style="display: flex;
           min-width: 7rem;
           justify-content: space-between;
           margin: 0 6rem 0 0;"
              }}
            >
              <div
                style="
              margin-right: 1rem;
          background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);        
              background-position: -303px -149px;
              width: 35px;
              height: 39px;
              "
              ></div>
              <div>
                <div style="color: #762057;font-size: large;">
                  Variedad
                </div>
                <div>
                  ${vino_variedad?.map(
                    i => variedadAttr?.attribute_options.find(x => x.value === i)?.label
                  )}
                </div>
              </div>
            </div>
          </div>
     `}</CmsSlot>
              ) : (
                <CmsSlot label="FICHA TÉCNICA">{`
<div
style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
"
>
<div
  style="
    display: flex;
    min-width: 7rem;
    min-height: 4rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  "
  }}
>
  <div
    style="
      margin-right: 1rem;
      background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
      background-position: -303px -224px;
      width: 36px;
      height: 35px;
    "
  ></div>
  <div style="width: 60%">
    <div style="color: #762057; font-size: large">Bodega</div>
    <div>
      ${vino_bodega?.map(i => bodegaAttr?.attribute_options.find(x => x.value === i)?.label)}
    </div>
  </div>
</div>
<div
  style="
    display: flex;
    min-width: 7rem;
    min-height: 4rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  "
  }}
>
  <div
    style="
      margin-right: 1rem;
      background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
      background-position: -108px -212px;
      width: 27px;
      height: 34px;
    "
  ></div>
  <div style="width: 60%">
    <div style="color: #762057; font-size: large">Tipo Vino</div>
    <div>
      ${vino_cepa?.map(i => cepaAttr?.attribute_options.find(x => x.value === i)?.label)}
    </div>
  </div>
</div>
<div
  style="
    display: flex;
    min-width: 7rem;
    min-height: 4rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  "
  }}
>
  <div
    style="
      margin-right: 1rem;
      background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
      background-position: -246px -121px;
      width: 38px;
      height: 53px;
    "
  ></div>
  <div style="width: 60%">
    <div style="color: #762057; font-size: large">Vino Selección</div>
    <div>
      ${vino_seleccion?.map(i => seleccionAttr?.attribute_options.find(x => x.value === i)?.label)}
    </div>
  </div>
</div>
<div
  style="
    display: flex;
    min-width: 7rem;
    min-height: 4rem;
    justify-content: space-between;
    margin-bottom: 1rem;
  "
  }}
>
  <div
    style="
      margin-right: 1rem;
      background-image: url(https://tienda.bonvivir.com/skin/frontend/bonvivir2016/default/images/sprite.png?1613164545425);
      background-position: -303px -149px;
      width: 35px;
      height: 39px;
    "
  ></div>
  <div style="width: 60%">
    <div style="color: #762057; font-size: large">Variedad</div>
    <div>
      ${vino_variedad?.map(i => variedadAttr?.attribute_options.find(x => x.value === i)?.label)}
    </div>
  </div>
</div>
</div>
     `}</CmsSlot>
              )}
              <CmsSlot label="INFO ADICIONAL">{product.description?.html}</CmsSlot>
              <CmsSlot label="ACERCA DE ESTE PRODUCTO">{product.html_wide}</CmsSlot>
            </TabPanel>
          </div>
          <Grid item xs={12}>
            {crosssell_products && <CrosssellProducts crosssell_products={crosssell_products} />}
          </Grid>
        </Container>
      </>
    )
  }

  return (
    <div>
      {hidden ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'column-reverse',
            marginTop: '50px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <BodyHtml product={product} />
      )}
    </div>
  )
}
