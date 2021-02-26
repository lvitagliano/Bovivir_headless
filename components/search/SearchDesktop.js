import React, { useEffect, useState, useRef, useContext } from 'react'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import { searchProducts } from '../../services/Client/GraphQl/m2/GQLAPI'
import { Context } from '../../services/Client/context/Context'
import SearchResult from './SearchResult'

function SearchDesktop() {
  const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const { productos, setProductos } = useContext(Context)

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

  const handler = e => {
    if (e.key === 'Enter') {
      setPopoverOpen(false)
    }
  }

  return (
    <>
      <SearchForm>
        <SearchField
          ref={inputRef}
          onChange={value => setQuery(value)}
          value={query}
          onFocus={() => setPopoverOpen(true)}
          submitButtonVariant="none"
          showClearButton={false}
          placeholder="Buscar..."
          onKeyDown={handler}
        />
        {productos.items.length > 0 && <SearchResult display={popoverOpen} products={productos} />}
      </SearchForm>
    </>
  )
}

export default SearchDesktop
