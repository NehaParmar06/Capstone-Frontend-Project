import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';

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

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Delivery Option Here';
        case 1:
            return 'Payment Options here';
        default:
            return 'Unknown step';
    }
}

class VerticalStepper extends React.Component {
    constructor(props) {
        super();
        this.state = {
            customerAddress: props.customerAddress,
            activeStep: 0
        }
    }

    //   state = {
    //     activeStep: 0
    //   };

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
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                        <Typography>{getStepContent(index)}</Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                                {/* <span>Delivery Address here {this.props.customerAddress} </span> */}

                            </div>
                            <div>
                                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                                    Back
                    </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>)}
            </Stepper>
            {activeStep === steps.length && <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you're finished</Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                    Reset
            </Button>
            </Paper>}
        </div>;
    }
}

VerticalStepper.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(VerticalStepper);