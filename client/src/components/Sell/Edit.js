import React, { Component } from 'react';
import Editform from './Editform';
import './Product/Product.css'
import axios from 'axios';

class Edit extends Component {
  state = {
    open: false,
  };
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
        <button type="button" className="btn btn-default" onClick={this.onOpenModal} data-toggle="modal" data-target={"#edititem" + this.props.item._id} >
        <img src="https://img.icons8.com/metro/26/000000/pencil.png"/>
        </button>

        <div className="modal fade" id={"edititem" + this.props.item._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog editformdialog" role="document">
            <div className="modal-content" style = {{width:"150%"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" className="close" onClick={this.onCloseModal} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" className="cross-btn">&times;</span>
                </button>
              </div>
              <div className="modal-body editformbody">
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