import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorize } from './../../utils/authorize'
import { logInUser, logOutUser } from './../../actions/userActions';
import './styles.css';
import axios from 'axios';

class HomeNav extends Component {

  state = {
    nofNotifications: 0,
    notifications: [],
    notificationsAvailable: false,
    seenNotifications: false,
    status: ['active', '', '', '', '']
  }

  componentDidMount() {
    if (!this.props.userLoggedIn) {
      const token = localStorage.getItem('access_token');
      authorize(token).then(result => {
        if (result.success) {
          axios.get('/notify/notifications', {
            params: {
              username: result.user.username
            }
          })
            .then(res => {
              let cnt = 0;
              let notifications = res.data;
              for (let i = 0; i < notifications.length; i++) {
                if (!notifications[i].seenStatus) {
                  cnt++;
                }
              }
              this.setState({
                notifications: res.data,
                notificationsAvailable: true,
                nofNotifications: cnt
              });
            })
          this.props.logInUser(result.user);
        }
        else {
          if (result.remove) {
            localStorage.removeItem('access_token');
          }
          this.props.history.push('/login');
        }
      });
    } else {
      axios.get('/notify/notifications', {
        params: {
          username: this.props.user.username
        }
      })
        .then(res => {
          let cnt = 0;
          let notifications = res.data;
          for (let i = 0; i < notifications.length; i++) {
            if (!notifications[i].seenStatus) {
              cnt++;
            }
          }
          this.setState({
            notifications: res.data,
            notificationsAvailable: true,
            nofNotifications: cnt
          });
        });
    }
    let key = this.props.location.state ? this.props.location.state.key : 0;
    let status = [];
    for (let i = 0; i < 5; i++) {
      if (i == key) {
        status.push('active');
      } else {
        status.push('');
      }
    }
    this.setState({
      status
    });
  }

  logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    this.props.logOutUser();
    this.props.history.push('/login');
  }

  calcTime(timestamp) {
    let x = new Date(timestamp);
    let y = new Date();
    let diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    let val;
    if (diff < 3600) {
      val = parseInt(diff / 60);
      if (val != 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      val = parseInt(diff / 3600);
      if (val != 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      val = parseInt(diff / 86400);
      if (val != 1)
        return val + ' days ago';
      else
        return val + ' day ago';
    }
  }

  getNotificationText = (notification) => {
    if (notification.type === 'INTEREST') {
      return (
        <Link to={{pathname: '/sell', state: {key: 2}}} className="notification-element">
          <div className="notification-wrapper">
            <strong>{notification.sourceUsername}</strong> is interested in your item <strong>{notification.productName}</strong><br />
            <small className="text-muted">{this.calcTime(notification.timeStamp)}</small>
          </div>
        </Link>
      );
    } else if (notification.type === 'COMMENT') {
      return (
        <Link to="" className="notification-element">
          <div className="notification-wrapper">
            <strong>{notification.sourceUsername}</strong> commented on your item <strong>{notification.productName}</strong> <br />
            <small className="text-muted">{this.calcTime(notification.timeStamp)}</small>
          </div>
        </Link>
      );
    } else if (notification.type === 'STATUS UPDATE') {
      return (
        <Link to={{pathname: '/user', state: {key: 4}}} className="notification-element">
          <div className="notification-wrapper" onClick={this.directUser}>
            <strong>{notification.sourceUsername + "'s"}</strong> item <strong>{notification.productName}</strong> is now  <strong>{notification.payload.status.toLowerCase()} </strong> <br />
            <small className="text-muted">{this.calcTime(notification.timeStamp)}</small>
          </div>
        </Link>
      );
    } else if (notification.type === 'SHARE CONTACT') {
      return (
        <Link to={{ pathname: '/user', state: { key: 4 } }} className="notification-element">
          <div className="notification-wrapper" onClick={this.directUser}>
            <strong>{notification.sourceUsername}</strong> has shared contact <br />
            <small className="text-muted">{this.calcTime(notification.timeStamp)}</small>
          </div>
        </Link>
      );
    }
    return 'NA';
  }

  notificationHandler = (e) => {
    if (this.state.seenNotifications) {
      return;
    }
    axios.get('/notify/seen', {
      params: {
        username: this.props.user.username
      }
    })
  }

  render() {
    let notifications = this.state.notificationsAvailable ? (
      this.state.notifications.map((notification, index) => {
        let unseen = notification.seenStatus ? '' : 'unseen';
        return (
          <div key={index}>
            <div className="dropdown-divider"></div>
            <button className={"dropdown-item notification-item" + " " + unseen} type="button">
              {this.getNotificationText(notification)}
            </button>
          </div>
        );
      })
    ) : ( '' );
    // Default content when no notification is present
    if (notifications && notifications.length === 0) {
      notifications.push((
        <div key="0">
          <div className="dropdown-divider"></div>
          <button className="dropdown-item notification-item" type="button">
            <strong>No Notifications to show!</strong>
          </button>
        </div>
      ));
    }
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <img src="https://img.icons8.com/nolan/70/000000/shopping-cart.png"/>
        <div className="logoname">
        Bes!t
        </div>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav homenav">
            <li className={"nav-item " + this.state.status[0]}>
              <Link to={{pathname: "/", state: {key: 0}}} className="nav-link">Home</Link>
            </li>
            <li className={"nav-item " + this.state.status[1]}>
              <Link to={{ pathname: "/buy", state: { key: 1 } }} className="nav-link">Buy</Link>
            </li>
            <li className={"nav-item " + this.state.status[2]}>
              <Link to={{ pathname: "/sell", state: { key: 2 } }} className="nav-link">Sell</Link>
            </li>
            <li className={"nav-item " + this.state.status[3]}>
              <Link to={{ pathname: "/requirements", state: { key: 3 } }} className="nav-link">Requirements</Link>
            </li>
            <li className={"nav-item " + this.state.status[4]}>
              <Link to={{ pathname: "/user", state: { key: 4 } }} className="nav-link">User</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.logOut}>Logout</a> { /* @debug: Float this to right */}
            </li>
            <li>
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle notification-dropdown-button" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.notificationHandler}>
                  <img src="https://img.icons8.com/color/32/000000/appointment-reminders.png" className="bell-img" />({this.state.nofNotifications})
                </button>
                <div className="dropdown-menu notification-dropdown">
                  <h6 className="dropdown-header notification-item">Notifications</h6>
                  {notifications}
                </div>
              </div>
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