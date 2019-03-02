import React, { Component } from 'react';
import Products from './Products/Products';
import HomeNav from '../HomeNav/HomeNav';

class Sell extends Component {
    render() {
        return (
            <div>
                <HomeNav />
                <div  className="container">
                    <Products />
                </div>
            </div>
        )
    }
}

export default Sell;