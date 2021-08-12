import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MarqueeContent, Marquee } from './styles'
import uuid from 'uuid'

const MarqueeDisplayer = ({ items, arrows, stepper, autoPlay }) => {
  let refsArr = []
  const [itemDim, setItemDim] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setItemDim({
      width: refsArr[0].getBoundingClientRect().width,
      height: refsArr[0].getBoundingClientRect().height,
    })
  }, [])

  const setRef = (ref, i) => {
    refsArr[i] = ref
  }

  return (
    <Marquee>
      <MarqueeContent elemWidth={itemDim.width || 220} numElems={items.length}>
        {[...items, ...items].map((item, i) => (
          <li key={i} ref={ref => setRef(ref, i)}>
            {item}
          </li>
        ))}
      </MarqueeContent>
    </Marquee>
  )
}

MarqueeDisplayer.propTypes = {
  items: PropTypes.array.isRequired,
  arrows: PropTypes.bool,
  stepper: PropTypes.string,
}

MarqueeDisplayer.defaultProps = {
  items: [],
  autoPlay: 0,
}

export default MarqueeDisplayer
