import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { OutlineGrey, Content, TitleContent } from './styles'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerWishList } from '../../store/actions/m2Action'

const useStyles = makeStyles(theme => ({
  hover: {
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 1s',
      border: '2px solid rgb(71 72 74)',
    },
  },
}))

export default function WishList({ title }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { customerWishList } = useSelector(state => state.m2)
  const [items, setItems] = useState(customerWishList?.items)

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
          <OutlineGrey className={classes.hover}>
            <Content flexDirection="column">
              <img src={prod.product.small_image.url} height="100" />
            </Content>
            <Content flexDirection="column">{prod.product.name}</Content>
            <Content flexDirection="column">
              $ {prod.product.price_range.maximum_price.regular_price.value}
            </Content>
            <Content paddingBottom="4em">
              <IconButton>
                <CloseIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    dispatch(
                      setCustomerWishList('REMOVE', {
                        wishlistId: customerWishList?.id,
                        wishlistItemsIds: [prod.id],
                      })
                    )
                  }
                />
              </IconButton>
            </Content>
          </OutlineGrey>
        )
      })}
    </>
  )
}
