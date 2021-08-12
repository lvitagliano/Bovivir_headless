import React from 'react'
import SearchDesktop from './SearchDesktop'
import SearchMobile from './SearchMobile'
import { useTheme } from '@material-ui/core/styles'
import Spacer from 'react-storefront/Spacer'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'

function Search() {
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  return (
    <>
      {!isDesktop ? (
        <SearchMobile />
      ) : (
        <>
          <Spacer />
          <SearchDesktop />
        </>
      )}
    </>
  )
}

export default Search
