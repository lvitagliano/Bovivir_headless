import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react'
import { Container } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  div: {
    overflowY: 'scroll',
    maxHeight: '65vh',
    padding: 2,
  },
})

const GoogleMap = ({
  heightContainer = '500px',
  points,
  point,
  handleMap,
  showingInfoWindow,
  zoom = 14,
  style = { width: '60.5%', height: '500px' },
}) => {
  const [SelectPoint, setSelectPoint] = useState({
    lat: point.lat,
    lng: point.lng,
  })

  useEffect(() => {
    setSelectPoint({
      lat: point.lat,
      lng: point.lng,
    })
  }, [point])

  const onMarkerClick = props => {
    handleMap(props)
  }

  const renderMarker = pointss => {
    if (pointss) {
      return pointss
        .filter(punto => punto.name !== point.name)
        .map((filteredPoint, id) => (
          <Marker
            key={id}
            style={{ color: 'blue' }}
            onClick={() => onMarkerClick(filteredPoint)}
            title={filteredPoint.reference_name}
            name={filteredPoint.name}
            position={{ lat: filteredPoint.lat, lng: filteredPoint.lng }}
          ></Marker>
        ))
    }
  }

  const renderMap = punto => {
    return (
      <Map
        google={google}
        style={style}
        initialCenter={{ lat: SelectPoint.lat, lng: SelectPoint.lng }}
        className={'map'}
        zoom={zoom}
      >
        <Marker
          style={{ color: 'blue' }}
          onClick={() => onMarkerClick(punto)}
          title={punto.reference_name}
          name={punto.name}
          position={{ lat: SelectPoint.lat, lng: SelectPoint.lng }}
          icon={{
            url: '/images/location.png',
            anchor: new google.maps.Point(30, 42),
            scaledSize: new google.maps.Size(60, 60),
          }}
        ></Marker>

        {points && renderMarker(points)}

        <Circle
          radius={2000}
          center={{
            lat: parseFloat(SelectPoint.lat) || 0,
            lng: parseFloat(SelectPoint.lng) || 0,
          }}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#ffffff"
          fillOpacity={0.2}
        />
        <InfoWindow
          position={{ lat: parseFloat(SelectPoint.lat), lng: parseFloat(SelectPoint.lng) }}
          visible={showingInfoWindow}
        >
          <Grid container alignItems="center">
            <h1>{point.name}</h1>
            <h4>{point.full_address} </h4>
            <h4>
              {point.city} {point.state}
            </h4>
          </Grid>
        </InfoWindow>
      </Map>
    )
  }

  return <Container heightContainer={heightContainer}>{SelectPoint && renderMap(point)}</Container>
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDjsrsyQKSTzolUAaHtUDYkcGDB7oz7WYo',
})(GoogleMap)
