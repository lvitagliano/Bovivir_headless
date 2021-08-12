import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function SimpleMenu({ options, query }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [text, setText] = React.useState('Posición Descendente')

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e, sort) => {
    if (sort !== 'backdropClick') {
      setText(e.target.firstChild?.nodeValue)
      if (sort?.price) query({ sortPrice: sort.price })
      else query({ sort: sort, sortPrice: 'x' })
    }
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        style={{ boxShadow: 'none', backgroundColor: '#eeeeee', padding: '6px 16px' }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span style={{ fontWeight: 'bold', textTransform: 'none' }}>Ordenar</span>{' '}
        <span
          style={{
            color: 'rgba(0, 0, 0, 0.87)',
            marginLeft: '10px',
            fontSize: '0.75rem',
            textTransform: 'none',
          }}
        >
          {text}
        </span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={e => handleClose(e, { position: 'DESC' })}>
          Posición Descendente
        </MenuItem>
        <MenuItem onClick={e => handleClose(e, { position: 'ASC' })}>Posición Ascendente</MenuItem>
        <MenuItem onClick={e => handleClose(e, { name: 'DESC' })}>Nombre Descendente</MenuItem>
        <MenuItem onClick={e => handleClose(e, { name: 'ASC' })}>Nombre Ascendente</MenuItem>
        <MenuItem onClick={e => handleClose(e, { relevance: 'DESC' })}>
          Destacados Descendente
        </MenuItem>
        <MenuItem onClick={e => handleClose(e, { relevance: 'ASC' })}>
          Destacados Ascendente
        </MenuItem>
        <MenuItem onClick={e => handleClose(e, { price: 'DESC' })}>Precios Descendente</MenuItem>
        <MenuItem onClick={e => handleClose(e, { price: 'ASC' })}>Precios Ascendente</MenuItem>
      </Menu>
    </div>
  )
}
