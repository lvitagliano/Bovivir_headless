import Subcategory from './s/[subcategoryId]'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'

Subcategory.getInitialProps = createLazyProps(opts => {
  if(opts.asPath.split('?')[1]){
    opts.asPath = `/search?${opts.asPath.split('?')[1]}`
  }
  return fetchFromAPI(opts)
})

export default Subcategory
