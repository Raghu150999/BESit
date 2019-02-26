import React, { Component } from 'react'
import HomeNav from './HomeNav';
import { connect } from 'react-redux';
import { authorize } from '../utils/authorize';


class Profile extends Component {
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
            <HomeNav logOut={this.logOut}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);