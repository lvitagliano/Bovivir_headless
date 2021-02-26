/**
 * This component is an example of how we can fetch user-specific data for a product.
 * In general, it's a best practice to separate cacheable elements that are shown to all
 * users from areas of the page which contained information that should only be displayed
 * to a single user, such as recently viewed products and recommendations.  This separation
 * allows us to deliver most of the content from the CDN's cache and gives us the fastest
 * possible page load time.
 */

import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import fetch from 'react-storefront/fetch'
import ProductItem from './ProductItem'
import { Typography } from '@material-ui/core'
import LoadMask from 'react-storefront/LoadMask'
import Displayer from '../../components/Commons/Displayer'

export const styles = theme => ({
  products: {
    minHeight: 250,
    position: 'relative',
    margin: theme.spacing(0, -2),
    overflowX: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
    },
  },
  prodContainer :{
    backgroundColor: '#FFF',
    borderRadius: "5px",
    padding: '5px',
    maxWidth: '15em'
  },
  wrap: {
    padding: theme.spacing(0, 0, 0, 2),
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
  },
  product: {
    margin: theme.spacing(0, 2, 0, 0),
  },
})
const useStyles = makeStyles(styles, { name: 'RSFSuggestedProducts' })

export default function SuggestedProducts({ product }) {
  const classes = useStyles()

  return (
    <div>
      <Typography variant="h6" component="h3">
        Productos Sugeridos
      </Typography>
      <div className={classes.products}>
        <Displayer arrows={true} amount={4}>
         {product.relatedProducts?.map((product, i) => (
              <div className={classes.prodContainer}>
                <ProductItem
                  product={product}
                  index={i}
                  key={i}
                  colorSelector={false}
                  className={classes.product}
                  displayButton={false}
                />
              </div>
            ))}
        </Displayer>
      </div>
    </div>
  )
}

SuggestedProducts.propTypes = {
  /**
   * The product being displayed.
   */
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}
