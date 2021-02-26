import { useState, useCallback, useEffect } from 'react'
import { Paper, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import Row from 'react-storefront/Row'
import Link from 'react-storefront/link/Link'
import QuantitySelector from 'react-storefront/QuantitySelector'
import { Hbox } from 'react-storefront/Box'
import Image from 'react-storefront/Image'
import RemoveDialog from './RemoveDialog'
import { debounce } from '../utils/utils'

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing(2, 5, 2, 2),
    marginBottom: theme.spacing(2),
    position: 'relative',
  },
  thumb: {
    marginRight: theme.spacing(2),
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
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

export default function CartItem({ product, updateCart, remove }) {
  const [open, setOpen] = React.useState(false)
  const [qty, setQty] = useState(product.quantity)
  const classes = useStyles()
  const delayedChange = useCallback(
    debounce(q => updateCart({ ...product, quantity: q }), 750),
    []
  )
  const price = new Intl.NumberFormat('de-DE').format(product.prices.price.value || 0)

  const handleRemove = product => {
    remove(product)
  }

  const handleChange = value => {
    setQty(value)
    delayedChange(value)
  }
  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Hbox alignItems="flex-start">
          <div className={classes.thumb}>
            <Image src={product.product.thumbnail.url} fill aspectRatio={1} quality={50} />
          </div>
          <div className={classes.info}>
            <Link
              as={product.product.url}
              href={`/p/${product.product.sku}`}
              prefetch="visible"
              pageData={{ product }}
            >
              <a>
                <Typography variant="subtitle1">{product.product.name}</Typography>
              </a>
            </Link>
            <Row>
              <Typography variant="h6">{`$ ${price}`} </Typography>
            </Row>
            <Row>
              <Typography>Cantidad:</Typography>
              <QuantitySelector value={qty} onChange={handleChange} />
            </Row>
          </div>
        </Hbox>
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
}
