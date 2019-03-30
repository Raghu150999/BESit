import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { authorize } from '../../utils/authorize';
import axios from 'axios';
import { logOutUser, logInUser } from './../../actions/userActions';
import HomeNav from '../HomeNav/HomeNav';
// check in database and redux store and modal and how local storage access token given
// map always creates a new array with older values manipulated in function(old_value){return new value;} stores them in new array
class Profile extends Component {
  state = {
    error: [],
    user: {
      username: null,
      fname: null,
      lname: null,
      email: null,
      phoneno: null,
      roomno: null,
      password: null
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('access_token');
    // authorize token is just async method check if null directly return if not null verify using api call to own server axios
    authorize(token).then(result => {
      if (result.success) {
        this.props.logInUser(result.user); // Saving it to redux store
        this.setState({
          user: {
            ...result.user
            // if success makes all values res.user values by updating state now user can see his previous values
          }
        });
      }
      // if api call and result is failed then remove==true and token is removed
      //push him to first page i.e (login page)
      else {
        if (result.remove) {
          localStorage.removeItem('access_token');
        }
        this.props.history.push('/');
      }
    });
  }
  logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('access_token'); // we have to remove this if he logs out because if not then in login page after pushing him again 
    // it get checked and push him back to profile page 
    this.props.logOutUser();// redux store logout
    this.props.history.push('/');// push him to login page
  }
  handleSubmit = (e) => {
    // submit is clicked
    e.preventDefault();
    let user = {
      username: e.target[0].value,
      fname: e.target[1].value,
      lname: e.target[2].value,
      email: e.target[3].value,
      phoneno: e.target[4].value,
      roomno: e.target[5].value,
      password: e.target[6].value,
    };
    axios.post('/api/updateuser', user)
    // call axios update user
      .then(res => res.data) .then(json => {// json is variable name for res.data
        if (json.success) {
          console.log("successful");
          this.setState({
            error: []
          });
          // remove this and pop just updated successfully of password and username changes then only he has to be logged out and pushed to first page
          // only password and username change this should happen other wise just normal updated message
          localStorage.removeItem('access_token');
          this.props.logOutUser();
          this.props.history.push('/', { success: true, msg: 'Updated Successfully!' });
        }
        else {
          // errors array from res.data runs on map function each time error variable updated and errs[] array stores error(errors[i]).msg
          let errs = json.errors.map((error) => {
            return error.msg;
          });
          //errs will be array of message objects errors[i].msg
          this.setState({
            errors: errs
          });
        }
      })
      // error from axios server error user side it just rotates only he need not to be informed
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    //first state run and then render runs so no errors when loaded first
    let errBlock = this.state.errors ? (this.state.errors.map((err, idx) => {
      return (
        <div className="alert alert-danger" key={idx}>
          <strong>Error: </strong> {err}
          {/* print all errors in one go only */}
        </div>
      );
    })) : '';

    return (
      <div className="profile">
        {/* this is nav bar which is present every where */}
        <HomeNav /> 

        <div id="profilecard">
          <h1 id="profiletitle">YOUR PROFILE</h1>
          {/* form for editing this should be in settings page */}
          <form className="registerform" onSubmit={this.handleSubmit}>
            {/* check for errors on submitiing and update state so rerendering makes first error checking */}


            {/* every value will be null as soon as openned but as component did mount runs it checks local storage access token if exists update with 
            original your info */}
            <div className="form-group" id="prof1">
              <label htmlFor="Username" >UserName</label>
              <input type="text" className="form-control" name="username" aria-describedby="emailHelp" defaultValue={this.state.user.username} disabled />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="FirstName" >First Name</label>
              <input type="text" className="form-control" name="fname" aria-describedby="emailHelp" defaultValue={this.state.user.fname} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="LastName" >Last Name</label>
              <input type="text" className="form-control" name="lname" aria-describedby="emailHelp" defaultValue={this.state.user.lname} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="Email">Email</label>
              <input type="text" className="form-control" name="email" aria-describedby="emailHelp" defaultValue={this.state.user.email} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="PhoneNo">Phone Number</label>
              <input type="text" className="form-control" name="phoneno" aria-describedby="emailHelp" defaultValue={this.state.user.phoneno} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="RoomNo">Room Number</label>
              <input type="text" className="form-control" name="roomno" aria-describedby="emailHelp" defaultValue={this.state.user.roomno} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="Password">Password</label>
              <input type="text" className="form-control" name="password" />
              {/* type should be password i should make option for change password */}
            </div>
            {/* click submit button onohandle method called */}
            <div className="container-profile-button" id="prof">
              <button type="submit" className="btn btn-primary" id="register-submit">Submit</button>
            </div>

          </form>
        </div>
        <div className="error">
          {errBlock}
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

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (user) => {
      dispatch(logInUser(user));
    },
    logOutUser: () => {
      dispatch(logOutUser());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);