import React, { Component } from 'react';
import Form from './Form';
import Modal from 'react-responsive-modal';
import './Product/Product.css'

class Button extends Component {

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        //value of open cant be changed now
        return (
            <div className="container">
                <button className="btn btn-primary btn-lg new-item-btn box-shadow--8dp" onClick={this.onOpenModal}>New</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <Form />
                </Modal>
                {/* modal is thing which gets displayed when something is clicked */}
            </div>
        )
    }
}

export default Button;