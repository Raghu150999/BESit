import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
<<<<<<< HEAD
import './styles.css';
=======
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorize } from './../../utils/authorize'
>>>>>>> test

class HomeNav extends Component {
    componentDidMount() {
        if (!this.props.userLoggedIn) {
            const token = localStorage.getItem('access_token');
            authorize(token).then(result => {
                if (result.success) {
                    this.props.logInUser(result.user);
                }
                else {
                    if (result.remove) {
                        localStorage.removeItem('access_token');
                    }
                    this.props.history.push('/');
                }
            });
        }
    }
    logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        this.props.logOutUser();
        this.props.history.push('/');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
<<<<<<< HEAD
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav homenav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Buy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sell</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Settings</a> { /* @info: # represents redirecting to same page empty href will do nothing */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.props.logOut}>LogOut</a> { /* @debug: Float this to right */ }
                        </li>
                    </ul>
                </div>
=======
                <ul className="navbar-nav homenav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile">Home</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Buy</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/sell" className="nav-link">Sell</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a> { /* @info: # represents redirecting to same page empty href will do nothing */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="" onClick={this.logOut}>LogOut</a> { /* @debug: Float this to right */ }
                    </li>
                </ul>
>>>>>>> test
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userLoggedIn,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (user) => {
            dispatch({ type: 'LOGIN_USER', user: user }); // calling a dispatch action
        },
        logOutUser: () => {
            dispatch({ type: 'LOGOUT_USER' });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeNav));