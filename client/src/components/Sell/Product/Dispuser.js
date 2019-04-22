import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Product.css';

class Dispuser extends Component {
  state = {
    Displayuser: null,
    status: null,
    name: null,
    phoneno: null,
    show: false
  }
  
  componentDidMount() {
    this.setState({
      Displayuser: this.props.username,
      status: this.props.status
    });
    axios.get('/api/getContact', {
      params: {
        username: this.props.username
      }
    }).then(res => {
      this.setState({
        name: res.data.name,
        phoneno: res.data.phoneno,
        show: true
      });
    })
  }

  handleShare = (e) => {
    this.setState({
      status: e.target.checked
    });
    this.props.shareStatus(e.target.checked, this.state.Displayuser);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
          <h4 className="card-title">@{this.state.Displayuser}</h4>
            <div className="custom-control custom-checkbox my-1 mr-sm-2">
              <input type="checkbox" className="custom-control-input" id={"customControlInline" + this.state.Displayuser + this.props.id} onClick={this.handleShare} defaultChecked={this.state.status} />
              <label className="custom-control-label shareContact" htmlFor={"customControlInline" + this.state.Displayuser + this.props.id}>Share Contact</label>
            </div>
          </div>
          <h2 className="card-text contact1">Buyer: <label id='contactlabel'> {this.state.name}</label></h2>
          <h2 className="card-text">Phone No: <label id='contactlabel'>{this.state.phoneno}</label></h2>
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
export default connect(mapStateToProps)(Dispuser);