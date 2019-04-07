import React, { Component } from 'react';
import './User.css';
import { connect } from 'react-redux';
import HomeNav from './../HomeNav/HomeNav';
import InterestedHistory from './InterestedHistory';
import Requireitem from './Requireitem';
class User extends Component {
  render() {
    return (
      <div>
        <HomeNav />
        <br />
        <div className="row">
          <div className="col-3 vline">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link active user" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Interested goods History </a>
              <a className="nav-link user" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Requirements History</a>
              <a className="nav-link user" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Change password</a>
              <a className="nav-link user" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Account Settings</a>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><InterestedHistory /></div>
              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><Requireitem /></div>
              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
              <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}


export default connect(mapStateToProps)(User);