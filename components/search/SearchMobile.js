import React, { useState, memo, useEffect, useContext } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchDrawer from 'react-storefront/search/SearchDrawer'
import SearchButton from 'react-storefront/search/SearchButton'
import { searchProducts } from '../../services/Client/GraphQl/m2/GQLAPI'
import { Context } from '../../services/Client/context/Context'
import SearchResult from './SearchResult'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#762057',
  },
}))

function SearchMobile() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const closeDrawer = () => setDrawerOpen(false)
  const { productos, setProductos, handleClickClose } = useContext(Context)

  useEffect(() => {}, [productos])

  useEffect(() => {
    if (query.length > 3) {
      const delayDebounceFn = setTimeout(() => {
        const request = async () => {
          const result = await searchProducts({ filter: query })
          const { products } = result
          setProductos({
            items: products.items,
            isLoading: false,
          })
        }
        request()
      }, 1000)

      return () => clearTimeout(delayDebounceFn)
    } else {
      setProductos({
        items: [],
        isLoading: true,
      })
    }
  }, [query])


  const handleClick = () => {
    handleClickClose()
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <SearchButton onClick={() => handleClick()} />
      <SearchDrawer open={drawerOpen} onClose={closeDrawer}>
        <SearchForm>
          <SearchHeader classes={classes}>
            <SearchField
              submitButtonVariant="icon"
              placeholder="Buscar..."
              onChange={value => setQuery(value)}
              value={query}
            />
            {productos.items.length > 0 && (
              <SearchResult display={drawerOpen} products={productos} mobile={true} />
            )}
          </SearchHeader>
        </SearchForm>
      </SearchDrawer>
    </>
  )
}

export default memo(SearchMobile)
