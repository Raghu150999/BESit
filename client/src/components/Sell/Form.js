import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import upimage from './Product/images/uploadimg.png';

class Form extends Component {
  state = {
    files: null,
    imageAvailable: false,
    err: false
  }

  submitForm = (e) => {
    e.preventDefault();

    if (this.state.err) {
      return;
    }

    // use this type of object passing if endpoint uses bodyparser
    // const formData = {
    //   category: e.target[0].value,
    //   name: e.target[1].value,
    //   price: e.target[2].value,
    //   desc: e.target[3].value,
    //   timestamp: Date(),
    //   owner: this.props.user.username,
    //   status: 'Available'
    // };

    const fd = new FormData();

    // using formData to send multipart/form-data for sending images (important: Have to use multer at the endpoint to process this kind of object passed)

    // appends key-value pairs in the form
    fd.append('category', e.target[0].value);
    fd.append('name', e.target[1].value);
    fd.append('price', e.target[2].value);
    fd.append('desc', e.target[3].value);
    fd.append('timestamp', Date());
    fd.append('owner', this.props.user.username);
    fd.append('status', 'Available');
    fd.append('imageIsAvailable', this.state.imageAvailable);

    // if image is available then append image files to the form
    if (this.state.imageAvailable) {
      const files = this.state.files;
      const len = files.length;
      for (let i = 0; i < len; i++) {
        fd.append('files', files[i], files[i].name);
      }
    }

    axios.post('/uploaditem', fd)
      .then(res => {
        //reload the page after uploading image successfully
        window.location = '/sell';
      });
  }

  checkValidImg = (contentType) => {
    if (contentType === 'image/jpeg' || contentType === 'image/jpg' || contentType === 'image/png' || contentType === 'image/gif')
      return true;
    return false;
  }

  fileSelectHandler = (event) => {
    const len = event.target.files.length;
    let files = [];
    let err = false;
    for (let i = 0; i < len; i++) {
      files.push(event.target.files[i]);
      if (!this.checkValidImg(event.target.files[i].type)) {
        err = true;
      }
    }
    let imageAvailable = false;
    if (err) {
      this.setState({
        imageAvailable,
        err
      });
      return;
    }

    if (files.length > 0)
      imageAvailable = true;
    this.setState({
      files,
      imageAvailable,
      err
    });
  }

  render() {
    let errmsg = this.state.err ? (
      <div className="alert alert-danger">
        <strong>Error: </strong> Images Only!
      </div>
    ) : ('');

    let categories = this.props.categories.map(category => {
      return (
        <option key={category._id}>{category.name}</option>
      )
    });
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>
            <select className="form-control" id="exampleFormControlSelect1">
              {categories}
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
          <h6><img src={upimage} alt="Responsive" /> Upload image</h6>
          <input type="file" name="files" id="files" onChange={this.fileSelectHandler} accept="image/*" multiple />
          {errmsg}
          <button className="btn btn-primary submit-btn" type="submit"> Submit </button>
        </form>
        <br />
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