import { getAllSelectionsClient } from '../../services/Client/GraphQl/wp/GQLAPI'
import * as types from '../actionTypes'

const orderSelectionQualityForDate = selections => {
  const data = [
    {
      logoSelection: './images/logo_exclusiva.png',
      quality: 'Exclusiva',
      textSelection:
        'Descubri y disfruta diferentes cepas y estilos de vinos cuidadosamente elegidos',
      cajaSelection: './images/Mockup_SE_2020.png',
    },
    {
      logoSelection: './images/logo_altagama.png',
      quality: 'Alta Gama',
      textSelection:
        'Pensada para descubrir y disfrutar vinos exepcionales, complejos y con gran potencial de guarda',
      cajaSelection: './images/Mockup_AG_2020.png',
    },
    {
      logoSelection: './images/logo_puromalbec.png',
      quality: 'Puro Malbec',
      textSelection:
        'Dos etiquetas de la cepa insignia, la mas cultivada y preferida por los paladares argentinos, Ideal para disfrutar su amplia variedad y complejidad',
      cajaSelection: './images/Mockup_generica2020.png',
    },
    {
      logoSelection: './images/logo_exclusivablanca.png',
      quality: 'Exclusiva Blanca',
      textSelection:
        'Pensada para descubrir y disfrutar una propuesta variada de vinos blancos y tintos',
      cajaSelection: './images/Mockup_SE_2020.png',
    },
  ]

  return [
    ...new Map(
      selections
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(item => {
          const hardData = data.filter(da => da.quality === item.quality)[0]
          item.selectionWines = Object.values(item.selectionWines || [])
          return [item.quality, { ...item, hardData }]
        })
    ).values(),
  ]
}

const getAllSelections = () => {
  return dispatch => {
    dispatch(getAllSelectionsStart())
    getAllSelectionsClient().then(
      res => {
        const payload = res?.data?.data?.selections?.nodes
        const grouping = orderSelectionQualityForDate(payload)
        debugger

        dispatch(getAllSelectionsSuccess(grouping))
      },
      error => {
        dispatch(getAllSelectionsFail(error))
      }
    )
  }
}

const getAllSelectionsStart = () => {
  return {
    type: types.GET_ALL_SELECTIONS_START,
  }
}

const getAllSelectionsSuccess = payload => {
  return {
    type: types.GET_ALL_SELECTIONS_SUCCESS,
    payload,
  }
}

const getAllSelectionsFail = error => {
  return {
    type: types.GET_ALL_SELECTIONS_FAIL,
    error,
  }
}

export { getAllSelections }
