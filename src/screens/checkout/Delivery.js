import React, { Component } from 'react';
import './Delivery.css';
import RenderGrid from "./RenderGrid"
import { Tab, Tabs, Typography, FormControl, InputLabel, Input, Button, Select, MenuItem, FormHelperText, TextField, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    selectEmpty: {
        marginTop: '2'
    },
    gridListAddress: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    inputElement: {
        color: 'BlanchedAlmond',
    }
});

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 10, textAlign: "left" }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            age: "",
            setAge: "",
            flatname: "",
            locality: "",
            city: "",
            pincode: "",
            localityRequired: "dispNone",
            cityRequired: "dispNone",
            flatnumberRequired: "dispNone",
            pincodeRequired: "dispNone",
            pincodeValidation: "dispNone",
            customerAddress: props.customerAddress,
            stateList: props.stateList
        };
    }

    openModalHandler = () => {
        this.setState(
            { modalIsOpen: true }
        )
    }

    closeModalHandler = () => {
        this.setState(
            { modalIsOpen: false }
        )
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value })
    }

    handleChange = event => {
        this.state.setAge(event.target.value);
    };

    saveClickHandler = () => {
        this.state.flatname === "" ? this.setState({ flatnumberRequired: "dispBlock" }) : this.setState({ flatnumberRequired: "dispNone" });
        this.state.locality === "" ? this.setState({ localityRequired: "dispBlock" }) : this.setState({ localityRequired: "dispNone" });
        this.state.city === "" ? this.setState({ cityRequired: "dispBlock" }) : this.setState({ cityRequired: "dispNone" });
        this.state.pincode === "" ? this.setState({ pincodeRequired: "dispBlock" }) : this.setState({ pincodeRequired: "dispNone" });
        if (this.state.city != "" && this.state.pincode.length != 6 && isNaN(parseFloat(this.state.pincode))) {
            this.setState({ pincodeValidation: "dispBlock" })
        } else {
            this.setState({ pincodeValidation: "dispNone" });
        }
    }

    inputflatnameChangeHandler = (e) => {
        this.setState({ flatname: e.target.value });
    }

    localityChangeHandler = (e) => {
        this.setState({ locality: e.target.value });
    }

    cityChangeHandler = (e) => {
        this.setState({ city: e.target.value });
    }

    pincodeChangeHandler = (e) => {
        this.setState({ pincode: e.target.value });
    }
    render() {
        const { classes } = this.props;
        console.log(this.props.customerAddress);
        console.log(this.props.stateList);
        return (
            <div>
                <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler} >
                    <Tab label="EXISTING ADDRESS" />
                    <Tab label="NEW ADDRESS" />
                </Tabs>

                {this.state.value === 0 &&
                    <div><RenderGrid customerAddress={this.props.customerAddress} /></div>
                }

                {this.state.value === 1 &&
                    <TabContainer className="tabcontainer">

                        <FormControl required>
                            <InputLabel htmlFor="flatname">Flat / Building No.</InputLabel >
                            <Input className={classes.inputElement} id="flatname" type="text" flatname={this.state.flatname}
                                onChange={this.inputflatnameChangeHandler} />
                            <FormHelperText className={this.state.flatnumberRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <FormControl required>
                            <InputLabel htmlFor="locality">Locality</InputLabel>
                            <Input clasid="locality" type="text" locality={this.state.locality} onChange={this.localityChangeHandler} />
                            {/* style={{backgroundColor: "Gainsboro"}} */}
                            <FormHelperText className={this.state.localityRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <FormControl required>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <Input id="city" type="text" city={this.state.city} onChange={this.cityChangeHandler}
                            />
                            <FormHelperText className={this.state.cityRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <FormControl required>
                            <InputLabel htmlFor="state_name">State</InputLabel>
                            <Input id="state_name" type="text" />
                            
                            {/* <Select id="state_name"
                                // labelId="demo-simple-select-label"
                                // id="state_name"
                                // value={this.age}
                                // onChange={this.handleChange}
                                // displayEmpty
                                // className={customStyles.content.selectEmpty}
                                > 
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select> */}
                        </FormControl><br /><br />

                        <FormControl required>
                            <InputLabel htmlFor="pincode">Pincode</InputLabel>
                            <Input id="pincode" type="text" pincode={this.state.pincode} onChange={this.pincodeChangeHandler} />
                            <FormHelperText className={this.state.pincodeRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.pincodeValidation}>
                                <span className="red">Pincode must contain only numbers </span>
                                <span className="red">and must be 6 digits long</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <Button variant="contained" color="secondary" onClick={this.saveClickHandler} >SAVE ADDRESS</Button><br /><br />
                    </TabContainer>
                }

            </div>
        )
    }
}

export default withStyles(styles)(Delivery);