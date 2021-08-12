import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { useState, useEffect } from 'react'

const useStyles = makeStyles({})

export default function CategoriesFilters({ query, filters, hasFilter }) {
  const classes = useStyles()
  const [VinoBodega, setVinoBodega] = useState([])
  const [VinoCepa, setVinoCepa] = useState([])
  const [VinoVariedad, setVinoVariedad] = useState([])
  const [checked, setchecked] = useState()

  useEffect(() => {
    if (!hasFilter) {
      setVinoBodega([])
      setVinoCepa([])
      setVinoVariedad([])
      setchecked(false)
    }
  }, [hasFilter])

  const handlerClick = (optionSelected, category, i) => {
    let index

    switch (true) {
      case category === 'vino_bodega':
        index = VinoBodega.indexOf(optionSelected)
        index === -1 ? VinoBodega.push(optionSelected) : VinoBodega.splice(index, 1)
        break
      case category === 'vino_cepa':
        index = VinoCepa.indexOf(optionSelected)
        index === -1 ? VinoCepa.push(optionSelected) : VinoCepa.splice(index, 1)
        break
      case category === 'vino_variedad':
        index = VinoVariedad.indexOf(optionSelected)
        index === -1 ? VinoVariedad.push(optionSelected) : VinoVariedad.splice(index, 1)
        break
    }
    query({ VinoBodega, VinoCepa, VinoVariedad })
  }

  const isChecked = (optionSelected, category) => {
    let is

    if (category === 'vino_bodega') {
      is = VinoBodega.includes(optionSelected)
    } else if (category === 'vino_cepa') {
      is = VinoCepa.includes(optionSelected)
    } else if (category === 'vino_variedad') {
      is = VinoVariedad.includes(optionSelected)
    }
    return is
  }

  return (
    <>
      {filters?.map((item, i) => {
        return (
          i > 1 && (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <b>{item.label}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    maxHeight: '18rem',
                    overflow: 'auto',
                  }}
                >
                  {item?.options?.map((option, i) => {
                    const check = isChecked(option.value, item.attribute_code, i)
                    return (
                      <div
                        key={i}
                        style={{ margin: '0.3rem 0.5rem ' }}
                        onClick={() => handlerClick(option.value, item.attribute_code, i)}
                      >
                        <FormControlLabel
                          control={<Checkbox checked={check} />}
                          label={
                            <>
                              <b style={{ fontSize: '0.8rem' }}>{option.label} ({option.count})</b>
                            </>
                          }
                          labelPlacement="end"
                        />
                      </div>
                    )
                  })}
                </div>
              </AccordionDetails>
            </Accordion>
          )
        )
      })}
    </>
  )
}
