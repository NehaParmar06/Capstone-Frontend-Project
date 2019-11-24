import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Checkout from '../screens/checkout/Checkout';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
    constructor() {
        super();
        this.baseUrl = "localhost:3000";
    }
    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/" render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path="/checkout" render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                </Router>
            </div>
        );

    }
}

export default Controller;