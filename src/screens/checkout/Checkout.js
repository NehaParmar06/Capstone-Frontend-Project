import React, { Component } from 'react';
import Header from '../../common/header/Header';
import VerticalStepper from './VerticalStepper';
import { GridListTile, GridListTileBar, GridList } from '@material-ui/core';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            customerAddress: [{}]
        }
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
        xhr.open("GET", this.props.baseUrl + "/address/customer");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("authorization", "Bearer eyJraWQiOiI5NDFhYTQ3Yy04NTcyLTQ0YWEtYmMzOS03ZDMwZWIzOTYzMjgiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiI2Y2U0NTNiOS00ZGZiLTRkOGQtYTM0YS0xYTQ0MWIyYTliNGIiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU3NTE2MSwiaWF0IjoxNTc1MTMyfQ.O13YLmjE3YzvnHwIhxpT9ixsvzi8vhU1lpeThpFMvrncB1zdVGLZva2c9xrlI4BZk-wEWju4nw5-TnGVAHKHsw");
        xhr.setRequestHeader("Access-Control-Request-Headers", "Cache-Control,authorization,Accept");
        xhr.send(data);
    }
    render() {
        //const items = this.state.customerAddress.map((item) => <li>{item}</li>);
        return (
            <div>
                <div>
                    <Header hideSearchBar={1} />
                </div>
                <VerticalStepper></VerticalStepper>

                <GridList cols={3}>
                    {this.state.customerAddress.map(address => (
                        <GridListTile key={address.id}>
                            <GridListTileBar title={address.city} />
                        </GridListTile>
                    ))}
                </GridList>

            </div>
        );
    }
}

export default Checkout;