import React, { useState } from 'react'
import { BackgroundContainer, ContainerText, ContainerEmail, ContainerEmailInput } from './styles'
import { SubTitle2, SubTitle, Text2 } from '../utils/commonStyles'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm, Controller } from 'react-hook-form'
import { ruleEmail } from '../../../constants/validationRules'
import Button from '../../Commons/Button'
import InputForm from '../../Commons/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeEmailToNewsletterAction } from '../../../store/actions/m2Action'
import { setRegisteredUserToNewsletter } from '../../../store/actions/userAction'
import { ContainerLgCustom } from '../../Commons/ContainerLg'

const recaptchaRef = React.createRef()

const NewsLetter = () => {
  const dispatch = useDispatch()
  const [captcha, setCaptcha] = useState(false)
  const [loading, setLoading] = useState(false)
  const { errors, handleSubmit, control, getValues, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })
  const itsRegistred = useSelector(state => state.user.registredUserToNewsletter)

  const onSubmit = async (data, event) => {
    if (captcha) {
      setLoading(true)
      await dispatch(subscribeEmailToNewsletterAction(data))
      setLoading(false)
    } else {
      alert('complete el captcha')
    }
  }
  //reincia el estado para que aparezca el formulario de nuevo.
  if (itsRegistred) {
    setTimeout(() => {
      dispatch(setRegisteredUserToNewsletter(false))
    }, 5000)
  }

  return (
    <BackgroundContainer>
      <ContainerLgCustom padding="0">
        {itsRegistred ? (
          <div className="msg-thanks">
            <p>Gracias por registrarse</p>
          </div>
        ) : (
          <>
            <ContainerText>
              <SubTitle2>Newsletter</SubTitle2>
              <Text2>
                ¡Dejanos tu email y recibi la mejor info sobre <br />
                el mundo del vino y muchas ofertas!
              </Text2>
            </ContainerText>
            <ContainerEmail>
              <SubTitle color="#333">Ingresá tu Correo Electrónico</SubTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ContainerEmailInput>
                  <Controller
                    as={<InputForm customWidth="100%" />}
                    height="40px"
                    width="100%"
                    border="none"
                    placeholder="Tu correo electrónico"
                    defaultValue=""
                    name="email"
                    control={control}
                    type="email"
                    rules={ruleEmail}
                  />

                  <Button
                    loading={loading}
                    text="enviar"
                    disabled={!formState.isValid}
                    alignSelf="flex-end"
                    type="submit"
                  />
                </ContainerEmailInput>
              </form>
              <ReCAPTCHA
                hl="es-419"
                ref={recaptchaRef}
                sitekey={
                  '6LfvDvYUAAAAAOl78mPYDeTqAi8JrPwkBEdtu1Rt' // test
                  // process.env.NEXT_PUBLIC_RECAPTCHAKEY ||
                  //'NOTvKvFEapNqC9AtHBX1MooIPjQrQ' // PROD
                }
                onChange={() => {
                  setCaptcha(true)
                }}
              />
            </ContainerEmail>
          </>
        )}
      </ContainerLgCustom>
    </BackgroundContainer>
  )
}

export default NewsLetter
