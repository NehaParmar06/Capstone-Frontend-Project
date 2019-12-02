import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Checkout from '../screens/checkout/Checkout';
import Details from '../screens/details/Details';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
    }
    render() {
        return (
            <div>
                {/* TODO  Add a check if session storage - access token is not set redirect to home page*/}
                <Router>
                    <Route exact path="/" render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path="/checkout" render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path="/details" render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                </Router>
            </div>
        );

    }
}

export default Controller;