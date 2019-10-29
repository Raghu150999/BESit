import React, { Component } from 'react';
import Editform from './Editform'; 
import Modal from 'react-responsive-modal';
import './Product/Product.css' 
import axios from 'axios';

class Edit extends Component { 
    state = {
        open: false,
    };
    formdata=[]; //get products data from props from Edit button from Products page
    formdata=this.props.item;

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    categories=[];

    componentDidMount() {
        axios.get('/admin/getcategories')
          .then(res => {
            this.categories=res.data;
          })
    }

    render() {

        return (
            <div className="container">
                <button className="btn btn-primary btn-lg edit-item-btn box-shadow--8dp" onClick={this.onOpenModal}>Edit product</button>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <Editform categories={this.categories} formdata={this.formdata}/>
                </Modal>
            </div>
        )
    }
}
export default Edit;