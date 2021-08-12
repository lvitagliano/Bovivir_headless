import React, { useEffect, useState } from 'react'
import { Container, Slider, ChevronRightIconCircle, ChevronLeftIconCircle } from './styles'
import useWindowWidth from '../../utils/hooks/useWindowWidth'
import uuid from 'uuid'

const Displayer = ({ children, min, amount, oneArrow, spaceBetweenArrows, disableMinHeight }) => {
  const { width } = useWindowWidth(0)
  const [increment, setIncrement] = useState(1)
  const [indexes, setIndexes] = useState({ left: 0, right: amount })
  const [direction, setDirection] = useState('right')
  const [displayElems, setDisplayElems] = useState([])

  useEffect(() => {
    //behaves like a media query
    if (width < 600) {
      setIncrement(1)
      setIndexes({ ...indexes, right: indexes.left + min })
    } else {
      setIncrement(1)
      setIndexes({ ...indexes, right: indexes.left + amount })
    }
  }, [width])

  const handleClickLeft = () => {
    setDirection('right')
    if (indexes.left - increment >= 0)
      setIndexes({ left: indexes.left - increment, right: indexes.right - increment })
    else {
      const length = children.length
      setIndexes({ left: length - amount, right: length })
    }
  }

  const handleClickRight = () => {
    setDirection('left')
    if (children[indexes.right]) {
      setIndexes({ left: indexes.left + increment, right: indexes.right + increment })
    } else {
      setIndexes({ left: 0, right: amount })
    }
  }

  useEffect(() => {
    setDisplayElems(children?.filter((child, i) => indexes.left <= i && i < indexes.right))
  }, [indexes.left, indexes.right])

  return (
    <Container style={{ margin: '0 0 20px 0', height: !disableMinHeight && '445px' }}>
      <Slider spaceBetweenArrows={spaceBetweenArrows} disableMinHeight={disableMinHeight}>
        {displayElems?.map((child, i) => {
          return (
            <div key={uuid()} className={amount > 1 ? `fade-in` : `slide-${direction}`}>
              {child}
            </div>
          )
        })}
      </Slider>
      <ChevronLeftIconCircle
        style={{ display: oneArrow ? 'none' : '', width: '50px', height: '50px' }}
        onClick={handleClickLeft}
        className="arrow-left arrow-icon"
      />
      <ChevronRightIconCircle
        style={{ width: '50px', height: '50px' }}
        onClick={handleClickRight}
        className="arrow-right arrow-icon"
      />
    </Container>
  )
}

Displayer.defaultProps = {
  amount: 1,
  min: 1,
}

export default Displayer
