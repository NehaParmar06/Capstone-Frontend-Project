import React from 'react';
import PropTypes from 'prop-types';
import './Delivery';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';
import Delivery from './Delivery';
import Payment from "./Payment";


const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ['Delivery', 'Payment'];
}

function getStepContent(step, customerAddress, paymentList, stateList) {
  switch (step) {
    case 0:
      return DeliveryMethod(customerAddress, stateList);
    case 1:
      return PaymentMethod(paymentList);
    default:
      return '';
  }
}

function DeliveryMethod(customerAddress, stateList) {
  return <div><Delivery customerAddress={customerAddress} stateList={stateList} /></div>
}

function PaymentMethod(paymentList) {
  return <div><Payment paymentList={paymentList} /></div>;
}

class VerticalStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerAddress: props.customerAddress,
      paymentList: props.paymentList,
      stateList: props.stateList,
      activeStep: 0
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    console.log(this.props.customerAddress);
    console.log(this.props.stateList);
    console.log(this.props.stateList);
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            <div>{getStepContent(index, this.props.customerAddress, this.props.paymentList, this.props.stateList)}</div>
            <div className={classes.actionsContainer}>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                  Back
                                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                  {/* TODO Check if the payment mode is selected  */}
                  {/* TODO From NEW address customer should go back to existing address  */}
                  {/* TODO Check if address is selected or new address is saved */}
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>)}

      </Stepper>
      {activeStep === steps.length && <Paper square elevation={0} className={classes.resetContainer}>
        <Typography>View the summary and place your order now!</Typography>
        <Button onClick={this.handleReset} className={classes.button}>
          Change
            </Button>
      </Paper>}
    </div>;
  }
}

VerticalStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalStepper);