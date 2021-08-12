export const BASE_URL = 'http://localhost:27115/api/v1/'
export const SELECTIONS = 'selections'
export const AUTOGESTION_SELECTION = 'https://qa-autogestion.bonvivir.com/selection'
export const SUSCRIPTION = '/suscripcion'

export const getMenu = (menuShop = []) => {
  return [
    {
      // as: '/bonvivir',
      // href: '/wordpress',
      text: 'BONVIVIR',
      items: [
        { as: '/quienes-somos', href: '/club/queeselclub', text: 'Nosotros' },
        { as: '/notas', href: '/notas', text: 'Blog' },
        { as: '/eventos', href: '/eventos', text: 'Eventos' },
      ],
    },
    {
      // as: '/wordpress',
      // href: '/wordpress',
      text: 'CLUB',
      items: [
        { as: '/club/que-es-el-club', href: '/club/queeselclub', text: 'Qué es el club ' },
        {
          href: AUTOGESTION_SELECTION,
          text: 'Asociate',
          target: '_blank',
        },
        // {
        //     as: '/wordpress', href: '/wordpress', text: 'Contenido Exclusivo', items: [
        //         { as: '/maridajes', href: '/wordpress', text: 'Maridajes' },
        //         { as: '/eventos', href: '/wordpress', text: 'Eventos' },
        //         { as: '/bodegas', href: '/wordpress', text: 'Bodegas' },
        //     ]
        // },
        { as: '/club/selecciones', href: '/club/selecciones', text: 'Selecciones' },
        { as: '/bodegas', href: '/bodegas', text: 'Bodegas' },
        { as: '/maridajes', href: '/maridajes', text: 'Maridajes' },
      ],
    },
    {
      // as: '/tienda/vinos',
      // href: '/tienda/vinos',
      text: 'TIENDA',
      items: [
        {
          title: '¿Cómo comprar?',
          text: '¿Cómo comprar?',
          href: 'https://www.bonvivir.com/2021/04/23/como-comprar-en-tienda-bonvivir/',
          target: '_blank',
        },
        ...menuShop,
      ],
    },
    { as: '/contacto', href: '/contacto', text: 'CONTACTO' },
  ]
}

export const MENU_FOOT_HELP = [
  { as: '/faqs', href: '/faqs', text: 'PREGUNTAS FRECUENTES' },
  {
    as: '/terminos-y-condiciones',
    href: '/terminos-y-condiciones',
    text: 'TÉRMINOS Y CONDICIONES',
  },
  { as: '/contacto', href: '/contacto', text: 'CONTACTO' },
  {
    as:
      'https://www.argentina.gob.ar/servicio/iniciar-un-reclamo-ante-defensa-de-las-y-los-consumidores',
    href:
      'https://www.argentina.gob.ar/servicio/iniciar-un-reclamo-ante-defensa-de-las-y-los-consumidores',
    target: '_blank',
    text: `Defensa de Consumidores y Usuarios. Iniciar un reclamo (VUF)`,
  },
  {
    as: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm',
    href: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm',
    target: '_blank',
    text: 'Ley de Defensa del Consumidor',
  },
]
