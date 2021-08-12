import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ProductItem from '../../components/product/ProductItem'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import { Skeleton } from '@material-ui/lab'
import { Hbox } from 'react-storefront/Box'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import Fill from 'react-storefront/Fill'
import { StyledResponsiveTiles } from '../../components/StyledResponsiveTiles/StyledResponsiveTiles'
import { useSelector } from 'react-redux'
import { getProductsClient } from '../../services/Client/GraphQl/m2GQL'
import RangeSlider from '../../components/catalogFilters/priceRange'
import CategoriesFilters from '../../components/catalogFilters/categories'
import SimpleAccordion from '../../components/catalogFilters/accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Button from '../../components/Commons/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SimpleMenu from '../../components/catalogFilters/sortButton'
import { useMediaQuery } from '@material-ui/core'
import { useAmp } from 'next/amp'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  sideBar: {
    margin: theme.spacing(0, 4, 0, 0),
    width: 340,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  sortButton: {
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      boxShadow: 'none',
      backgroundColor: '#eeeeee',
      textTransform: 'none',
    },
  },
  total: {
    marginTop: theme.spacing(1),
  },
  showmore: {
    '& button': {
      backgroundColor: '#762057',
    },
    '& button:hover': {
      backgroundColor: '#ab3881',
    },
  },
  tiles: {
    overflow: 'visible',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
    },
  },
  // only use for styling BackToTop Component
  root: {
    right: '28px',
    bottom: '80px',
    '& button': {
      backgroundColor: '#762057',
    },
  },
  // Drawer Mobile filters
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: '95%',
    height: '90vh',
    top: '4rem',
  },
  // Only for filterButton Mobile
  filterButtonMobile: {
    boxWhadow: 'none',
    backgroundColor: 'rgb(238, 238, 238)',
    padding: '6px 7px',
    textTransform: 'none',
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    width: '29%',
    margin: '1px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '4px',
    letterSpacing: '0.02857em',
  },
}))

