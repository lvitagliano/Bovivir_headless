import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  labelContainer: {
    '& $alternativeLabel': {
      marginTop: 0,
    },
  },
  step: {
    '& $active': {
      color: 'pink',
    },
    '& $disabled': {
      color: 'red',
    },
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  disabled: {},
  labelContainer: {
    '& $alternativeLabel': {
      marginTop: 0,
    },
  },
})

class myStepper extends Component {
  render() {
    const { classes } = this.props
    return (
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={connector}
        classes={{
          root: classes.root,
        }}
      >
        {this.state.numberTasks.map((label, i) => {
          return (
            <Step
              key={i}
              classes={{
                root: classes.step,
                active: classes.active,
              }}
            >
              <StepLabel
                classes={{
                  alternativeLabel: classes.alternativeLabel,
                  labelContainer: classes.labelContainer,
                }}
                StepIconProps={{
                  classes: {
                    root: classes.step,
                    active: classes.active,
                    disabled: classes.disabled,
                  },
                }}
              >
                {this.state.labels[label - 1]}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    )
  }
}

export default withStyles(styles)(myStepper)
