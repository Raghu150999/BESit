import React, { Component } from 'react';
import Products from './Products/Products';
import HomeNav from './../HomeNav/HomeNav';


class Sell extends Component {
  render() {
    return (
      <div>
        <HomeNav />
        <Products />
      </div>
    )
  }
}

export default Sell;