import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import onCloseModal from 'Edit.js';
//// is this modal
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
      status: 'Available'
    };
    axios.post('/api/additem', { formData })
      .then(res => {
        // Display message item added
        //here set local array to this and editing/
      });
    
    // Reloads the page
    //after data has been stored
    //onCloseModal;
     //wot work because duplicate object from that page not call by reference
    //also erro because no this.state.close here
    window.location = '/sell';
  }
/// make router call just 
  render(){
    let array[];
    if (this.props.formData==null){
        array[1]="eg:Harry Potter Books";
    } //then place holders will havesome string otherwise prev data that logic write here
    else{
        array=this.props.formData;
    }
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
            {/* dropdown */}

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
            {/* default text also put*/}
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Condition</label>
            <select className="form-control" id="exampleFormControlSelect1">
                {/* efault select option should also */}
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