const Subcategory = ({ search }) => {
  const classes = useStyles()
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  const router = useRouter()
  let url = router.query.subcategoryId
  let url2 = url?.[0].toUpperCase() + url?.substring(1) || ''
  let numer

  switch (true) {
    case url === 'vinos':
      numer = '7'
      break
    case url === 'aceites':
      numer = '78'
      break
    case url === 'accesorios':
      numer = '10'
      break
    case url === 'linea-singular':
      numer = '69'
      break
  }
  const showMoreIncrement = 6
  const initialStateFilters = {
    sortPrice: '',
    sort: { position: 'DESC' },
    search: search || '',
    categoryId: numer || '2',
    pageSize: 18,
    MinPrice: '',
    MaxPrice: '',
    VinoBodega: [],
    VinoCepa: [],
    VinoVariedad: [],
  }
  const [pageData, setPageData] = useState({})
  const [loading, setLoading] = useState(false)
  const [filtersState, setFiltersState] = useState(initialStateFilters)
  const [hasFilter, setHasFilter] = useState(false)
  const [openMobileFilter, setOpenMobileFilter] = useState(false)

  const callQ = async filter => {
    let AllFilters
    setLoading(true)
    if (filter !== undefined) {
      setHasFilter(true)
      AllFilters = {
        sortPrice: filter.sortPrice || filtersState.sortPrice,
        sort: filter.sort || filtersState.sort,
        search: search || filtersState.search,
        categoryId: numer || filtersState.categoryId,
        pageSize: filter?.pageSize || filtersState.pageSize,
        MinPrice: filter?.MinPrice || filtersState.MinPrice,
        MaxPrice: filter?.MaxPrice || filtersState.MaxPrice,
        VinoBodega: filter?.VinoBodega || filtersState.VinoBodega,
        VinoCepa: filter?.VinoCepa || filtersState.VinoCepa,
        VinoVariedad: filter?.VinoVariedad || filtersState.VinoVariedad,
      }
      setFiltersState(AllFilters)
    } else {
      AllFilters = initialStateFilters
      setFiltersState(AllFilters)
      setHasFilter(false)
    }

    await getProductsClient(AllFilters).then(ps => {
      const { data } = ps

      if (AllFilters?.sortPrice) {
        orderByPrice(AllFilters.sortPrice, data)
      }
      setPageData(data)
    })
    setLoading(false)
    if (!isDesktop) setOpenMobileFilter(false)
  }

  const orderByPrice = (option, data) => {
    switch (true) {
      case option == 'DESC':
        data.products?.items.sort(function(a, b) {
          return (
            b.price_range.maximum_price.final_price.value -
            a.price_range.maximum_price.final_price.value
          )
        })
        break
      case option == 'ASC':
        data.products?.items.sort(function(a, b) {
          return (
            a.price_range.maximum_price.final_price.value -
            b.price_range.maximum_price.final_price.value
          )
        })
        break
    }
  }

  useEffect(() => {
    switch (true) {
      case url === 'vinos':
        numer = '7'
        break
      case url === 'aceites':
        numer = '78'
        break
      case url === 'accesorios':
        numer = '10'
        break
      case url === 'linea-singular':
        numer = '69'
        break
    }
    callQ()
  }, [url, search])

  const { customerWishList } = useSelector(state => state.m2)

  const handleFavourite = id =>
    customerWishList?.items?.find(i => i.product.id === id) ? true : false

  return (
    <>
      <Breadcrumbs
        items={
          !loading && [
            {
              text: 'Inicio',
              href: '/',
            },
            {
              text: url2,
              href: `/tienda/${url}`,
            },
          ]
        }
      />
      <Container
        maxWidth="lg"
        style={{
          padding: isDesktop ? theme.spacing(2) : '10px 8px 0 8px',
          background: '#f7f7f7',
          minHeight: '100vh',
          backgroundColor: '#FAFAFA',
        }}
      >
        <Head>{loading ? null : <title>{`BONVIVIR ${url2}` || `Resultado ${search}`}</title>}</Head>
        <BackToTop />

        {loading || pageData.products?.items.length > 0 ? (
          <Hbox align="flex-start">
            {isDesktop && (
              <div className={classes.sideBar} style={{ background: '#fff' }}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography>
                      <b>FILTRAR</b>
                    </Typography>
                    {hasFilter && (
                      <h6
                        style={{ margin: '0' }}
                        onClick={() => {
                          callQ()
                        }}
                      >
                        (Limpiar)
                      </h6>
                    )}
                  </div>
                </AccordionSummary>
                {pageData?.products && (
                  <SimpleAccordion
                    priceFilter={
                      <RangeSlider query={callQ} data={pageData.products?.items.slice()} />
                    }
                    otherFilters={
                      <CategoriesFilters
                        query={callQ}
                        filters={pageData.products?.aggregations}
                        hasFilter={hasFilter}
                      />
                    }
                  />
                )}
              </div>
            )}

            <Grid container style={{ position: 'relative' }}>
              <Grid item xs={12}>
                {!loading ? (
                  <Typography component="h1" variant="h6" gutterBottom>
                    {url2 || search}
                  </Typography>
                ) : (
                  <Skeleton height={32} style={{ marginBottom: theme.spacing(1) }} />
                )}
              </Grid>

              <div
                style={{
                  display: 'flex',
                  width: '99%',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ width: isDesktop ? '50%' : '100%' }}>
                  {loading ? (
                    <Skeleton
                      width={90}
                      height={14}
                      style={{ marginBottom: 4 }}
                      className={classes.total}
                    />
                  ) : (
                    <Typography variant="caption" className={classes.total}>
                      <span>
                        {pageData.products.total_count}{' '}
                        {pageData.products.total_count === 1 ? 'producto' : 'productos'}
                      </span>
                    </Typography>
                  )}
                </div>

                {!isDesktop && (
                  <>
                    <IconButton
                      className={classes.filterButtonMobile}
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => setOpenMobileFilter(true)}
                      edge="start"
                    >
                      <FilterListIcon /> Filtrar
                    </IconButton>
                    <Drawer
                      className={classes.drawer}
                      anchor="left"
                      open={openMobileFilter}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                      <div className={classes.sideBar} style={{ background: '#fff' }}>
                        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <Typography>
                              <b>FILTRAR</b>
                            </Typography>
                            {hasFilter && (
                              <h6 style={{ margin: '0' }} onClick={() => callQ()}>
                                (Limpiar)
                              </h6>
                            )}
                            <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              onClick={() => setOpenMobileFilter(false)}
                              edge="start"
                              size="small"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </AccordionSummary>
                        <SimpleAccordion
                          priceFilter={
                            <RangeSlider query={callQ} data={pageData.products?.items.slice()} />
                          }
                          otherFilters={
                            <CategoriesFilters
                              query={callQ}
                              filters={pageData?.products?.aggregations}
                              hasFilter={hasFilter}
                            />
                          }
                        />
                      </div>
                    </Drawer>
                  </>
                )}
                {/*SORT BNUTTON*/}
                <SimpleMenu
                  className={classes.sortButton}
                  options={pageData.products?.sort_fields}
                  query={callQ}
                />
              </div>

              {/*CATALOGO*/}
              <Grid item xs={12} style={{ marginTop: '1rem', overflow: 'hidden' }}>
                {!loading ? (
                  <StyledResponsiveTiles
                    autoScrollToNewTiles
                    cols={{
                      xs: 2,
                      sm: 2,
                      md: 2,
                      lg: 3,
                      xl: 3,
                    }}
                  >
                    {pageData?.products?.items.map((product, i) => {
                      return (
                        <ProductItem
                          key={product.id}
                          product={product}
                          index={i}
                          favouriteF={handleFavourite(product.id)}
                        />
                      )
                    })}
                  </StyledResponsiveTiles>
                ) : (
                  <StyledResponsiveTiles
                    cols={{
                      xs: 2,
                      sm: 2,
                      md: 2,
                      lg: 3,
                      xl: 3,
                    }}
                  >
                    {(() => {
                      const tiles = []
                      for (let i = 0; i < 9; i++) {
                        tiles.push(
                          <div
                            key={i}
                            style={{
                              marginTop: theme.spacing(2),
                              marginBottom: theme.spacing(2),
                            }}
                          >
                            <Fill height="100%" style={{ marginBottom: theme.spacing(1) }}>
                              <Skeleton variant="rect" />
                            </Fill>
                            <Skeleton height={35} />
                          </div>
                        )
                      }
                      return tiles
                    })()}
                  </StyledResponsiveTiles>
                )}
              </Grid>
              <div
                style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '1rem' }}
              >
                {(!hasFilter || pageData.products.total_count >= filtersState.pageSize) && (
                  <Button
                    margin="3rem auto"
                    text="Mostrar Mas"
                    onClick={() => callQ({ pageSize: filtersState.pageSize + showMoreIncrement })}
                  />
                )}
              </div>
            </Grid>
          </Hbox>
        ) : (
          <>
            <Head>
              <title>{`Resultado ${search}`}</title>
            </Head>
            <div
              style={{
                background: '#FFFFFF',
                width: '80%',
                minHeight: '10rem',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '4px',
                padding: '40px 40px',
                margin: '48px auto',
              }}
            >
              <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
              <ul>
                <li>Revisá la ortografía de la palabra.</li>
                <li>Utilizá palabras más genéricas o menos palabras.</li>
                <li>
                  Dirijete a la categoria <b>TIENDA</b> y selecciona alguna.
                </li>
              </ul>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default Subcategory
