import React, { Component } from 'react';
import {logOutUser} from "./../../actions/userActions.js";
import {connect} from 'react-redux';
import axios from 'axios';
class ChangePassword extends Component{
    state={
        err:[]
    }
    logout=(e)=>{
        this.setState({err:[]}); //state updated so it should render again but not because of history push
        let updateduser={
            prevdetails:this.props.user,
            newpassword:e.target[1].value
        }
        axios.post('/api/updatepassword',updateduser)
            .then( (res) => {
                this.props.logout();
                localStorage.removeItem('access_token');
                this.props.history.push('/', { success: true, msg: 'Updated Successfully!' });
            }
        )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if((e.target[0].value!=="")&&(e.target[1].value!="")){
            (this.props.user.password===e.target[0].value)
                ?((e.target[1].value===e.target[2].value)
                            ? (this.logout(e)) : ( this.setState( {err:["Password doesn't match"]} )))
                :(this.setState({err:["enter correct previous password"]}));
        }
        else{
            this.setState({err:["Fill all textfields"]});
        }
    }
    render(){
        let errblk=(this.state.err!="")?(<div className="alert alert-danger" ><strong>Err : </strong>{this.state.err}</div>):(" ");
        return(
            <div >
                <div className="error" >
                    {errblk}
                </div>
                <div style={{marginRight:"50px",marginLeft:"50px",marginBottom:"10px"}}>
                    <h1 id="changepassword">Change Password</h1>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="form-group" id="prof1">
                            <label htmlFor="Currpassword" >Current Password</label>
                            <input type="password" className="form-control" name="Currpassword" aria-describedby="emailHelp" placeholder="Enter current password" />
                        </div>

                        <div className="form-group" id="prof1">
                            <label htmlFor="Newpassword" >New Password</label>
                            <input type="password" className="form-control" name="Newpassword" aria-describedby="emailHelp" placeholder="Enter New password" />
                        </div>

                        <div className="form-group" id="prof1">
                            <label htmlFor="Confpassword" >Confirm Password</label>
                            <input type="password" className="form-control" name="ConfPassword" aria-describedby="emailHelp" placeholder="Confirm password" />
                        </div>

                        <div className="container-button" id="prof">
                            <button type="submit" className="btn btn-primary" id="register-submit">Change</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStatetoProps=(state)=>{
    return {
        userLoggedIn: state.userLoggedIn,
        user: state.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>{
            dispatch(logOutUser());
        }
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ChangePassword);


