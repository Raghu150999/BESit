import React, { Component } from 'react';
import Editform from './Editform';
import Modal from 'react-responsive-modal';
import './Product/Product.css'
import axios from 'axios';

class Edit extends Component {
  state = {
    open: false,
  };
  formdata = []; //get products data from props from Edit button from Products page
  formdata = this.props.item;

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  categories = [];

  componentDidMount() {
    axios.get('/admin/getcategories')
      .then(res => {
        this.categories = res.data;
      })
  }

  render() {

    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.onOpenModal} data-toggle="modal" data-target="#edititem" >
        <img src="https://img.icons8.com/metro/26/000000/pencil.png"/>
        </button>

        <div class="modal fade" id="edititem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog editformdialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body editformbody">
               {
                this.state.open?(
                  <Editform categories={this.categories} formdata={this.formdata} />
                ):(' ')
               }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Edit;