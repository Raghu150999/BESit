import React, { Component } from 'react';
import Form from './Form';
import Modal from 'react-responsive-modal';

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
                <button className="btn btn-primary btn-lg" onClick={this.onOpenModal}>
                    Upload New Item
                </button>
                <Modal open={open} onClose={ this.onCloseModal} center>
            <Form/>
        </Modal>
            </div>
        )
    }
}

export default Button;