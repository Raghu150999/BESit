import React, { Component } from 'react';
import './User.css';
import { connect } from 'react-redux';
import HomeNav from './../HomeNav/HomeNav';
import InterestedHistory from './InterestedHistory';
import Requireitem from './Requireitem';
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";
import AddCategory from "./AddCategory";

class User extends Component {
  
  render() {
    
    //console.log(this.props.user.username);
    var x = this.props.username==='nihaljain'?(
      <a className="nav-link user" id="v-pills-dashboard-tab" data-toggle="pill" href="#v-pills-dashboard" role="tab" aria-controls="v-pills-dashboard" aria-selected="false">Dashboard</a>
    ):(' ');

    return (
      <div>
        <HomeNav />
        <br />
        <div className="row">
          <div className="col-3 vline">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link active user" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="true">Account Settings</a>
              {this.props.user?(
                this.props.user.username=='nihaljain'?(
                    <a className="nav-link user" id="v-pills-dashboard-tab" data-toggle="pill" href="#v-pills-dashboard" role="tab" aria-controls="v-pills-dashboard" aria-selected="false">Dashboard</a>
                ):(' ')
              ):(' ')}
              {this.props.user?(
                this.props.user.username=='nihaljain'?(
                    <a className="nav-link user" id="v-pills-category-tab" data-toggle="pill" href="#v-pills-category" role="tab" aria-controls="v-pills-category" aria-selected="false">Add Category</a>
                ):(' ')
              ):(' ')}
              <a className="nav-link user" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false">Interested goods History </a>
              <a className="nav-link user" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Requirements History</a>
              <a className="nav-link user" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Change password</a>  
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade " id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><InterestedHistory /></div>
              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><Requireitem /></div>
              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><ChangePassword history={this.props.history}/></div>
              <div className="tab-pane fade show active" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
              <div className="tab-pane fade" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab"><Dashboard /></div>
              <div className="tab-pane fade" id="v-pills-category" role="tabpanel" aria-labelledby="v-pills-category-tab"><AddCategory /></div>
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