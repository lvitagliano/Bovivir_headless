import { useContext, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import useLazyState from 'react-storefront/hooks/useLazyState'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import CmsSlot from 'react-storefront/CmsSlot'
import MediaCarousel from 'react-storefront/carousel/MediaCarousel'
import PWAContext from 'react-storefront/PWAContext'
import { Container, Grid, Typography, Hidden } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import get from 'lodash/get'
import fetch from 'react-storefront/fetch'
import { fetchLatest } from 'react-storefront/utils/fetchLatest'
import AddToCartConfirmation from '../../components/product/AddToCartConfirmation'
import SuggestedProducts from '../../components/product/SuggestedProducts'
import Lazy from 'react-storefront/Lazy'
import TabPanel from 'react-storefront/TabPanel'
import QuantitySelector from 'react-storefront/QuantitySelector'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'
import Button from '../../components/Commons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, setCustomerWishList } from '../../store/actions/m2Action'
import { useRouter } from 'next/router'

const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30em',
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
    marginTop: -25,
  },
  cantidad: {
    fontSize: theme.typography.subtitle1.fontSize,
    marginRight: 5,
  },
})

const useStyles = makeStyles(styles)

const Product = React.memo(lazyProps => {
  const theme = useTheme()
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [addToCartInProgress, setAddToCartInProgress] = useState(false)
  const [state, updateState] = useLazyState(lazyProps, {
    pageData: { quantity: 1, carousel: { index: 0 } },
  })
  const [favourite, setFavourite] = useState(false)
  const { customerWishList } = useSelector(state => state.m2)
  const classes = useStyles()
  const product = get(state, 'pageData.product') || {}
  const quantity = get(state, 'pageData.quantity')
  const { loading } = state
  const dispatch = useDispatch()
  const router = useRouter()

  // This is provided when <ForwardThumbnail> is wrapped around product links
  const { thumbnail } = useContext(PWAContext)

  const handleAdd = async event => {
    setAddToCartInProgress(true) // disable the add to cart button until the request is finished
    try {
      let newItem = {
        sku: product.sku,
        quantity: quantity,
      }
      await dispatch(addItemToCart(newItem))
    } finally {
      // re-enable the add to cart button
      setAddToCartInProgress(false)
    }
  }

  const handleBuy = async event => {
    setAddToCartInProgress(true) // disable the add to cart button until the request is finished
    try {
      let newItem = {
        sku: product.sku,
        quantity: quantity,
      }
      await dispatch(addItemToCart(newItem))
      router.push(`/cart`, `/cart`, { shallow: true })
    } finally {
      // re-enable the add to cart button
      setAddToCartInProgress(false)
    }
  }

  const handleFavorite = async e => {
    if (favourite) {
      dispatch(
        setCustomerWishList('REMOVE', {
          wishlistId: customerWishList?.id,
          wishlistItemsIds: [
            customerWishList?.items?.find(i => i.product.id === product.reviewsKey).id,
          ],
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
  }

  const header = (
    <Row>
      <Typography variant="h5" component="h1" className={classes.bold} gutterBottom>
        {product ? product.name : <Skeleton style={{ height: '1em' }} />}
      </Typography>
      <Hbox>
        <CmsSlot className={classes.shortdetail} label="Detalle">
          {product.short_description}
        </CmsSlot>
      </Hbox>
      {product ? (
        <>
          <Typography variant="h5" className={classes.semiBold}>
            {product.basePriceText}
          </Typography>
        </>
      ) : (
        <div>
          <Skeleton style={{ height: 14, marginBottom: theme.spacing(2) }}></Skeleton>
        </div>
      )}
    </Row>
  )

  return (
    <>
      <Breadcrumbs items={!loading && state.pageData.breadcrumbs} />
      <Container maxWidth="lg" style={{ paddingTop: theme.spacing(2) }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={5}>
            <Hidden implementation="css" smUp>
              {header}
            </Hidden>
            <MediaCarousel
              className={classes.carousel}
              lightboxClassName={classes.lightboxCarousel}
              thumbnail={thumbnail.current}
              height="100%"
              media={product && product.media}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Hidden implementation="css" xsDown>
                  <div style={{ padding: '0' }}>{header}</div>
                </Hidden>
              </Grid>
              <Grid item xs={12}>
                <AddToCartConfirmation
                  open={confirmationOpen}
                  setOpen={setConfirmationOpen}
                  product={product}
                  quantity={quantity}
                  price={product.priceText}
                />
                <div className={`${classes.detTitle} ${classes.semiBold}`}>4 BOTELLAS</div>
                <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                  <li className={`${classes.detail} ${classes.semiBold}`}>
                    1 botella de Luigi Bosca Gala 1 2017
                  </li>
                  <li className={`${classes.detail} ${classes.semiBold}`}>
                    1 botella de Luigi Bosca Gala 2 2017
                  </li>
                  <li className={`${classes.detail} ${classes.semiBold}`}>
                    1 botella de Luigi Bosca Gala 3 2017
                  </li>
                  <li className={`${classes.detail} ${classes.semiBold}`}>
                    1 botella de Luigi Bosca Gala 4 2017
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Hbox>
                  <p className={`${classes.cantidad} ${classes.semiBold}`}>CANTIDAD</p>
                  <QuantitySelector
                    value={quantity}
                    onChange={value =>
                      updateState({ ...state, pageData: { ...state.pageData, quantity: value } })
                    }
                  />
                </Hbox>
              </Grid>
              <Grid item xs={12} style={{ padding: '10px' }}>
                <div className={classes.buttonContainer}>
                  <Button
                    style={{ minWidth: '20%' }}
                    bold={true}
                    icon="add_shopping_cart"
                    disabled={addToCartInProgress}
                    text="Agregar"
                    onClick={handleAdd}
                  />
                  <Button
                    style={{ minWidth: '20%', marginLeft: '3em' }}
                    bold={true}
                    icon="shopping_cart"
                    disabled={addToCartInProgress}
                    text="Comprar"
                    onClick={handleBuy}
                  />
                  <Button
                    style={{ minWidth: '20%', marginLeft: '3em' }}
                    bold={true}
                    icon={favourite ? 'favorite' : 'favorite_border'}
                    disabled={addToCartInProgress}
                    text="Favorito"
                    onClick={handleFavorite}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ficha del producto */}
        <Grid item xs={12}>
          <TabPanel>
            <CmsSlot label="Descripción">{product.description}</CmsSlot>
            <CmsSlot label="Specs">{product.specs}</CmsSlot>
          </TabPanel>
        </Grid>

        <Grid item xs={12}>
          <Lazy style={{ minHeight: 285 }}>
            <SuggestedProducts product={!loading && product} />
          </Lazy>
        </Grid>
      </Container>
    </>
  )
})

Product.getInitialProps = createLazyProps(fetchFromAPI)

export default Product
