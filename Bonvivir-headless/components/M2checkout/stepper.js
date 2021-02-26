import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
  step: {
    "& $completed": {
      color: "lightgreen"
    },
    "& $active": {
      color: "pink"
    },
    "& $disabled": {
      color: "red"
    }
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 0
    }
  },
});

class myStepper extends Component {

 render() {
   const { classes } = this.props;
   return(
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={connector}
          classes={{
            root: classes.root
          }}
        >
          {this.state.numberTasks.map(label => {
            return (
              <Step
                key={label}
                classes={{
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active
                }}
         >
        <StepLabel
          classes={{
            alternativeLabel: classes.alternativeLabel,
            labelContainer: classes.labelContainer
          }}
          StepIconProps={{
            classes: {
              root: classes.step,
              completed: classes.completed,
              active: classes.active,
              disabled: classes.disabled
            }
          }}
        >
          {this.state.labels[label - 1]} //label value here
        </StepLabel>
              </Step>
            );
          })}
        </Stepper>
);
}
}

export default withStyles(styles)(myStepper);