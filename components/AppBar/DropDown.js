import React, { useState, useEffect } from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setWordPressURL } from '../../store/actions/wordpressAction'
import uuid from 'uuid'
import Link from 'next/link'

const DropDown = ({ items, idx }) => {
  const [ref, setRef] = useState(null)
  const [visRight, setVisRight] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (e, item) => {
    e.stopPropagation()
    if (item.wplink) {
      dispatch(setWordPressURL(item.wplink))
    } else if (item.href && item.as) {
      router.push(item.href, item.as)
    } else if (item.target) {
      window.open(item.href, item.target)
    }
  }

  useEffect(() => {
    if (ref) {
      if (ref.getBoundingClientRect().right > window.innerWidth) {
        setVisRight(false)
      }
    }
  }, [ref, setVisRight])

  return (
    <ul ref={setRef} className={`sub-menu ${!visRight ? 'display-left' : ''}`}>
      {items.map((item, i) => {
        return (
          < li key={uuid()} >
            {!item.items && (
              <a onClick={e => handleClick(e, item)}>
                {visRight ? (
                  <div style={{ marginRight: '10px' }}>{item.text}</div>
                ) : (
                  <div style={{ marginRight: '10px', textAlign: 'right' }}>{item.text}</div>
                )}
              </a>
            )}
            {item.items && (
              <>
                {visRight ? (
                  <a
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <div style={{ marginRight: '10px' }}>{item.text}</div>
                    <ArrowRightIcon />
                  </a>
                ) : (
                  <a
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <ArrowLeftIcon />
                    <div style={{ marginRight: '10px', textAlign: 'right' }}>{item.text}</div>
                  </a>
                )}
                <input type="checkbox" id="sm" />
                <DropDown items={item.items} index={idx * 100} />
              </>
            )}
          </li>
        )
      })
      }
    </ul >
  )
}

export default DropDown
