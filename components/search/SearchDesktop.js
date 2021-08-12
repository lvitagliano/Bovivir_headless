import React, { useEffect, useState, useRef, useContext } from 'react'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchButton from 'react-storefront/search/SearchButton'
import { Search as SearchIcon } from '@material-ui/icons'
import { searchProducts } from '../../services/Client/GraphQl/m2/GQLAPI'
import { Context } from '../../services/Client/context/Context'
import SearchResult from './SearchResult'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  hidden: {
    display: 'flex',
  },
  inputWrap: {
    flexDirection: 'row-reverse',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '10px',
  },
  input: {
    borderWidth: 0,
    padding: 0,
  },
}))

function SearchDesktop() {
  const classes = useStyles()
  const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const { productos, setProductos, handleClickClose } = useContext(Context)

  const handler = e => {
    if (e.key === 'Enter') {
      setPopoverOpen(false)
    }
  }

  const handleFocus = () => {
    setPopoverOpen(true)
    handleClickClose()
  }

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

  return (
    <>
      <SearchForm>
        <SearchField
          ref={inputRef}
          onChange={setQuery}
          value={query}
          onFocus={() => handleFocus()}
          submitButtonVariant="icon"
          // SubmitButtonIcon={SearchIcon}
          // SubmitButtonComponent={SearchButton}
          showClearButton={false}
          placeholder="Buscar..."
          onKeyDown={handler}
          classes={classes}
        />
        {productos.items.length > 0 && <SearchResult display={popoverOpen} products={productos} />}
      </SearchForm>
    </>
  )
}

export default SearchDesktop
