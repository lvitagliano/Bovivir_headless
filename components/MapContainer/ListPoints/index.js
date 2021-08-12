import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '../../Commons/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  div: {
    overflowY: 'scroll',
    maxHeight: '65vh',
    padding: 2,
  },
  root: {
    minWidth: 275,
    margin: 6,
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 0,
  },
  search: {
    margin: 6,
    '& input + fieldset': {
      borderColor: '#c5c5c5',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderColor: ' #762057',
    },
  },
})

const index = ({ points, handleMap, handleChangeFilter, search, setSearch, handleSelectPoint }) => {
  const classes = useStyles()

  const handlerClick = e => {
    handleMap(e)
  }

  const handleSearch = value => {
    setSearch(value)

    handleChangeFilter(value)
  }

  const handleSelected = value => {
    handleSelectPoint(value)
  }

  const renderCards = puntos => {
    return (
      <>
        <div className={classes.search}>
          <TextField
            id="outlined-search"
            fullWidth
            value={search}
            placeholder="Buscar..."
            type="search"
            variant="outlined"
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          {puntos.map((point, index) => {
            return (
              <Card key={index} className={classes.root}>
                <CardContent style={{ marginBottom: '-10px' }}>
                  <Typography className={classes.title}>{point.name}</Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {point.full_address}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {point.city}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Cod. Postal: {point.zip_code}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    type="button"
                    width="50%"
                    style={{ display: 'flex' }}
                    onClick={() => handleSelected(point)}
                    text="Seleccionar"
                  />
                  <Button
                    type="button"
                    onClick={() => handlerClick(point)}
                    width="50%"
                    style={{
                      display: 'flex',
                      backgroundColor: '#b3b3b3',
                    }}
                    text="Ver en el mapa"
                  />
                </CardActions>
              </Card>
            )
          })}
        </div>
      </>
    )
  }

  return <>{renderCards(points)}</>
}

export default index
