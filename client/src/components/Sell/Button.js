import React, { Component } from 'react';
import Form from './Form';
import Modal from 'react-responsive-modal';
import './Product/Product.css'
import axios from 'axios';

class Button extends Component {

  state = {
    open: false,
    categories: []
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    axios.get('/admin/getcategories')
      .then(res => {
        this.setState({
          categories: res.data
        })
      })
  }

  render() {
    const { open } = this.state;
    return (
      <div className="container">
        <button className="btn btn-primary btn-lg new-item-btn box-shadow--8dp" onClick={this.onOpenModal}>New</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <Form categories={this.state.categories} />
        </Modal>
      </div>
    )
  }
}

export default Button;