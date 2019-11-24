import React, { Component } from 'react';
import Header from '../../common/header/Header';

class Checkout extends Component {
    render() {
        let x = 200;
        let y = 100;
        return (
            <div>
                <div>
                    <Header hideSearchBar={1}/>
                </div>
                <button>Checkout Button</button>
                <label htmlFor="Name"></label>
                <input id="Name" type="text" placeholder="Type here" defaultValue={x+y}/>
                <div>
                    <span>Item 1</span>
                    <span>Item2</span>
                </div>
            </div>

        );
    }
}

export default Checkout;