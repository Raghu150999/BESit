import React, { Component } from 'react';
import Form from './Form';
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
    return (
      <div className="container">
        <button className="btn btn-primary btn-xs new-item-btn box-shadow--8dp" onClick={this.onOpenModal} data-toggle="modal" data-target="#uploaditem">
        +
        </button>

        <div className="modal fade" id="uploaditem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog uploadItemDialog" role="document">
            <div className="modal-content" style = {{width:"150%"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload Item</h5>
                <button type="button" className="close" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body uploadItemBody">
                {
                  this.state.open?(
                    <Form categories={this.state.categories} />
                  ):('')
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Button;