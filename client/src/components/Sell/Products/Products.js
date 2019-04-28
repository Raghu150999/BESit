import React, { Component } from 'react';
import Product from '../Product/Product';
import Button from '../Button'
import axios from 'axios';
import { connect } from 'react-redux';

class Products extends Component {

  state = {
    items: [],
    itemsAvailable: false,
    cnt: []
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
            items: res.data.sort((item1, item2) => {
              return (item1.timestamp < item2.timestamp) ? 1 : -1;
            }),
            itemsAvailable: true
          })
          let k = this.state.items.length;
          let temp = [];
          for(let i=0;i<k/2;i++)
            temp.push(i);
          this.setState({
            cnt: temp
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
            items: res.data.sort((item1, item2) => {
              return (item1.timestamp < item2.timestamp) ? 1 : -1;
            }),
            itemsAvailable: true
          });
          let k = this.state.items.length;
          let temp = [];
          for(let i=0;i<k/2;i++)
            temp.push(i);
          this.setState(
          {
            cnt: temp
          })
        });
    }
  }


  render() {

    let displayItems = this.state.items.length > 0 ? (
      this.state.cnt.map((idx, index) => {
        return (
      <div className = "row" key={index}>
              <div className = "col-sm-6">
                <Product update={this.updateStatus} key={this.state.items[idx*2]._id} item={this.state.items[idx*2]} id={this.state.items[idx*2]._id} />
              </div>
              {idx*2+1<this.state.items.length?(<div className = "col-sm-6">
                <Product update={this.updateStatus} key={this.state.items[idx*2+1]._id} item={this.state.items[idx*2+1]} id={this.state.items[idx*2+1]._id} />
              </div>):(' ')}
            </div> )})): (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No items available to display</h2>
      );
    const header = this.state.items.length > 0 ? (
      <div className="container">
        <h2 style={{ marginTop: '15px' }}>
        <img src="https://img.icons8.com/cotton/56/000000/list--v1.png"></img>
        <label className="sellhead">All Your Items:</label></h2>
      </div>
    ) : (
        ''
      );
    return (
      <div>
        <Button />
        {header}
        <div className="container" style={{marginBottom: "20px",maxWidth: "1300px"}}>
            {displayItems}
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