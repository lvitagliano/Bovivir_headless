import React, { useState } from 'react'
import { ContainerStepper, DivImage, DivStepper, Dot, ActiveDot, Label } from './styles'
import { Stepper, Step, StepLabel, StepConnector, Container } from '@material-ui/core'
import { Title1, Text1, Text1Disabled } from '../utils/commonStyles'
import { ContainerLgCustom } from '../../Commons/ContainerLg'

export default function VerticalStepper({ title, steps }) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeImageStep, setActiveImageStep] = useState(
    steps[0].cf_home_verticalStepper_step.image.sourceUrl
  )

  const handleStep = step => () => {
    setActiveStep(step)
    setActiveImageStep(steps[step].cf_home_verticalStepper_step.image.sourceUrl)
  }

  //asume resaltado entre #
  const replaceTag = S => {
    let arr = S.split(/#/g)
    arr = arr.map(el => (!el ? ' ' : el))
    const res = arr.reduce((acc, substr, i) => {
      if (i % 2 !== 0)
        return (
          <>
            {acc}
            <strong>{substr}</strong>
          </>
        )
      else
        return (
          <>
            {acc}
            {substr}
          </>
        )
    })
    return res
  }

  return (
    <ContainerStepper>
      <ContainerLgCustom>
        <DivImage image={activeImageStep} />
        <DivStepper>
          <Title1>{title}</Title1>
          <Stepper
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
            style={{ display: 'flex', padding: '0px', backgroundColor: 'transparent' }}
          >
            {steps.map((step, index) => (
              <Step key={step.cf_home_verticalStepper_step.text || index}>
                <StepLabel
                  onClick={handleStep(index)}
                  onMouseOver={handleStep(index)}
                  icon={<Dot active={activeStep === index} />}
                >
                  <Label>
                    {activeStep === index ? (
                      <Text1 width="80%" size="1.1em">
                        {replaceTag(step.cf_home_verticalStepper_step.text)}
                      </Text1>
                    ) : (
                      <Text1Disabled width="80%" size="1.1em">
                        {replaceTag(step.cf_home_verticalStepper_step.text)}
                      </Text1Disabled>
                    )}
                  </Label>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </DivStepper>
      </ContainerLgCustom>
    </ContainerStepper>
  )
}

VerticalStepper.defaultProps = {
  title: '',
  steps: [],
}
