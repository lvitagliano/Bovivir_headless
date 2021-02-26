import SeleccionesComponent from '../../components/Club/Selecciones'
import { getSelections } from '../../services/Client/GraphQl/wp/GQLAPI'

export default function Selecciones(props) {
  const data = [
    {
      logoSelection: './images/logo_exclusiva.png',
      titleSelection: 'Seleccion Exclusiva',
      textSelection:
        'Descubri y disfruta diferentes cepas y estilos de vinos cuidadosamente elegidos',
      cajaSelection: './images/Mockup_SE_2020.png',
      selection: 'SELECCIÓN FEBRERO 2021',
      vinosSelection: [
        'Nieto Senetiner Millesime Brut Nature 2016',
        'Trivento Gold Cellar Syrah 2019',
        'Canvas Don Nicasio Reserva Bonarda 2018',
      ],
      cantidadSelection: 'en cajas de 3 o 6 botellas',
    },
    {
      logoSelection: './images/logo_altagama.png',
      titleSelection: 'Seleccion Alta Gama',
      textSelection:
        'Pensada para descubrir y disfrutar vinos exepcionales, complejos y con gran potencial de guarda',
      cajaSelection: './images/Mockup_AG_2020.png',
      selection: 'Seleccion Diciembre 2020',
      vinosSelection: ['Dedicado Blend 2017', 'Osadia de Crear Espumante Blanc de Blancs 2020'],
      cantidadSelection: 'EN CAJAS DE 4 BOTELLAS',
    },
    {
      logoSelection: './images/logo_puromalbec.png',
      titleSelection: 'Seleccion Puro Malbec',
      textSelection:
        'Dos etiquetas de la cepa insignia, la mas cultivada y preferida por los paladares argentinos, Ideal para disfrutar su amplia variedad y complejidad',
      cajaSelection: './images/Mockup_generica2020.png',
      selection: 'Seleccion Diciembre 2020',
      vinosSelection: ['Canvas Don Nicasio Reserva Bonarda 2018', 'Blue Malbec 4000 Reserva 2018'],
      cantidadSelection: 'en cajas de 4 botellas',
    },
    {
      logoSelection: './images/logo_exclusivablanca.png',
      titleSelection: 'Seleccion Exclusiva Blanca',
      textSelection:
        'Pensada para descubrir y disfrutar una propuesta variada de vinos blancos y tintos',
      cajaSelection: './images/Mockup_SE_2020.png',
      selection: 'Seleccion Diciembre 2020',
      vinosSelection: ['Canvas Don Nicasio Reserva Bonarda 2018', 'Blue Malbec 4000 Reserva 2018'],
      cantidadSelection: 'en cajas de 4 botellas',
    },
  ]
  return <SeleccionesComponent data={props.selection} />
}

Selecciones.getInitialProps = async context => {
  return {
    selection: await getSelections(),
  }
}
