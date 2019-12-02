import React, { Component } from 'react';
import './Delivery.css';
import { FormLabel, GridList, GridListTile, FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    sformControl: {
        margin: theme.spacing(3),
    }
});

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentList: props.paymentList,
            selected: ""
        };
    }

    handleChangeHandler = (event) => {
        this.setState(
            { selected: event.target.value }
        )
        localStorage.setItem('paymentMode', "selected");
    };

    render() {
        console.log(this.props.paymentList);
        const { classes } = this.props;

        return (
            <div>
                {/* <FormLabel component="legend">Select Mode of Payment</FormLabel>
                {this.props.paymentList.map(payment => (
                    
                    <GridListTile key={payment.id}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={this.state.selected} onChange={this.handleChangeHandler}>
                                <FormControlLabel value={payment.payment_name} control={<Radio />} label={payment.payment_name} />
                            </RadioGroup>   
                        </FormControl> 
                    </GridListTile>                    
                ))} */}

                <FormLabel component="legend">Select Mode of Payment</FormLabel>
                {this.props.paymentList.map((payment, key) => (
                    <ul item={payment} key={payment.id} >
                        <FormControl component="fieldset" className={classes.formControl}>
                            <RadioGroup value={this.state.selected} onChange={this.handleChangeHandler}>
                                <FormControlLabel value={payment.payment_name} control={<Radio />} label={payment.payment_name} />
                            </RadioGroup>
                        </FormControl>
                    </ul>
                ))}
            </div>
        )
    }
}

export default withStyles(styles)(Payment);