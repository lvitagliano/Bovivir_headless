import React from 'react'

const Columns = ({ menu }) => {
  return (
    <>
      {menu?.text && (
        <div style={{ textTransform: 'uppercase', margin: '1em 0 2em 5em' }}>
          <h5>{menu.text} </h5>
          <div>
            {menu.items?.map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '1em',
                }}
              >
                <a
                  target={item.target}
                  href={item.href}
                  style={{ textDecoration: 'none', fontSize: '0.8em', color: '#fff' }}
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Columns
