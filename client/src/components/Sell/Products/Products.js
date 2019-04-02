import React, { Component } from 'react';
import Product from '../Product/Product';
import Button from '../Button'
import axios from 'axios';
import { connect } from 'react-redux';

class Products extends Component {

  state = {
    items: [],
    itemsAvailable: false,
  }

  componentDidMount() {
    if (this.props.user) {
      axios.get('/api/getitems', {
        params: {
          username: this.props.user.username
        }
      })
        .then(res => {
          this.setState({
            items: res.data.reverse(),
            itemsAvailable: true
          });
        });
    }
  }

  componentDidUpdate() {
    if (!this.state.itemsAvailable) {
      axios.get('/api/getitems', {
        params: {
          username: this.props.user.username
        }
      })
        .then(res => {
          this.setState({
            items: res.data.reverse(),
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
    })
  }

  render() {
    let displayItems = this.state.items.length > 0 ? (
      this.state.items.map((item) => {
        return (
            <Product update={this.updateStatus} key={item._id} item={item} id={item._id} />
        )
      })
    ) : (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No items available to display</h2>
      );
    const header = this.state.items.length > 0 ? (
      <div className="container">
        <h2 style={{ marginTop: '15px' }}>All Your Items:</h2>
      </div>
    ) : (
        ''
      );
    return (
      <div>
        <Button />
        {header}
        <div className="container" style={{marginBottom: "20px"}}>
          <div className="row">
            {displayItems}
          </div>
        </div>
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