import React, { Component } from 'react';
import Form from './Form';
import Modal from 'react-responsive-modal';
import './Product/Product.css'
import Axios from 'axios';

class Edit extends Component {
// display model using state in component
//this refers to all component of class
// any javascript code written outside return of render used by {}
    state = {
        open: false, ///default set to false
    };
    formdata=null;
    onOpenModal = () => {
        this.setState({ open: true });
        //this shoul have api call to get prev data of product
        //res obj store that in local object and pass that as props to form2
        axios.get('/api/getiteminfo').then( (res)=>{
            this.formdata=res.data;
        });
    };
    // closing button pressed or form submit
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        //value of open cant be changed now
        //get prev product details of form from page where edit is being rendered 
        //pass same obj to form as props
        return (
            <div className="container">
                <button className="btn btn-primary btn-lg new-item-btn box-shadow--8dp" onClick={this.onOpenModal}>New</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <Form formdata={this.formdata}/>
                    {/* or create separate form page and send using props data*/}
                </Modal>
                {/* modal is thing which gets displayed when something is clicked */}
            </div>
        )
    }
}
// export {onCloseModel,Button }; // if multiple needed
export default onCloseModal;