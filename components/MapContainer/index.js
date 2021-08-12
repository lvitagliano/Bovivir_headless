import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GoogleMap from './GoogleMap'
import ListPoints from './ListPoints'
import Grid from '@material-ui/core/Grid'
import { setShippingMethods } from '../../store/actions/m2Action'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '95%',
    backgroundColor: 'white',
    border: '1px solid #9c9898',
    boxShadow: 5,
    padding: '15px',
  },
})

const MapContainer = ({ points, handleClose, addressChange }) => {
  const classes = useStyles()
  const [mapper, setMapper] = useState(points[0])
  const [filteredCountries, setFilteredCountries] = useState(points)
  const [showingInfoWindow, setshowingInfoWindow] = useState(false)
  const [Search, setSearch] = useState('')
  const dispatch = useDispatch()

  const dispatcherMethod = async dis => {
    await dispatch(setShippingMethods(dis))
  }
  useEffect(() => {}, [mapper])

  useEffect(() => {}, [filteredCountries])

  const handleChangeFilter = value => {
    setFilteredCountries(
      points.filter(
        pointFilter =>
          pointFilter.name.toLowerCase().includes(value.toLowerCase()) ||
          pointFilter.full_address.toLowerCase().includes(value.toLowerCase()) ||
          pointFilter.zip_code.toLowerCase().includes(value.toLowerCase()) ||
          pointFilter.city.toLowerCase().includes(value.toLowerCase()) ||
          pointFilter.state.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleSelectPoint = val => {
    let hop = {
      hop_pickup_point_id: val.id,
    }
    let address = {
      country_id: 'AR',
      street: [val.street, val.door_number],
      telephone: val.phone,
      city: val.city,
      postcode: val.zip_code,
      email: val.email,
      firstname: val.name,
      lastname: val.reference_name,
      id: val.id,
    }
    addressChange(address)
    dispatcherMethod(hop)
    handleClose()
  }

  const handleMap = prop => {
    setMapper(prop)
    setshowingInfoWindow(true)
    setSearch(prop.name)
    handleChangeFilter(prop.name)
  }

  const renderAllMap = mapeo => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <ListPoints
            handleSelectPoint={handleSelectPoint}
            search={Search}
            setSearch={setSearch}
            points={filteredCountries}
            handleMap={handleMap}
            handleChangeFilter={handleChangeFilter}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <GoogleMap
            showingInfoWindow={showingInfoWindow}
            points={filteredCountries}
            point={mapeo}
            handleMap={handleMap}
          />
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <h2>SELECCIONA UN PUNTO DE ENTREGA</h2>

      {mapper && renderAllMap(mapper)}
    </div>
  )
}

export default MapContainer
