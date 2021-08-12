import DefaultAddress from './defaultAddress'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Commons/Button'
import FormCustomerData from '../formCustomerDataM2'
import { Title, SubTitle, Text } from './styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Fade } from '@material-ui/core'
import CLNArea from '../cart/CLNArea'
import EmailUpdate from './emailUpdate'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  iconButton: {
    color: '#762057',
    margin: '1rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    width: 'max-content',
    border: 'none',
    outline: 'none',
    marginTop: '3rem',
  },
}))

export default function PersonalData({ data, title }) {
  const classes = useStyles()
  const {
    addresses,
    firstname,
    lastname,
    email,
    gender,
    taxvat,
    group_id,
    dob,
    custom_attributes,
  } = useSelector(state => state.m2.customerData)
  const [rows, setRows] = React.useState(addresses)
  const [defaultShipping, setDefaultShipping] = React.useState(rows?.find(i => i.default_shipping))
  const [defaultBilling, setDefaultBilling] = React.useState(rows?.find(i => i.default_billing))
  const [addressCustomerData, setAddressCustomerData] = React.useState(false)

  const [modalDataOpenClose, setModalDataOpenClose] = React.useState({ show: false, view: null })

  const genderCase = value => {
    switch (true) {
      case value === 1:
        return 'Masculino'
        break
      case value === 2:
        return 'Femenino'
        break
      default:
        return 'No posee'
        break
    }
  }

  const taxvat_typeCase = value => {
    switch (true) {
      case value === '246':
        return `DNI: ${taxvat}`
        break
      case value === '252':
        return ` PASAPORTE: ${taxvat}`
        break
      default:
        return 'No posee'
        break
    }
  }

  const group_idCase = value => {
    switch (true) {
      case value === 1:
        return `General`
        break
      case value === 2:
        return `Wholesale`
        break
      case value === 3:
        return `Retailer`
        break
      case value === 4:
        return `Socios Alta Gama`
        break
      case value === 5:
        return `Socios Exclusiva`
        break
      case value === 6:
        return `Grupo de Prueba`
        break
      case value === 7:
        return `Puro Malbec`
        break
      default:
        return 'No posee'
        break
    }
  }

  const covedisa_tarjeta_clnCase = value => {
    switch (true) {
      case value === '0':
        return `No posee`
      default:
        return value
    }
  }

  return (
    <>
      {addressCustomerData ? (
        <FormCustomerData redirectionHandler={setAddressCustomerData} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Title>{title}</Title>
            <Button text="Editar información" onClick={() => setAddressCustomerData(true)} />
          </div>

          <SubTitle>Nombre</SubTitle>
          <Text>{firstname}</Text>

          <SubTitle>Apellido</SubTitle>
          <Text>{lastname}</Text>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <SubTitle>Email</SubTitle>
              <Text>{email}</Text>
            </div>
            <IconButton
              className={classes.iconButton}
              size="small"
              onClick={() =>
                setModalDataOpenClose({ show: true, view: <EmailUpdate email={email} /> })
              }
            >
              <Icon>create_icon</Icon>
            </IconButton>
          </div>

          <SubTitle>Genero</SubTitle>
          <Text>{genderCase(gender)}</Text>

          <SubTitle>Numero de Documento</SubTitle>
          <Text>{taxvat || 'No posee'}</Text>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <SubTitle>Tarjeta CLN</SubTitle>
              <Text>
                {custom_attributes?.find(i => i.attribute_code === 'covedisa_tarjeta_cln')?.value &&
                  covedisa_tarjeta_clnCase(
                    custom_attributes?.find(i => i.attribute_code === 'covedisa_tarjeta_cln')?.value
                  )}
              </Text>
            </div>
            <IconButton
              className={classes.iconButton}
              size="small"
              onClick={() => setModalDataOpenClose({ show: true, view: <CLNArea /> })}
            >
              <Icon>create_icon</Icon>
            </IconButton>
          </div>

          <SubTitle>Socio</SubTitle>
          <Text>{group_idCase(group_id)}</Text>

          <SubTitle>Fecha de Nacimiento</SubTitle>
          <Text>{(dob && moment(dob).format('DD/MM/YYYY')) || 'No posee'}</Text>
          <DefaultAddress defaultShipping={defaultShipping} defaultBilling={defaultBilling} />
          <Modal
            className={classes.modal}
            open={modalDataOpenClose.show}
            onClose={() => setModalDataOpenClose({ show: false, view: null })}
          >
            <Fade in={modalDataOpenClose.show}>
              <div className={classes.paper}>{modalDataOpenClose?.view}</div>
            </Fade>
          </Modal>
        </>
      )}
    </>
  )
}
