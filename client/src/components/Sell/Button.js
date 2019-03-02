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
        return (
            <div className="container">
                <button className="btn btn-primary btn-lg new-item-btn box-shadow--8dp" onClick={this.onOpenModal}>New</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <Form />
                </Modal>
            </div>
        )
    }
}

export default Button;