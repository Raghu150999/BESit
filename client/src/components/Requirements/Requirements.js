import React, { Component } from 'react';
import HomeNav from './../HomeNav/HomeNav';
import Modal from 'react-responsive-modal';
import './Requirements.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Requirement from './Requirement';

const Styles =
{
  content:
  {
    height: '500 px',
    width: '500 px'
  }
};

class Requirements extends Component {

  state =
    {
      open: false,
      requirements: []
    };

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.err)
      return;

    const formData =
    {
      title: e.target[0].value,
      desc: e.target[1].value,
      timestamp: Date(),
      username: this.props.user.username
    };

    axios.post('/api/newreq', formData).then(
      res => {
        window.location = '/requirements';
      });
  }

  openModal = () => {
    //console.log('Modal opened');
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <HomeNav />
        <Requirement />
        <div className="req-container">
          <button className="btn btn-primary btn-lg new-item-btn box-shadow--8dp" onClick={this.openModal}>+</button>
          <Modal
            open={open}
            onClose={this.closeModal}
            style={Styles}>
            <h4><strong><center>New Requirement</center></strong></h4>
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="Title"></input>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea type="text" className="form-control" placeholder="About Requirement" rows="3"></textarea>
              </div>
              <button>Submit</button>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  };
};

export default connect(mapStateToProps)(Requirements);