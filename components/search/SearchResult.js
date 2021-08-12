import React, { useEffect, useState } from 'react'
import Link from 'react-storefront/link/Link'

const SearchResult = ({ display, products, mobile = false }) => {
  const [open, setOpen] = useState(display)
  const { isLoading, items } = products
  useEffect(() => {}, [isLoading])

  const renderconst = () => {
    return (
      <div
        style={{
          display: !open ? 'none' : 'block',
          position: `${!mobile && 'fixed'}`,
          zIndex: `${!mobile && '9999'}`,
          width: `${!mobile && '35rem'}`,
          marginTop: `${mobile ? '1rem' : '46px'}`,
          marginLeft: `${!mobile && '-280px'}`,
          color: 'rgb(138 131 131)',
          borderRadius: '2px',
          padding: '5px',
          boxShadow: '6px 6px 10px 1px rgb(0 0 0 / 10%)',
          backgroundColor: 'rgb(255, 255, 255, 0.6)',
          maxHeight: `${mobile ? '84.2vh' : '280px'}`,
          overflow: 'auto',
        }}
      >
        <div>
          {items?.map((product, i) => (
            <div key={i}>
              <Link
                as={`/${product.sku}${product.url || `/p/${product.url_key}.html`}`}
                href={`/p/${product.sku}/${product.id}`}
                prefetch="visible"
                onClick={() => setOpen(false)}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '0.5px outset',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    padding: '10px',
                    boxShadow: '6px 6px 10px 1px rgb(0 0 0 / 10%)',
                    margin: '1.5px 0',
                    alignItems: 'flex-end',
                  }}
                >
                  <img src={product.image.url} width="50" height="50" />
                  <div>{product.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return renderconst()
}

export default SearchResult
