import './styles.css';
import React, { Component } from 'react';
import axios from 'axios';
import { authorize } from '../../utils/authorize'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logInUser } from './../../actions/userActions';

class LogIn extends Component {
    state = {
        errormsg: '', 
        error: false
    }
// state has been set for login class component
    // already registered user checking toke whether valid or not like expired or what
    componentDidMount() {  //happens before submitting form to check whether he is previous user or not
        const token = localStorage.getItem('access_token');
        authorize(token).then(result => { //calling imported authorize function
            if (result.success) {
                this.props.logInUser(result.user); // storing in redux store of active users
                this.props.history.push('/profile');
            }
            else {
                if (result.remove) {
                    localStorage.removeItem('access_token');
                }
            }
        });
    }
//   if new user like (just registerd )then he gets allocated with token and taken to profile page
// if old user then directly taken by checking prev token logs in automatically (and) if any problem with token it removes token user has to login manually
    handleSubmit = (e) => {
        e.preventDefault(); //prevets refreshing contet //default appended one is .env one and makinig request to ow servers api
        axios.post('/api/login', { //post request to server
            username: e.target[0].value,
            password: e.target[1].value
        })
        .then(res => { //result came after api call
            let user = res.data.user;
            if(res.data.success) {
                // saving access token in the browser
                localStorage.setItem('access_token', res.data.token);
                // adding user to the redux store //storing in redux store of active users
                this.props.logInUser(user); 

                this.props.history.push('/profile');
            }
            else {
                this.setState({
                    errormsg: res.data.msg, 
                    error: true
                });
            }
        });
    }
// better forgot password option instead of re registering because old info gets lost
    render() { //as component requested this runs first
        let msgBlock = this.props.location.state && this.props.location.state.success ? (
            <div className="alert alert-success">
                <strong>Success: </strong> {this.props.location.state.msg}
            </div>
        ) : (
            ''
        );
        if(this.props.location.state)
            this.props.location.state.success = false;// to make success message disappear
        let errBlock = this.state.error ? (
            <div className="alert alert-danger">
                <strong>Error: </strong> {this.state.errormsg}
            </div>
        ) : ('');// for first time component running every thing is false not work
        return (
            <div className="container-login100">
                {msgBlock}
                {errBlock}
                {/* //both null */}
                <form className="loginform" onSubmit={this.handleSubmit}> 
                    {/* //make enter also works here */}
                    <h1 id="title">Want to sell? Want to Buy?<br />BESit Karo. Lite lo.</h1>
                    <div className="form-group">
                        <div className="wrap-input100 validate-input" data-validate="Enter username">
                            <label htmlFor="Username">UserName</label>
                            <input type="text" className="form-control" name="username" aria-describedby="emailHelp" placeholder="UserName" />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary" id="index-submit">Submit</button>
                        <span className="psw">Don't have an account? <Link to="/signup" id="forgot"> Register now.</Link></span>
                    </div>              
                </form>
        </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (user) => {
            dispatch(logInUser(user)); // calling a dispatch action
        }
    }
}

export default connect(null, mapDispatchToProps)(LogIn);