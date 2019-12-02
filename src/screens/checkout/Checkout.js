import React, { Component } from 'react';
import Header from '../../common/header/Header';
import VerticalStepper from './VerticalStepper';
import { GridListTile, GridListTileBar, GridList, RadioGroup, Card, CardContent, Typography, CardActions, Button, FormControl, Divider, Snackbar, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './Checkout.css';
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
    rcard: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,

    },
    FormControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    title: {
        color: theme.palette.primary.light,
    },
    close: {
        padding: theme.spacing(0.5),
    }
});

// const [open, setOpen] = React.useState(false);

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            customerAddress: [{}],
            stateList: [{}],
            paymentList: [{}],
            setOpen: ""
        }
    }

    getAllStates() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({
                    states: JSON.parse(this.responseText).states
                });
            }
        })
        xhr.open("GET", this.props.baseUrl + "/states");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
        xhr.send(data);
    }

    getAllPaymentMethods() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({
                    paymentList: JSON.parse(this.responseText).paymentMethods
                });
            }
        })
        xhr.open("GET", this.props.baseUrl + "/payment");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
        xhr.send(data);
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({
                    customerAddress: JSON.parse(this.responseText).addresses
                });
            }
        })

        // xhr.open("GET", this.props.baseUrl + "/customer/login");
        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         sessionStorage.setItem('access-token', xhr.getResponseHeader('access-token'));
        //     }
        // })

        xhr.open("GET", this.props.baseUrl + "/address/customer");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        //var access = sessionStorage.getItem('access-token');
        xhr.setRequestHeader("authorization", "Bearer eyJraWQiOiIxYjE4N2I5Ny1lNzI2LTQ4YTItYTcwZC1iNjA4Mzg1ZTFhMjgiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiI2Y2U0NTNiOS00ZGZiLTRkOGQtYTM0YS0xYTQ0MWIyYTliNGIiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU3NTI1OCwiaWF0IjoxNTc1MjI5fQ.IaghL2t070jW_YH4zL0zOr17VRA_wy70Lh4ssrlY8P8M1P7K9UOAcIIZ-VQOk3LPwnaXsfpbi5giUhnx2PE6pQ");
        // console.log(access);
        // if(access === null){
        //     xhr.setRequestHeader("authorization", "Bearer eyJraWQiOiJhODQwYzk3OC0yYjlkLTRlY2ItODViOC1lZGNjMTEwMDBmMDMiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiI2Y2U0NTNiOS00ZGZiLTRkOGQtYTM0YS0xYTQ0MWIyYTliNGIiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU3NTIwOCwiaWF0IjoxNTc1MTc5fQ.CPtESnqVJWJj-lfmmfPLrUQH0L9fYzVjY--KMJSihQtyeFclJ0IDWVWUZzUdfo_tui-0OcsyWrX4qKKmRBGOsg");
        // }
        //xhr.setRequestHeader("authorization", "Bearer "+access);
        xhr.setRequestHeader("Access-Control-Request-Headers", "Cache-Control,authorization,Accept");
        xhr.send(data);
        this.getAllStates();
        this.getAllPaymentMethods();
    }

    handleClick = () => {
        this.setState({ setOpen: true });

    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ setOpen: false });
    };

    render() {
        // console.log(this.state.customerAddress);
        // console.log(this.state.paymentList);
        // console.log(this.state.stateList);
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;




        return (
            <div>
                <div>
                    <Header hideSearchBar={1} />
                </div>

                <div className="flex-container">
                    <div className="left">
                        <VerticalStepper customerAddress={this.state.customerAddress} paymentList={this.state.paymentList} stateList={this.state.stateList} />
                    </div>


                    <div className="right">
                        <Card className={classes.card}>
                            <CardContent>
                                <FormControl className={classes.FormControl}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Summary
                                    </Typography>
                                </FormControl>
                                <Divider />
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        {/* TODO : Snack Bar Implementation */}
                        {/* <Button onClick={this.handleClick}>Open simple snackbar</Button>
                            <Snackbar
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                open={open}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                                ContentProps={{
                                'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Note archived</span>}
                                action={[
                                <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                                    UNDO
                                </Button>,
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                                ]}
                            /> */}

                    </div>


                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Checkout);;