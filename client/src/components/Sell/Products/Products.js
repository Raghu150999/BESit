import React, { Component } from 'react';
import Product from '../Product/Product';
import Button from '../Button'
import axios from 'axios';
import { connect } from 'react-redux';

class Products extends Component {

  state = {
    items: [],
    itemsAvailable: false
  }

  componentDidMount() {
    // in startin nothing visible after mounting done
    if (this.props.user) {
      axios.get('/api/getitems', {
        params: {
          username: this.props.user.username
        }// user object from database
        // send this in url get request as param they can view it from req.query or match.params
      })// get info about that user
        .then(res => {
          this.setState({
            items: res.data,
            itemsAvailable: true
          });
        });
    }
  }

  componentDidUpdate() {
    if (!this.state.itemsAvailable) {
      // if already true runs after rerendering in state change
      // again acceess database info
      axios.get('/api/getitems', {
        params: {
          username: this.props.user.username
        }
      })
        .then(res => {
          this.setState({
            items: res.data,
            itemsAvailable: true
          });
        });
    }
  }

  updateStatus = (status, id) => {
    axios.post('/api/updateitemstatus', {
      status,
      id,
      owner: this.props.user.username
    })// send this as just json object as body of request
    //this function is being called in hierarchy of 
    //updatestatus function is passed as prop to product which again passed as prop to dropdown which calls method on changing state
  }

  render() {
    let displayItems = this.state.items.length > 0 ? (
      // items array has all items in it
      this.state.items.map((item) => {
        return (
          // fuction sent as proprty thats it
          <Product update={this.updateStatus} key={item._id} item={item} id={item._id} /> //item came from databse from server call in starting hass aproperties
          //this product is uff from products see diff paths this call product render method  props passed
        )
      })
    ) : (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No items available to display</h2>
      );
      //if len==0 display no items
    const header = this.state.items.length > 0 ? (
      <div className="container">
        <h2 style={{ marginTop: '15px' }}>All Your Items:</h2>
      </div>
    ) : (
        ''
      );
      // just header display only in this case
      // now declaring variables is done just return them also a button
    return (
      <div>
        <Button />
        {header}
        {displayItems}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}


export default connect(mapStateToProps)(Products);