import './styles.css'
import React, { Component } from 'react'
import HomeNav from '../HomeNav/HomeNav';
import { connect } from 'react-redux';
import { authorize } from '../../utils/authorize';
import axios from 'axios'

class Profile extends Component {
    state={
        error: [],
        user:{
            username:null,
            fname:null,
            lname:null,
            email:null,
            phoneno:null,
            roomno:null,
            password:null
        }
    }
    componentDidMount() 
    {
            const token = localStorage.getItem('access_token');
            authorize(token).then(result => {
                if (result.success) {
                    this.props.logInUser(result.user);
                    this.setState({
                        user: {
                        username: result.user.username,
                        fname:result.user.fname,
                        phoneno: result.user.phoneno,
                        roomno: result.user.roomno,
                        lname: result.user.lname,
                        email:result.user.email,
                        password:result.user.password
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
            lname: e.target[2].value,
            email: e.target[3].value,
            phoneno: e.target[4].value,
            roomno: e.target[5].value,
            password: e.target[6].value,
        };
        axios.post('http://localhost:8000/api/updateuser', user)
        .then(res => res.data)
        .then(json => {
            if(json.success){
                console.log("successful");
                this.setState({
                    error: []
                });
                localStorage.removeItem('access_token');
                this.props.logOutUser();
                this.props.history.push('/',{success: true, msg: 'Update Successfully!'});
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
                <HomeNav logOut={this.logOut}/>
               <div id="profilecard">
                    <h1 id="profiletitle">YOUR PROFILE</h1>
                    <form className="registerform" onSubmit={this.handleSubmit}>
                    <div className="form-group" id="prof1">
                        <label for="Username" >UserName</label>
                        <input type="text" className="form-control" name="username" aria-describedby="emailHelp" defaultValue={this.state.user.username} disabled/>
                    </div>

                    <div className="form-group" id="prof">
                        <label for="FirstName" >First Name</label>
                        <input type="text" className="form-control" name="fname" aria-describedby="emailHelp" defaultValue={this.state.user.fname}/>
                    </div>

                    <div className="form-group" id="prof">
                        <label for="LastName" >Last Name</label>
                        <input type="text" className="form-control" name="lname" aria-describedby="emailHelp" defaultValue={this.state.user.lname}/>
                    </div>
                    
                    <div className="form-group" id="prof">
                        <label for="Email">Email</label>
                        <input type="text" className="form-control" name="email" aria-describedby="emailHelp" defaultValue={this.state.user.email}/>
                    </div>
                    
                    <div className="form-group" id="prof">
                        <label for="PhoneNo">Phone Number</label>
                        <input type="text" className="form-control" name="phoneno" aria-describedby="emailHelp" defaultValue={this.state.user.phoneno}/>
                    </div>
                    
                    <div className="form-group" id="prof">
                        <label for="RoomNo">Room Number</label>
                        <input type="text" className="form-control" name="roomno" aria-describedby="emailHelp" defaultValue={this.state.user.roomno}/>
                    </div>

                    <div className="form-group" id="prof">
                        <label for="Password">Password</label>
                        <input type="text" className="form-control" name="password" defaultValue={this.state.user.password}/>
                    </div>

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

export default (Profile);