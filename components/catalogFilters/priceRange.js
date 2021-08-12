import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}))

const PriceSlider = withStyles({
  root: {
    color: '#762057',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: 'currentColor',
    border: '1px solid currentColor',
    marginTop: -5,
    marginLeft: -5,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:hover': {
      boxShadow: '0px 0px 0px 8px rgb(63 81 181 / 16%);',
    },
  },
  track: {
    height: 4,
  },
  rail: {
    borderRadius: '2px',
    opacity: 0.38,
    height: 4,
    backgroundColor: 'currentColor',
  },
})(Slider)

export default function RangeSlider({ query, data }) {
  const classes = useStyles()
  const [products, setProducts] = React.useState(data)
  const [valueSlider, setValueSlider] = React.useState([])
  const [value, setValue] = React.useState(valueSlider)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeUp = (event, newValue) => {
    query({ MinPrice: newValue[0], MaxPrice: newValue[1] })
  }

  useEffect(() => {
    setProducts(data)
  }, [data])

  useEffect(() => {
    products.sort(function(a, b) {
      return (
        a?.price_range.maximum_price.final_price.value -
        b?.price_range.maximum_price.final_price.value
      )
    })
    setValueSlider([
      products[0]?.price_range.maximum_price.final_price.value,
      products[products.length - 1]?.price_range.maximum_price.final_price.value,
    ])
    setValue([
      products[0]?.price_range.maximum_price.final_price.value,
      products[products.length - 1]?.price_range.maximum_price.final_price.value,
    ])
  }, [products])

  return (
    Object.keys(data).length > 0 && (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <b>Precio</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '95%',
              justifyContent: 'space-around',
              minHeight: '6rem',
            }}
          >
            <PriceSlider
              min={valueSlider[0]}
              max={valueSlider[1]}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleChangeUp}
              valueLabelDisplay="auto"
            />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <b style={{ fontSize: '0.8rem' }}>Mínimo</b>
              <span style={{ fontSize: '0.8rem' }}>${value[0]}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <b style={{ fontSize: '0.8rem' }}>Máximo</b>
              <span style={{ fontSize: '0.8rem' }}>${value[1]}</span>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    )
  )
}
