import { useState, useCallback } from 'react'
import { Paper, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import Row from 'react-storefront/Row'
import Link from 'react-storefront/link/Link'
import QuantitySelector from 'react-storefront/QuantitySelector'
import Image from 'react-storefront/Image'
import RemoveDialog from './RemoveDialog'
import { debounce } from '../utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart, updateItemsInCart } from '../../store/actions/m2Action'
import { CUCARDA_ULTIMOS_QTY_BELOW } from '../../constants/m2'
import { StyledCucarda } from '../product/styles'

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing(2, 5, 2, 2),
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  thumb: {
    position: 'relative',
    marginRight: theme.spacing(2),
    width: 200,
    height: 160,
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
  },
  ultimos: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 10,
  },
  envio: {
    position: 'absolute',
    zIndex: 1,
    top: 35,
    left: 0,
  },
  cyberMonday: {
    position: 'absolute',
    zIndex: 2,
    top: 210,
    left: 0,
  },
  nuevo: {
    position: 'absolute',
    zIndex: 1,
    top: 220,
    left: 0,
    width: '100%',
  },
  dosxuno: {
    position: 'absolute',
    zIndex: 1,
    top: 40,
    right: 10,
  },
  label: {
    marginRight: theme.spacing(0.6),
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})

const useStyles = makeStyles(styles)
export default function CartItem({ product }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  // STATES
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(product.quantity)
  const [producto, setProducto] = useState(product)

  const price = new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency' }).format(
    product.prices.price.value || 0
  )

  // functions
  const handleRemove = item => {
    dispatch(removeItemFromCart(item))
  }
  const updateProduct = item => {
    dispatch(updateItemsInCart(item))
  }

  const delayedChange = useCallback(
    debounce(q => updateProduct({ ...product, quantity: q }), 750),
    []
  )

  const handleChange = value => {
    if (producto.product.stock_status === 'IN_STOCK') {
      if (value <= 5) {
        if (producto.product.qty >= value) {
          setQty(value)
          delayedChange(value)
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

  const paperRender = prodItem => {
    if (prodItem) {
      return (
        <>
          <Paper className={classes.root} elevation={0}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <div className={classes.thumb}>
                <Image
                  src={product.product.thumbnail.url}
                  fill
                  aspectRatio={1}
                  quality={50}
                  style={{ width: '6rem', margin: '0 0 0 15px' }}
                />
                {product.product.qty <= CUCARDA_ULTIMOS_QTY_BELOW && product.product.qty > 0 ? (
                  <div className={classes.ultimos}>
                    <StyledCucarda colour="#ff6e70" width="80px" height="20px" text="Ultimos" />
                  </div>
                ) : null}
                {product.product.envio_gratis ? (
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
                {product.product.new_from_date && product.product.new_to_date ? (
                  moment().isBetween(
                    moment(product.product.new_from_date),
                    moment(product.product.new_to_date),
                    'days',
                    '[]'
                  ) ? (
                    <div className={classes.nuevo}>
                      <StyledCucarda colour="rgba(0, 0, 0, 0.6)" height="20px" text="Nuevo" />
                    </div>
                  ) : null
                ) : null}
                {product.product.dos_por_uno ? (
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
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                <Link
                  as={`/${product.product.sku}${product.url ||
                    `/p/${product.product.url_key}.html`}`}
                  href={`/p/${product.product.sku}/${product.product.id}`}
                >
                  <a style={{ textDecoration: 'none', color: '#212121' }}>
                    <Typography variant="subtitle1" style={{ fontSize: '1em', fontWeight: 'bold' }}>
                      {product.product.name}
                    </Typography>
                  </a>
                </Link>
                <Row>
                  <Typography variant="h6">{price}</Typography>
                </Row>
              </div>
              <Row style={{ margin: '20px 0 0 10px', alignSelf: 'start' }}>
                <Typography style={{ fontSize: '1em' }}>Cantidad:</Typography>
                <QuantitySelector value={qty} onChange={handleChange} />
              </Row>
            </div>
            <IconButton className={classes.remove} onClick={() => setOpen(true)}>
              <CloseIcon />
            </IconButton>
          </Paper>
          <RemoveDialog
            open={open}
            setOpen={setOpen}
            name={product.name}
            action={() => handleRemove(product)}
          />
        </>
      )
    } else {
      return <></>
    }
  }

  return paperRender(producto)
}
