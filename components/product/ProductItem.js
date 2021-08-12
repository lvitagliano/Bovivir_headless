import React, { memo, useCallback, useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { Vbox } from 'react-storefront/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ForwardThumbnail from 'react-storefront/ForwardThumbnail'
import Image from 'react-storefront/Image'
import Button from '../Commons/Button'
import EllipsisText from '../../components/Commons/EllipsisText'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { StyledCucarda } from './styles'
import { setCustomerWishList, addItemToCart, updateItemsInCart } from '../../store/actions/m2Action'
import { setLoginRequest } from '../../store/actions/userAction'
import { Typography } from '@material-ui/core'
import { Context } from '../../services/Client/context/Context'
import moment from 'moment'
import { CUCARDA_ULTIMOS_QTY_BELOW, STOCK_OPTIONS } from '../../constants/m2'
import { Tooltip } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'

const useStyles = makeStyles(theme => ({
  prodContainer: {
    backgroundColor: '#FFF',
    borderRadius: '1px',
    padding: '15px 10px 10px',
    height: '30em',
    width: '20em',
    [theme.breakpoints.down('sm')]: {
      height: '30em',
      width: '12.2em',
      marginRight: '1rem',
      padding: '45px 10px',
    },
  },
  ultimos: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 10,
  },
  favourite: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 20,
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  envio: {
    position: 'absolute',
    zIndex: 1,
    top: 35,
    left: 0,
  },
  dosxuno: {
    position: 'absolute',
    zIndex: 1,
    top: 40,
    right: 10,
  },
  nuevo: {
    position: 'absolute',
    zIndex: 1,
    top: 220,
    left: 0,
    width: '100%',
  },
  cyberMonday: {
    position: 'absolute',
    zIndex: 2,
    top: 210,
    left: 0,
  },
  discount: {
    textAlign: 'center',
    fontSize: '0.8em',
    margin: '0 0 0 5px',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      right: -3,
      textAlign: 'right',
    },
  },
  link: {
    position: 'relative',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    minWidth: '180px',
    minHeight: '180px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '210px',
      minHeight: '210px',
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
    textAlign: 'center',
    textDecoration: 'line-through',
    marginTop: '5px',
  },
  priceOfferGreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: '1.5em',
    fontWeight: '800',
    color: '#0f9c6c',
    textAlign: 'center',
    marginButton: '10px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'start',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    height: '125px',
    textAlign: 'center',
    paddingTop: '7px',
    [theme.breakpoints.down('sm')]: {
      height: '165px',
    },
  },
  subtitle: {
    textTransform: 'uppercase',
    fontSize: '0.8em',
    textAlign: 'center',
    color: '#767677',
    fontWeight: '800',
    zIndex: 1,
  },
  spamStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

function ProductItem({ product, index, favouriteF }) {
  // Instances
  const priceObject = new Intl.NumberFormat('es-AR', {
    currency: 'ARS',
    style: 'currency',
  })

  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  // Selectors
  const { customerWishList } = useSelector(state => state.m2)
  const items = useSelector(state => state.m2.cart.items)
  const { isLogedInM2, isLogedInAuth0 } = useSelector(state => state.user)

  // States
  const [favourite, setFavourite] = useState(favouriteF)
  const [loading, setLoading] = useState(false)

  const { attributesMetadata, handleClickClose, open, setOpen } = useContext(Context)

  const cantidadAttr = attributesMetadata?.filter(x => x.attribute_code === 'cantidad')[0]

  useEffect(() => {
    setFavourite(favouriteF)
  }, [favouriteF])

  const handleFavourite = e => {
    e.preventDefault()
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

  const handleAdd = async () => {
    setLoading(true)

    const handleLoading = async () => {
      let item = {
        sku: product.sku,
        quantity: 1,
      }
      if (isNew(item)) {
        await dispatch(addItemToCart(item))
      } else {
        await updateCartItems(item)
      }
    }
    await handleLoading()
    setOpen(true)
    setLoading(false)
  }

  const isNew = item => {
    const found = items.find(it => it.product.sku === item.sku)
    return found === undefined
  }

  const updateCartItems = async item => {
    let newItems = items.filter(it => it.product.sku === item.sku)
    let addItem = newItems.length
      ? {
          id: newItems[0].id,
          quantity: newItems[0].quantity + 1,
        }
      : {
          cart_item_id: it.id,
          quantity: it.quantity,
        }

    await dispatch(updateItemsInCart(addItem))
  }

  const DosPorUno = () => (
    <>
      <h1
        style={{
          padding: 0,
          margin: 0,
          fontSize: '2em',
          height: '29%',
        }}
      >
        2x1
      </h1>
      <p
        style={{
          padding: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          marginInlineStart: 0,
          marginInlineEnd: 0,
          fontSize: '0.8em',
        }}
      >
        Lleva 2 cajas y paga 1
      </p>
    </>
  )

  return (
    <div
      key={`item-${index}`}
      id={`item-${index}`}
      className={classes.prodContainer}
      style={{ position: 'relative' }}
    >
      <Vbox alignItems="center">
        <ForwardThumbnail>
          <Link
            as={`/${product.sku}${product.url || `/p/${product.url_key}.html`}`}
            href={`/p/${product.sku}/${product.id}`}
          >
            <a>
              <>
                {product.qty <= CUCARDA_ULTIMOS_QTY_BELOW && product.qty > 0 ? (
                  <div className={classes.ultimos}>
                    <StyledCucarda
                      colour="#ff6e70"
                      width="80px"
                      height="20px"
                      text="Últimos"
                      style={{ paddingTop: '3px' }}
                    />
                  </div>
                ) : null}
                {product.envio_gratis ? (
                  <div className={classes.envio}>
                    <StyledCucarda
                      colour="black"
                      width="100px"
                      height="40px"
                      text="Envio gratis socios Bonvivir"
                    />
                  </div>
                ) : null}
                {false ? (
                  <div className={classes.cyberMonday}>
                    <StyledCucarda
                      colour="rgba(0, 0, 100, 0.6)"
                      width="80px"
                      height="20"
                      text="cyber Monday"
                    />
                  </div>
                ) : null}
                {product.new_from_date && product.new_to_date ? (
                  moment().isBetween(
                    moment(product.new_from_date),
                    moment(product.new_to_date),
                    'days',
                    '[]'
                  ) ? (
                    <div className={classes.nuevo}>
                      <StyledCucarda colour="rgba(0, 0, 0, 0.6)" height="20px" text="Nuevo" />
                    </div>
                  ) : null
                ) : null}
                {product.dos_por_uno ? (
                  <div className={classes.dosxuno}>
                    <StyledCucarda
                      className="dosxuno"
                      colour="green"
                      width="70px"
                      height="70px"
                      text={<DosPorUno />}
                    />
                  </div>
                ) : null}
                <div className={classes.favourite} onClick={handleFavourite}>
                  {favourite ? (
                    <FavoriteIcon style={{ width: '25px', height: '25px' }} />
                  ) : (
                    <FavoriteBorderIcon style={{ width: '25px', height: '25px' }} />
                  )}
                </div>
                <Image
                  height={isDesktop ? '220px' : '150px'}
                  width={isDesktop ? '220px' : '140px'}
                  src={product.image.url}
                  alt={product.thumbnail && product.thumbnail.alt}
                />
              </>
            </a>
          </Link>
          <div className={classes.info}>
            <div className={classes.subtitle}>
              {
                cantidadAttr?.attribute_options.find(x => x.value === product?.cantidad?.toString())
                  ?.label
              }
            </div>
            <EllipsisText
              style={{ margin: '0' }}
              mytext={product.name}
              maxlimit={50}
            ></EllipsisText>
            {product?.price_range?.maximum_price?.discount?.percent_off > 0 ||
            product?.price_range?.discount?.percent_off > 0 ? (
              <>
                <div className={classes.priceOffer}>
                  {priceObject.format(
                    product?.price_range?.maximum_price?.regular_price.value ||
                      product?.price_range?.regular_price.value
                  )}
                </div>
                <div className={classes.priceOfferGreen}>
                  {priceObject.format(
                    product?.price_range?.maximum_price?.final_price.value ||
                      product?.price_range?.final_price.value
                  )}
                  <div className={classes.discount}>
                    <StyledCucarda
                      className="oferta"
                      colour="#00bc8a"
                      width="40px"
                      text={`-${Math.trunc(
                        product?.price_range?.maximum_price?.discount?.percent_off
                      ) || Math.trunc(product?.price_range?.discount?.percent_off)}%`}
                      borderLeft="100px"
                      margin={'0 0 0 -7rem'}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Typography variant="h5">
                  {priceObject.format(
                    product.price_range?.maximum_price?.final_price.value ||
                      product.price_range?.final_price.value
                  )}
                </Typography>
              </>
            )}
          </div>
          <div className={classes.button}>
            {product.stock_status === STOCK_OPTIONS.OUT_OF_STOCK && product.qty === 0 ? (
              <Tooltip title="Sin stock">
                <span className={classes.spamStyle}>
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
            ) : (
              <Button
                loading={loading}
                margin="0"
                padding="0 30px"
                height="3.5em"
                width="70%"
                icon="add_shopping_cart"
                text="agregar"
                onClick={() => handleAdd()}
              />
            )}
          </div>
        </ForwardThumbnail>
      </Vbox>
    </div>
  )
}

export default memo(ProductItem)
