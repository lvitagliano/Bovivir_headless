import React, { useState, memo, useEffect, useContext } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchDrawer from 'react-storefront/search/SearchDrawer'
import SearchButton from 'react-storefront/search/SearchButton'
import { searchProducts } from '../../services/Client/GraphQl/m2/GQLAPI'
import { Context } from '../../services/Client/context/Context'
import SearchResult from './SearchResult'

function SearchMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const closeDrawer = () => setDrawerOpen(false)

  const { productos, setProductos } = useContext(Context)

  useEffect(() => {}, [productos])

  useEffect(() => {
    if (query.length > 3) {
      const request = async () => {
        const result = await searchProducts({ filter: query })
        const { products } = result
        setProductos({
          items: products.items,
          isLoading: false,
        })
      }

      request()
    } else {
      setProductos({
        items: [],
        isLoading: true,
      })
    }
  }, [query])

  return (
    <>
      <SearchButton onClick={toggleDrawer} />
      <SearchDrawer open={drawerOpen} onClose={closeDrawer}>
        <SearchForm>
          <SearchHeader>
            <SearchField
              placeholder="Buscar..."
              onChange={value => setQuery(value)}
              value={query}
            />
            {productos.items.length > 0 && (
              <SearchResult display={drawerOpen} products={productos} />
            )}
          </SearchHeader>
        </SearchForm>
      </SearchDrawer>
    </>
  )
}

export default memo(SearchMobile)
