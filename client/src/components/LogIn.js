import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component {
    state = {
        errormsg: '', 
        error: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            username: e.target[0].value,
            password: e.target[1].value
        })
        .then(res => {
            let user = res.data.user;
            if(res.data.success)
                this.props.history.push('/profile/' + user._id, {
                    user
                });
            else {
                this.setState({
                    errormsg: res.data.msg, 
                    error: true
                });
            }
        });
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.history.push('/signup');
    }
    render() {
        console.log(this.props);
        let msgBlock = this.props.location.state && this.props.location.state.success ? (
            <div className="alert alert-success">
                <strong>Success: </strong> {this.props.location.state.msg}
            </div>
        ) : (
            ''
        );
        if(this.props.location.state)
            this.props.location.state.success = false;
        let errBlock = this.state.error ? (
            <div className="alert alert-danger">
                <strong>Error: </strong> {this.state.errormsg}
            </div>
        ) : ('');
        return (
            <div className="container loginform">
                {msgBlock}
                {errBlock}
                <form onSubmit={this.handleSubmit}>
                    <div className="text-center container">
                        <h1 className="display-4">
                            LogIn
                        </h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Username:</label>
                        <input type="text" name="username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password:</label>
                        <input type="password" className="form-control" name="password"/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
                <div className="container register">
                    <buttton className="btn btn-link" onClick={this.handleRegister}>Register</buttton>
                </div>
            </div>
        )
    }
}

export default LogIn;