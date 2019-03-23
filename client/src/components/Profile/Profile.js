import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { authorize } from '../../utils/authorize';
import axios from 'axios';
import { logOutUser, logInUser } from './../../actions/userActions';
import HomeNav from '../HomeNav/HomeNav';

class Profile extends Component {
  state = {
    error: [],
    user: {
      username: null,
      fname: null,
      phoneno: null,
      password: null
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('access_token');
    authorize(token).then(result => {
      if (result.success) {
        this.props.logInUser(result.user); // Saving it to store
        this.setState({
          user: {
            ...result.user
          }
        });
      }
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
    localStorage.removeItem('access_token');
    this.props.logOutUser();
    this.props.history.push('/');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: e.target[0].value,
      fname: e.target[1].value,
      phoneno: e.target[2].value,
      password: e.target[3].value,
    };
    axios.post('/api/updateuser', user)
      .then(res => res.data)
      .then(json => {
        if (json.success) {
          console.log("successful");
          this.setState({
            error: []
          });
          localStorage.removeItem('access_token');
          this.props.logOutUser();
          this.props.history.push('/', { success: true, msg: 'Updated Successfully!' });
        }
        else {
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
  passChange =(e)=>{
    e.preventDefault();
  }

  render() {
    let errBlock = this.state.errors ? (this.state.errors.map((err, idx) => {
      return (
        <div className="alert alert-danger" key={idx}>
          <strong>Error: </strong> {err}
        </div>
      );
    })) : '';
    return (
      <div className="profile">
        <HomeNav />
        <div id="profilecard">
          <h1 id="profiletitle">YOUR PROFILE</h1>
          <form className="registerform" onSubmit={this.handleSubmit}>
            <div className="form-group" id="prof1">
              <label htmlFor="Username" >UserName</label>
              <input type="text" className="form-control" name="username" aria-describedby="emailHelp" defaultValue={this.state.user.username} disabled />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="FirstName" >Name</label>
              <input type="text" className="form-control" name="fname" aria-describedby="emailHelp" defaultValue={this.state.user.fname} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="PhoneNo">Phone Number</label>
              <input type="text" className="form-control" name="phoneno" aria-describedby="emailHelp" defaultValue={this.state.user.phoneno} />
            </div>

            <div className="form-group" id="prof">
              <label htmlFor="Password">Password</label>
              <input type="password" className="form-control" name="password" defaultValue={this.state.user.password} disabled onClick={this.passChange}/>
            </div>

            <div className="container-button" id="prof">
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