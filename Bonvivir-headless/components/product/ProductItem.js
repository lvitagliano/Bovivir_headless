import React, { memo, useCallback, useState } from 'react'
import Link from 'react-storefront/link/Link'
import { Vbox } from 'react-storefront/Box'
import { makeStyles } from '@material-ui/core/styles'
import ForwardThumbnail from 'react-storefront/ForwardThumbnail'
import Image from 'react-storefront/Image'
import clsx from 'clsx'
import Button from '../Commons/Button'
import EllipsisText from '../../components/Commons/EllipsisText'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, updateItemsInCart } from '../../store/actions/m2Action'
import { debounce } from '../utils/utils'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { StyledCucarda, CustomCucarda } from './styles'
import { setCustomerWishList } from '../../store/actions/m2Action'

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(2)}px 0`,
  },
  thumbnail: {
    marginBottom: theme.spacing(1),
  },
  ultimos: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  envio: {
    position: 'absolute',
    left: 0,
    top: '25px',
    zIndex: 1,
  },
  cyberMonday: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  nuevo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  dosxuno: {
    position: 'absolute',
    top: 20,
    right: 0,
    zIndex: 1,
  },
  discount: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: '0.8em',
    bottom: 5,
    right: 10,
    zIndex: 1,
  },
  favourite: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 1,
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    cursor: 'pointer',
    minWidth: '180px',
    minHeight: '180px',
    [theme.breakpoints.up('sm')]: {
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
    position: 'relative',
    width: '100%',
    fontSize: '1.5em',
    fontWeight: '800',
    color: '#0f9c6c',
    textAlign: 'center',
    marginButton: '10px',
  },
  button: {
    bottom: '0',
    display: 'flex',
    position: 'absolute',
    fontSize: '1.5em',
    textAlign: 'center',
    margin: '5px',
    marginTop: '10px',
    fontWeight: '800',
  },
  reviews: {
    marginTop: '5px',
  },
  reviewCount: {
    marginLeft: '2px',
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
    textAlign: 'center',
    maxHeight: '5em',
    minHeight: '61px',
    marginTop: '-1em',
    marginButtom: '10px',
  },
}))

function ProductItem({ product, index, classes, className }) {
  classes = useStyles({ classes })
  const dispatch = useDispatch()
  const { customerWishList } = useSelector(state => state.m2)
  const [favourite, setFavourite] = useState(false)
  const items = useSelector(state => state.m2.cart.items)

  const handleAddDebounced = useCallback(
    debounce(() => {
      addFn()
    }, 750),
    []
  )

  const handleFavourite = e => {
    e.stopPropagation()
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
  }

  const cucardas = ['ultimos', 'envio', 'cyberMonday', 'nuevo', 'dosxuno']

  const handleAdd = () => {
    handleAddDebounced()
  }

  const addFn = () => {
    let item = {
      sku: product.sku,
      quantity: 1,
    }
    if (isNew(item)) {
      dispatch(addItemToCart(item))
    } else {
      updateCartItems(item)
    }
  }

  const isNew = item => {
    const found = items.find(it => it.product.sku === item.sku)
    return found === undefined
  }

  const updateCartItems = item => {
    let newItems = items.map(it => {
      if (it.product.sku === item.sku) {
        return {
          cart_item_id: it.id,
          quantity: it.quantity + 1,
        }
      } else {
        return {
          cart_item_id: it.id,
          quantity: it.quantity,
        }
      }
    })
    dispatch(updateItemsInCart(newItems))
  }

  const Cucarda = ({ colour, text, height, width, borderLeft, ...props }) => {
    return (
      <div
        style={{
          backgroundColor: `${colour}`,
          width: `${width}`,
          height: `${height}`,
          fontSize: '0.9em',
          color: 'white',
          textAlign: 'center',
          borderLeft: `${borderLeft}`,
        }}
      >
        {text}
      </div>
    )
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
    <div id={`item-${index}`} className={clsx(className, classes.root)}>
      <Vbox alignItems="center">
        <ForwardThumbnail>
          <Link
            as={product.url}
            href="/p/[productId]"
            className={classes.link}
            prefetch="visible"
            pageData={{ product }}
          >
            <div className={classes.thumbnail}>
              {cucardas.includes('ultimos') ? (
                <div className={classes.ultimos}>
                  <StyledCucarda
                    colour="#ff6e70"
                    width="80px"
                    height="20px"
                    text="Ultimos"
                    className="ultimos"
                    position="absolute"
                    left="-6px"
                    top="-7px"
                  />
                </div>
              ) : null}
              {cucardas.includes('envio') ? (
                <div className={classes.envio}>
                  <StyledCucarda
                    colour="black"
                    width="100px"
                    height="40px"
                    text="Envio gratis socios Bonvivir"
                    className="envio"
                    position="absolute"
                    left="-6px"
                  />
                </div>
              ) : null}
              {cucardas.includes('cyberMonday') ? (
                <div className={classes.cyberMonday}>
                  <Cucarda
                    colour="rgba(0, 0, 100, 0.6)"
                    width="80px"
                    height="20"
                    text="cyber Monday"
                  />
                </div>
              ) : null}
              {cucardas.includes('nuevo') ? (
                <div className={classes.nuevo}>
                  <Cucarda colour="rgba(0, 0, 0, 0.6)" width="210px" height="20px" text="Nuevo" />
                </div>
              ) : null}
              {cucardas.includes('dosxuno') ? (
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
                  <FavoriteIcon style={{ width: '20px', height: '20px' }} />
                ) : (
                  <FavoriteBorderIcon style={{ width: '20px', height: '20px' }} />
                )}
              </div>
              <Image
                src={product.thumbnail && product.thumbnail.src}
                // src="/images/templateWine.png"
                alt={product.thumbnail && product.thumbnail.alt}
                optimize={{ maxWidth: 200 }}
                lazy={index >= 4 && index < 20 ? 'ssr' : false}
                aspectRatio={1}
              />
            </div>
          </Link>
          <div className={classes.info}>
            <div className={classes.subtitle}>3 BOTELLAS</div>
            <div className={classes.name}>
              <EllipsisText mytext={product.name} maxlimit={50}></EllipsisText>
            </div>
            {product.discount !== '-0%' || true ? (
              <>
                <div className={classes.priceOffer}>{product.regular_price}</div>
                <div className={classes.priceOfferGreen}>
                  {product.final_price}
                  <div className={classes.discount}>
                    <StyledCucarda
                      className="oferta"
                      colour="#00bc8a"
                      width="40px"
                      height="19px"
                      text={product.discount}
                      borderLeft="100px"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className={classes.price}>{product.regular_price}</div>
            )}
            <div className={classes.button}>
              <Button
                width="80%"
                icon="add_shopping_cart"
                text="agregar"
                onClick={handleAdd}
                style={{ margin: 'auto' }}
              ></Button>
            </div>
          </div>
        </ForwardThumbnail>
      </Vbox>
    </div>
  )
}

ProductItem.defaultProps = {
  colorSelector: true,
  displayButton: true,
}

export default memo(ProductItem)
