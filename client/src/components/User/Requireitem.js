import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Reqitem from './Reqitem';
import './../Requirements/Requirements.css';
class Requireitem extends Component {
  state =
    {
      requirements: [],
      reqavailable: false
    };

  getReq = () => {
    if (this.props.user) {
      axios.get('/api/getownreq', {
        params: {
          username: this.props.user.username
        }
      }).then(res => {
        this.setState(
          {
            requirements: res.data.reverse(),
            reqavailable: true
          });
      });
    }
  }

  handleDelete = () => {
    if (this.state.reqavailable) {
      axios.get('/api/getownreq', {
        params: {
          username: this.props.user.username
        }
      }).then(res => {
        this.setState(
          {
            requirements: res.data.reverse(),
            reqavailable: true
          });
      });
    }
  }

  render() {
    if (this.props.user && !this.state.reqavailable) {
      this.getReq();
    }

    let displayItems = this.state.requirements.length > 0 ? (
      this.state.requirements.map((requirement) => {
        return (
          <Reqitem key={requirement._id} requirement={requirement} user={this.props.user} delete={this.handleDelete} />
        )
      })
    ) : (
        <h2 style={{ marginTop: '15px', textAlign: 'center' }}>No requirements to display</h2>
      );
    return (
      <div>
        <div>
          <div className="container" style={{ marginBottom: "20px" }}>
            {displayItems}
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


export default connect(mapStateToProps)(Requireitem);