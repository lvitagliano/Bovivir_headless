import { createMuiTheme } from '@material-ui/core/styles'
import { esES } from '@material-ui/core/locale'

const primaryColor = '#762057'
const whiteColor = '#FFFFFF'
const greyColor = '#cccc'

const scroll = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: primaryColor,
    borderRadius: '8px',
    border: '1px solid #cccc',
  },
}
const { ...camposScroll } = scroll

// Create a theme instance.
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: primaryColor,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            ...camposScroll,
            '& *': scroll,
          },
          // MARIDAJES
          '.containerPadreMaridajes': {
            background: '#F7F7F7',
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            minHeight: '100vh',
            paddingTop: '2rem',
          },
          '.maridajeContainer': {
            width: '75%',
          },
          '.filtrosMaridajeContainer': {
            minWidth: '23%',
          },
          '.cartasMaridajeGrid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 18rem)',
            justifyContent: 'center',
            alignContent: 'space-evenly',
            gap: '0.3rem',
            padding: '0.5rem 0',
          },
          '.hoverCartasMaridaje': {
            position: 'absolute',
            top: '0',
            left: '0',
            padding: '15px 30px 20px',
            width: '100%',
            height: '100%',
            background: 'rgba(118,32,87,0.7)',
            color: '#fff',
            opacity: '0',
            transition: 'all 700ms ease-out',

            '&:hover': {
              opacity: '1',
              borderRadius: '1%',
            },
          },
          // MARIDAJES
        },
      },
      MuiCheckbox: {
        root: {
          color: primaryColor,
          padding: '0px',
        },
        colorSecondary: {
          '&$checked': {
            color: primaryColor,
          },
        },
      },
    },
  },
  esES
)

export default theme
