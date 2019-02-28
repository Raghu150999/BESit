import React, { Component } from 'react'
import axios from 'axios'

class SignUp extends Component {
    state = {
        error: []
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            username: e.target[0].value,
            fname: e.target[1].value,
            lname: e.target[2].value,
            email: e.target[3].value,
            phoneno: e.target[4].value,
            roomno: e.target[5].value,
            password: e.target[6].value,
            rpassword: e.target[7].value
        };
        axios.post('http://localhost:8000/api/verifyuser', user)
        .then(res => res.data)
        .then(json => {
            if(json.success){
                this.props.history.push('/', {success: true, msg: 'Registered Successfully!'});
            }else{
                let errs = json.errors.map((error) => {
                    return error.msg;
                });
                this.setState({
                    errors: errs
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render(){
        let errBlock = this.state.errors ? (this.state.errors.map((err, idx) => {
            return (
                <div className="alert alert-danger" key={idx}>
                    <strong>Error: </strong> {err}
                </div>
            );
        })) : '';
        return (
            <div className="container signupform">
                <div className="text-center container">
                    <h1 className="display-4">Sign Up</h1>
                </div>
                <div className="container">
                    {errBlock}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Username:</label>
                        <input type="text" name="username" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">First Name:</label>
                        <input type="text" name="fname" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Last Name:</label>
                        <input type="text" name="lname" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Email:</label>
                        <input type="text" name="email" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Phone no:</label>
                        <input type="text" name="phoneno" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Room no:</label>
                        <input type="text" name="roomno" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" name="rpassword" className="form-control" />
                    </div>

                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp;