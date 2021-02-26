import React from 'react'
import {
    BackgroundContainer,
    ContainerText,
    ContainerEmail,
    ContainerEmailInput,
    EmailInput
} from "./styles"
import {SubTitle2,SubTitle,Text2} from '../utils/commonStyles';
import Button from "../../Commons/Button";
import ReCAPTCHA from 'react-google-recaptcha';

const recaptchaRef = React.createRef();

 const NewsLetter = () => {
     return(
         <BackgroundContainer>
            <ContainerText>
                <SubTitle2>Newsletter</SubTitle2>
                <Text2>
                    Dejanos tu email y recibi la mejor info sobre <br/>
                    el mundo del vino y muchas ofertas!
                </Text2>
            </ContainerText>
            <ContainerEmail>
                <SubTitle color='#333'>ingresa tu email</SubTitle>
                <ContainerEmailInput>
                    <EmailInput type="text"/> 
            
                    <Button text='enviar' alignSelf='flex-end'/>
                </ContainerEmailInput>
                <ReCAPTCHA
          ref={recaptchaRef}
          sitekey='6LfvDvYUAAAAAOl78mPYDeTqAi8JrPwkBEdtu1Rt'
          onChange={() => {
            this.setState({ ready: true });
          }}
        />
            </ContainerEmail>
         </BackgroundContainer>
     )
 }

 export default NewsLetter