import {
  FormTitle,
  DescriptionSelectionCard,
  ContainerOneColumn,
  ContainerOneRow,
} from '../../Commons/styles'
import LabelForm from '../../Commons/LabelForm'
import { useSelector } from 'react-redux'
import Cup from '../../Cup'
import moment from 'moment'
import { useSubscriptionDate } from '../../../utils/hooks/useSubscriptionDate'

const DescriptionSelection = props => {
  const { deliveryDates, renovationDate } = useSubscriptionDate(moment())

  const ANIMATIONS = {
      DESKTOP: [52, 35, 20, 7],
      MOBILE: [75, 45, 35, 15],
    },
    size = 'sm'
  const { currentStep: step } = useSelector(state => state.register)

  return (
    <>
      <DescriptionSelectionCard>
        <FormTitle>¡Formá parte del Club y viví la experiencia BONVIVIR!</FormTitle>
        <Cup size={size} desktopAnimation={ANIMATIONS.DESKTOP} step={step} />
        <FormTitle>6 botellas de Selección Exclusiva</FormTitle>
        <img src="" />
        <LabelForm fontSize="10px" style={{ textAlign: 'center' }}>
          Diferentes cepas y estilos de vinos cuidadosamente elegidos. Incluye fichas coleccionables
          con maridajes.
        </LabelForm>
        <ContainerOneColumn>
          <ContainerOneRow>
            <LabelForm fontSize="12px">Precio</LabelForm>
            <LabelForm fontSize="12px">$2832</LabelForm>
            <LabelForm fontSize="12px">Precio con</LabelForm>
            <LabelForm fontSize="12px">IMG CLN</LabelForm>
            <LabelForm fontSize="12px">$2265</LabelForm>
          </ContainerOneRow>
        </ContainerOneColumn>
        {/* <p style={{ fontSize: '12px', margin: '5px 0',color: "#762057" }}>
              {`El débito en tu tarjeta de crédito se realiza durante el mes de ${moment(renovationDate).format("MMMM")} y 
              la entrega del 1 al 10 de ${moment(deliveryDates.start).format("MMMM")}.`} 
            </p> */}
      </DescriptionSelectionCard>
    </>
  )
}
export default DescriptionSelection
