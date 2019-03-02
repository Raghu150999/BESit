import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Form extends Component{
  state = {
      formData : {
          field1 : '',
          field2 : ''
      }
  }

  submitForm = (e) =>{
    e.preventDefault();
    const formData = {
      category: e.target[0].value,
      name: e.target[1].value,
      price: e.target[2].value,
      desc: e.target[3].value,
      rating: e.target[4].value,
      timestamp: Date(), 
      owner: this.props.user.username, 
      status: 'NOT SOLD'
    };
    axios.post('https://powerful-hamlet-87555.herokuapp.com/api/additem', { formData })
      .then(res => {
        // Display message item added
      });
    
    // Reloads the page
    window.location = '/sell';
  }

  render(){
      return(
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Text/Reference Books</option>
              <option>Stationery</option>
              <option>Electronics</option>
              <option>Novels</option>
              <option>Miscellaneous</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name Of Item</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg:Harry Potter Books"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Expected Price(Approx)</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Short Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Condition</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1 star</option>
              <option>2 stars</option>
              <option>3 stars</option>
              <option>4 stars</option>
              <option>5 stars</option>
            </select>
          </div>
          <button> Submit </button>
        </form>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Form));