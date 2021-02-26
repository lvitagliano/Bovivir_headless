import React, { useEffect, useState } from 'react'
import Link from 'react-storefront/link/Link'

const SearchResult = ({ display, products }) => {
  const [open, setOpen] = useState(display)
  const { isLoading, items } = products
  useEffect(() => {}, [isLoading])

  const renderconst = () => {
    return (
      <div
        style={{
          display: !open ? 'none' : 'block',
          position: 'fixed',
          zIndex: '9999',
          minHeight: '200px',
          width: '500px',
          marginTop: '45px',
          marginLeft: '-280px',
          backgroundColor: 'white',
          color: 'rgb(138 131 131)',
        }}
      >
        <ul>
          {items?.map(product => (
            <li>
              <Link
                as={product.url}
                href={`/p/${product.sku}`}
                prefetch="visible"
                onClick={() => setOpen(false)}
                pageData={{ product }}
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return renderconst()
}

export default SearchResult
