import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Form extends Component {
  state = {
    files: null,
    imageAvailable: false,
    err: false
  }

  prevdata=this.props.formdata;

  submitForm = (e) => {
        e.preventDefault();
        if (this.state.err) {
            return;
        }
        const formData = {
        category: e.target[0].value,
        name: e.target[1].value,
        price: e.target[2].value,
        desc: e.target[3].value,
        timestamp: Date(),
        owner: this.props.user.username,
        status: 'Available'
        };

        axios.post('/api/updateitem', {form:formData,id:this.prevdata._id})
        .then(res => {
            //reload the page after uploading image successfully
           window.location = '/sell';
        });
  }

  render() {
    let errmsg = this.state.err ? (
      <div className="alert alert-danger">
        <strong>Error: </strong> Images Only!
      </div>
    ) : ('');
    let categories = this.props.categories.map((category,index) => {
      return (
        <option key={category._id}>{category.name}</option>
      )
    });

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>
            <select className="form-control" id="exampleFormControlSelect1 " defaultValue={this.prevdata.category} > 
              {categories}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name Of Item</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg:Harry Potter Books" defaultValue={this.prevdata.name} ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Expected Price(Approx)</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" defaultValue={this.prevdata.price} ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Short Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={this.prevdata.desc} ></textarea>
          </div>
          <button className="btn btn-primary" type="submit"> Submit </button>
        </form>
        <br />
        {errmsg}
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

export default connect(mapStateToProps)(withRouter(Form));