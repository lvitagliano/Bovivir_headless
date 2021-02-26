import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Slider, Item, Stepper, StepperCircle, StepperButton } from './styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Banner from '../../Commons/Banner'

const Steps = ({ stepper, items, activeStep, setActiveStep, setX }) => {
  const handleCircleClick = step => {
    setActiveStep(step)
    setX(step * -100)
  }

  if (stepper === 'circle') {
    return (
      <Stepper>
        {items.map((item, i) => (
          <StepperCircle
            key={`sc${i}`}
            data-testid={`step${i}`}
            className={activeStep === i ? 'active' : ''}
            onClick={() => {
              handleCircleClick(i)
            }}
          />
        ))}
      </Stepper>
    )
  } else if (stepper === 'button') {
    return (
      <Stepper>
        {items.map((item, i) => (
          <StepperButton
            key={`sc${i}`}
            data-testid={`step${i}`}
            className={activeStep === i ? 'active' : ''}
            onClick={() => {
              handleCircleClick(i)
            }}
          >
            {item.cf_home_carrousel_banners.banner.label}
          </StepperButton>
        ))}
      </Stepper>
    )
  }
  return null
}

const Carousel = ({ items, arrows, stepper, autoPlay }) => {
  const [x, setX] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const handleClickLeft = () => {
    if (items.length && 0 === x) {
      setX((items.length - 1) * -100) //retorno al ultimo
      setActiveStep(items.length - 1)
    } else {
      setX(x + 100)
      setActiveStep((Math.abs(x) - 100) / 100)
    }
  }

  const handleClickRight = () => {
    if (items.length && (items.length - 1) * -100 === x) {
      setX(0) //retorno al inicio
      setActiveStep(0)
    } else {
      setX(x - 100)
      setActiveStep((Math.abs(x) + 100) / 100)
    }
  }

  useEffect(() => {
    if (autoPlay) {
      let timer = setInterval(() => {
        if (items.length && (items.length - 1) * -100 === x) {
          setX(0) //retorno al inicio
          setActiveStep(0)
        } else {
          setX(x - 100)
          setActiveStep((Math.abs(x) + 100) / 100)
        }
      }, autoPlay)
      return () => clearInterval(timer)
    }
  }, [activeStep])

  return (
    <Container>
      <Slider>
        {items.map((item, i) => (
          <Item
            key={`item${i}`}
            data-testid={`item${i}`}
            style={{ transform: `translateX(${x}%)` }}
          >
            <Banner bannerinfo={item.cf_home_carrousel_banners.banner} />
          </Item>
        ))}
      </Slider>
      {arrows && <ChevronLeftIcon onClick={handleClickLeft} className="arrow-left arrow-icon" />}
      {arrows && <ChevronRightIcon onClick={handleClickRight} className="arrow-right arrow-icon" />}
      {stepper && (
        <Steps
          items={items}
          stepper={stepper}
          activeStep={activeStep}
          setX={setX}
          setActiveStep={setActiveStep}
        />
      )}
    </Container>
  )
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  arrows: PropTypes.bool,
  stepper: PropTypes.string,
}

Carousel.defaultProps = {
  items: [],
  autoPlay: 0,
}

export default Carousel
