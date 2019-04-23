import React, { Component } from 'react';
import axios from 'axios';
import Interesteditem from './Interesteditem';
import { connect } from 'react-redux';

class InterestedHistory extends Component {
  state = {
    items: [],
    itemsAvailable: false
  }
  getItems = () => {
    console.log(this.props.user);
    if (this.props.user) {
      axios.get('/api/getInterestedItems', {
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
  updateInterest = () => {
    if (this.state.itemsAvailable) {
      axios.get('/api/getInterestedItems', {
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

  render() {
    if (this.props.user && !this.state.itemsAvailable) {
      this.getItems();
    }
    let displayItems = this.state.items.length > 0 ? (
      this.state.items.map((item) => {
        return (
          <Interesteditem key={item._id} item={item} user={this.props.user} update={this.updateInterest} />
        )
      })
    ) : (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No items available to display</h2>
      );
    return (
      <div>
        <div>
          <div className="container" style={{ marginBottom: "20px" }}>
            <div className="row">
              {displayItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}


export default connect(mapStateToProps)(InterestedHistory);