import React, { Component } from 'react';
import './../Requirements/Requirements.css';
import axios from 'axios';

class Reqitem extends Component {

  calcTime(timestamp) {
    let x = new Date(timestamp);
    let y = new Date();
    let diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    if (diff < 3600) {
      let val = parseInt(diff / 60);
      if (val != 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      let val = parseInt(diff / 3600);
      if (val != 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      let val = parseInt(diff / 86400);
      if (val != 1)
        return val + ' days ago';
      else
        return val + ' day ago';
    }
  }
  handleDelete = (e) => {
    let confirmation = window.confirm('This action will permanently delete this item. Do you want to continue?');
    if (!confirmation)
      return;
    axios.post('/api/removereq', this.props.requirement)
      .then(res => {
        this.props.delete(this.props.requirement);
      })
  }
  render() {
    return (
      <div className="container req-container">
        <div className="row">
          <div className="col-sm-6">
            <div className="req-card card">
              <div className="card-body req-card-body">
                <div className="card-title req-card-title"><strong>{this.props.requirement.title}</strong></div>
                <div className="card-text req-card-text username">{this.props.requirement.username}</div>
                <div className="card-text req-card-text desc">{this.props.requirement.desc}</div>
                <div className="card-text req-card-text time"><small className="text-muted">{this.calcTime(this.props.requirement.timestamp)}</small></div>
                <button type="button" className="btn btn-dark req-delbtn" onClick={this.handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reqitem;