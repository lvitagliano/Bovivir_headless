import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SimpleAccordion from '../../components/catalogFilters/accordion'
import { getCategoriesByName, getPairings } from '../../services/Client/GraphQl/wp/GQLAPI'
import Button from '../../components/Commons/Button'
import PorQueAsociarmeCB from '../../components/Club/QueEsElClub/PorQueAsociarmeCB'

export default function Maridajes() {
  // logica de armado de breadcrums mediante router
  const router = useRouter()
  let paths = router.route.split('/')
  let breadcrumbs = []
  let acum = ''
  paths.map(i => {
    i !== '' ? (acum += `/${i}`) : null
    return breadcrumbs.push(
      i === ''
        ? { text: 'Inicio', href: '/' }
        : { text: i[0].toUpperCase() + i.substring(1), href: acum }
    )
  })

  // STATES
  const [filters, setFilters] = useState()
  const [pairings, setPairings] = useState()
  const [pager, setPager] = useState()
  const [page, setPage] = useState(' ')
  const [quantity, setQuantity] = useState(12)
  const [categoryIn, setCategoryIn] = useState([])
  const [loading, setLoading] = useState(false)

  // EFFECTS
  // Initial
  useEffect(() => {
    // TRAE LA LISTAS DE CHECKBOXES PARA FILTRAR LAS CARTAS DE MARIDAJES
    filters === undefined &&
      getCategoriesByName({ name: ['maridajes', 'cepas'] }).then(r =>
        setFilters(r.categories.nodes)
      )

    setLoading(true)
    // TRAE LAS CARTAS DE MARIDAJES (EN ESTADO INICIAL)
    getPairings({ page: page, quantity: quantity, categoryIn: categoryIn }).then(r => {
      if (pairings !== undefined && categoryIn.length === 0) {
        pairings.push.apply(pairings, r.pairings.nodes)
        setPairings(pairings)
      } else {
        setPairings(r.pairings.nodes)
      }
      setPager(r.pairings.pageInfo)
    })
    setLoading(false)
  }, [page, categoryIn])

  const handlerPager = direction => {
    if (direction === 'forward') setPage(pager.endCursor)
  }

  const handlerFilters = id => {
    setPage(' ')
    let index = categoryIn.indexOf(id)
    if (index === -1) setCategoryIn([...categoryIn, id])
    else {
      categoryIn.splice(index, 1)
      if (categoryIn.length === 0) {
        setCategoryIn([])
        setPairings()
      } else {
        setCategoryIn([...categoryIn])
      }
    }
  }

  const handlerClickButtonCard = (uri) => {
    router.push(uri)
  }

  // data hardcodeada para banner porQueAsociarmeCB
  const porQueAsociarmeaClubBonvivir = {
    height: '70.3em',
    background: '#EDEAE1',
    title: '¿por qué asociarme a club bonvivir?',
    subtitle: '',
    items: [
      {
        img: './images/porqueasociarmeVino.PNG',
        subtitle: 'Etiquetas Originales',
        text:
          'Vinos seleccionados por expertos sommeliers. Incluye fichas coleccionables con maridajes.',
      },
      {
        img: './images/porqueasociarmeTargetas.PNG',
        subtitle: 'Contenido Exclusivo',
        text: 'Ideal para aprender a disfrutar mejor la experiencia del vino.',
      },
      {
        img: './images/porqueasociarmeCopa.PNG',
        subtitle: 'Degustaciones y eventos',
        text:
          'Acceso a experiencias relacionadas al mundo del vino, pueden ser presenciales o virtuales.',
      },
      {
        img: './images/porqueasociarmeCucardas.PNG',
        subtitle: 'Envio sin cargo a todo el pais',
        text: 'Llega a tu casa cada mes una seleccion de vinos para sorprenderte.',
      },
      {
        img: './images/porqueasociarmeCaja.PNG',
        subtitle: 'Descuentos Exclusivos',
        text:
          'Ofertas permanentes en nuestra tienda online para socios en vinos, cavas, accesorios y mas.',
      },
    ],
  }

  return (
    <>
      {/* breadcrumbs y head */}
      <Head>{<title>{`BONVIVIR ${breadcrumbs[breadcrumbs.length - 1].text}`}</title>}</Head>
      <Breadcrumbs items={breadcrumbs} />

      {/* contenido */}
      <div className="containerPadreMaridajes">
        {/* filtros */}
        <div className="filtrosMaridajeContainer">
          <AccordionSummary>
            <Typography>
              <b>FILTRAR</b>
            </Typography>
          </AccordionSummary>
          <SimpleAccordion
            otherFilters={
              <>
                {filters !== undefined && (
                  <>
                    {filters.map((value, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            <b>{value.name.toUpperCase()}</b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              cursor: 'pointer',
                              maxHeight: '18rem',
                              overflow: 'auto',
                            }}
                          >
                            {value.children.nodes.map((valuenodes, indexnodes) => (
                              <div key={indexnodes} style={{ margin: '0.3rem 0.5rem ' }}>
                                <FormControlLabel
                                  onChange={() => handlerFilters(valuenodes.categoryId)}
                                  control={<Checkbox />}
                                  labelPlacement="end"
                                  label={
                                    <b style={{ fontSize: '0.8rem' }}>
                                      {valuenodes.name} ({valuenodes.count})
                                    </b>
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )}
              </>
            }
          />
        </div>

        <div className="maridajeContainer">
          {/* titulo de pagina */}
          <Typography variant="h4">
            <b style={{ paddingLeft: '1.5rem' }}>
              {breadcrumbs[breadcrumbs.length - 1].text.toUpperCase()}
            </b>
          </Typography>

          {/* cartas */}
          <div className="cartasMaridajeGrid">
            {pairings !== undefined && !loading ? (
              <>
                {pairings.map((value, index) => (
                  // <Link key={index} as={`/`} href={`/`}>
                  //   <a style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    key={index}
                    style={{
                      height: '16rem',
                      backgroundColor: '#FFFFFF',
                      padding: '0.3rem',
                      borderRadius: '1%',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* IMAGEN */}
                    <div style={{ width: '100%', height: '75%', position: 'relative' }}>
                      <img
                        style={{ borderRadius: '1%' }}
                        width="100%"
                        height="100%"
                        src={value.featuredImage.node.guid}
                        alt={value.title}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          background: '#762057',
                          color: '#FFFFFF',
                          padding: '2px 10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        texto que vendra
                      </div>
                    </div>

                    {/* LOW TEXT */}
                    <div style={{ margin: '0.5rem' }}>
                      <b style={{ textTransform: 'capitalize' }}>{value.title}</b>
                    </div>

                    {/* HOVERCARD */}
                    <div className="hoverCartasMaridaje">
                      <b>{value.title.toUpperCase()}</b>
                      <br/>
                      <span>texto que vendra</span>
                      <Button
                        variant="cardMaridaje"
                        text="Ver más"
                        onClick={() => handlerClickButtonCard(value.uri)}
                      />
                    </div>
                  </div>
                  //   </a>
                  // </Link>
                ))}
              </>
            ) : (
              <>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((v, i) => (
                  <div
                    style={{
                      height: '16rem',
                      backgroundColor: '#FFFFFF',
                      padding: '0.3rem',
                      borderRadius: '1%',
                    }}
                  >
                    <Skeleton variant="rect" height="80%" />
                    <Skeleton variant="text" height="10%" />
                  </div>
                ))}
              </>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '5rem',
              width: '100%',
            }}
          >
            {/* PAGINADOR */}
            {pager !== undefined && pager.hasNextPage ? (
              <Button
                loading={loading}
                text="Mostrar mas"
                onClick={() => handlerPager('forward')}
              />
            ) : null}
          </div>
        </div>
      </div>
      <PorQueAsociarmeCB data={porQueAsociarmeaClubBonvivir} />
    </>
  )
}
