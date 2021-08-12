import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OutlineGrey, Content, TitleContent } from './styles'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerWishList } from '../../store/actions/m2Action'
import RemoveDialog from '../Commons/RemoveDialog'
import Button from '../Commons/Button'
import { Context } from '../../services/Client/context/Context'
import { addItemToCart } from '../../store/actions/m2Action'
import Link from 'react-storefront/link/Link'

const useStyles = makeStyles(theme => ({
  hover: {
    '&:hover': {
      // transform: 'scale(1.05)',
      // transition: 'transform 1s',
      border: '1px solid rgb(71 72 74)',
    },
  },
}))

export default function WishList({ title }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { customerWishList } = useSelector(state => state.m2)
  const [items, setItems] = useState(customerWishList?.items)
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(null)
  const { setOpen } = useContext(Context)

  const handleAdd = async (event, prodandqty) => {
    let newItem = {
      sku: prodandqty.sku,
      quantity: prodandqty.quantity,
    }
    await dispatch(addItemToCart(newItem)).then(r => setOpen(true))
  }

  useEffect(() => {
    setItems(customerWishList?.items)
  }, [customerWishList])

  return (
    <>
      <h3 style={{ color: '#47484A' }}>{title}</h3>
      <TitleContent justifyContent="space-around">
        <span style={{ color: '#BEBEBF', maxWidth: '25%' }}>Item</span>
        <span style={{ color: '#BEBEBF', maxWidth: '25%' }}>Descripción</span>
        <span style={{ color: '#BEBEBF', maxWidth: '25%' }}>Precio</span>
        <span></span>
      </TitleContent>

      {items?.map((prod, i) => {
        return (
          <OutlineGrey key={i} className={classes.hover}>
            <Link
              as={`/${prod.product.sku}${prod.product.url || `/p/${prod.product.url_key}.html`}`}
              href={`/p/${prod.product.sku}/${prod.product.id}`}
              prefetch="visible"
              onClick={() => setOpen(false)}
            >
              <div style={{ display: 'flex', cursor: 'pointer' }}>
                <Content flexDirection="column">
                  <img src={prod.product.small_image.url} height="100" />
                </Content>
                <Content flexDirection="column">{prod.product.name}</Content>
                <Content flexDirection="column">
                  $ {prod.product.price_range.maximum_price.regular_price.value}
                </Content>
              </div>
            </Link>
            <Content paddingBottom="4em">
              <Button
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#7B7D81',
                  margin: '5px 0 0 60px',
                }}
                bold
                icon="add_shopping_cart"
                onClick={e => handleAdd(e, { sku: prod.product.sku, quantity: 1 })}
              />
              <IconButton
                onClick={() => {
                  setValue(prod.id), setOpenModal(true)
                }}
              >
                <CloseIcon style={{ cursor: 'pointer' }} />
              </IconButton>
            </Content>
            <RemoveDialog
              open={openModal}
              setOpen={setOpenModal}
              textos={{ title: 'Favoritos', text: '¿Estás seguro que deseas eliminar?' }}
              action={() =>
                dispatch(
                  setCustomerWishList('REMOVE', {
                    wishlistId: customerWishList?.id,
                    wishlistItemsIds: [value],
                  })
                ).then(setOpenModal(false))
              }
            />
          </OutlineGrey>
        )
      })}
    </>
  )
}
