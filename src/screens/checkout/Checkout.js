import React, { Component } from 'react';
import Header from '../../common/header/Header';
import VerticalStepper from './VerticalStepper';

class Checkout extends Component {
    render() {
        let x = 200;
        let y = 100;
        return (
            <div>
                <div>
                    <Header hideSearchBar={1} />
                </div>
                <VerticalStepper></VerticalStepper>
            </div>
        );
    }
}

export default Checkout;