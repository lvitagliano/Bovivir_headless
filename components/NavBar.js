import React, { Fragment, memo, useEffect, useState } from 'react'
import axios from 'axios'
import NavTab from 'react-storefront/nav/NavTab'
import NavTabs from 'react-storefront/nav/NavTabs'
import Link from 'react-storefront/link/Link'
import { Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    marginTop: '65px',
    marginBottom: '0px',
  },
  link: {
    display: 'block',
    textShadow: 'none',
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0,
    },
  },
}))

function NavBar({ tabs }) {
  const classes = useStyles()
  const [menuBon, setMenuBon] = useState({
    as: '/bonvivir',
    href: '/',
    text: 'BONVIVIR',
    items: [],
  })
  const [menuWP, setMenuWP] = useState({
    as: '/wordpress',
    href: '/wordpress',
    text: 'CLUB',
    items: [],
    isLoading: true,
  })
  const [menuTienda, setMenuTienda] = useState({
    as: '/tienda',
    href: '/',
    text: 'TIENDA',
    items: [
      {
        ID: 'vinos',
        as: '/tienda/vinos',
        href: '/tienda/vinos',
        text: 'Vinos',
        title: 'Vinos',
      },
    ],
    isLoading: true,
  })
  const wp = `https://qa.bonvivir.com/wp-json/menus/v1/menus/menu`

  function getMenuWordpressAsync() {
    return fetch(wp)
      .then(response => response.json())
      .then(responseJson => {
        setMenuWP({ ...menuWP, items: responseJson.items, isLoading: false })
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  useEffect(() => {
    getMenuWordpressAsync()
  }, [])

  const capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const splits = url => {
    let res = url.split('/')
    let base = res[res.length - 2]
    return base
  }

  return (
    <Paper square elevation={2}>
      <Container maxWidth="lg" className={classes.container}>
        {!menuWP.isLoading &&
          tabs.unshift(menuTienda) &&
          tabs.unshift(menuWP) &&
          tabs.unshift(menuBon) && (
            <NavTabs>
              {tabs &&
                tabs.map(tab => (
                  <NavTab
                    key={tab.as}
                    href={tab.href}
                    as={tab.as}
                    label={tab.text}
                    prefetch="visible"
                  >
                    {tab.items && tab.items.length > 0 && (
                      <div style={{ padding: 20 }}>
                        {tab.items
                          .filter(subcategory => subcategory.title !== 'Tienda')
                          .filter(subcategory => subcategory.title !== 'DEGUSTACIONES')
                          .map(subcategory => (
                            <Link
                              key={subcategory.ID}
                              href={subcategory.href ? subcategory.href : 'wordpress'}
                              key={subcategory.as ? subcategory.as : splits(subcategory.url)}
                              as={subcategory.as ? subcategory.as : splits(subcategory.url)}
                              className={classes.link}
                            >
                              {subcategory.child_items ? (
                                <div>
                                  {capitalize(subcategory.title.toLowerCase())}
                                  <ul>
                                    {subcategory.child_items.map(item => (
                                      <Link
                                        key={item.ID}
                                        href={item.href ? item.href : 'wordpress'}
                                        key={item.as ? item.as : item.title.toLowerCase()}
                                        as={item.as ? item.as : item.title.toLowerCase()}
                                        className={classes.link}
                                      >
                                        {item.title
                                          ? capitalize(item.title.toLowerCase())
                                          : capitalize(item.post_title.toLowerCase())}
                                      </Link>
                                    ))}
                                  </ul>
                                </div>
                              ) : subcategory.title ? (
                                capitalize(subcategory.title.toLowerCase())
                              ) : (
                                capitalize(subcategory.post_title.toLowerCase())
                              )}
                            </Link>
                          ))}
                      </div>
                    )}
                  </NavTab>
                ))}
            </NavTabs>
          )}
      </Container>
    </Paper>
  )
}

NavBar.defaultProps = {
  tabs: [],
}

export default memo(NavBar)
