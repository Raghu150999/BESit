import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorize } from './../../utils/authorize'
import { logInUser, logOutUser } from './../../actions/userActions';

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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav homenav">
            <li className="nav-item active">
              <Link to="/profile" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/buy" className="nav-link">Buy</Link>
            </li>
            <li className="nav-item">
              <Link to="/sell" className="nav-link">Sell</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Settings</a> { /* @info: # represents redirecting to same page empty href will do nothing */}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.logOut}>LogOut</a> { /* @debug: Float this to right */}
            </li>
          </ul>
        </div>
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
      dispatch(logInUser(user)); // calling a dispatch action
    },
    logOutUser: () => {
      dispatch(logOutUser());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeNav));