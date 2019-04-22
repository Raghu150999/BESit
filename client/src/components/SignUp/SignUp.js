import './styles.css';
import React, { Component } from 'react'
import axios from 'axios'
import books from './img/books.jpg';
import youwant from './img/youwant.jpg';
import tired from './img/tired.jpg';
import { Link } from 'react-router-dom'

class SignUp extends Component {
  state = {
    error: []
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: e.target[0].value,
      fname: e.target[1].value,
      phoneno: e.target[2].value,
      password: e.target[3].value,
      rpassword: e.target[4].value
    };
    axios.post('/api/verifyuser', user)
      .then(res => res.data)
      .then(json => {
        if (json.success) {
          this.props.history.push('/', { success: true, msg: 'Registered Successfully!' });
        } else {
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
      <div className="container-register">
        <div className="error">
          {errBlock}
        </div>
        <div className="card mb-3 w-95 " id="card">
          <div className="row no-gutters">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8" >
              <div className="bd-example">
                <div className="flex-centered">
                  <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">

                    <ol className="carousel-indicators">
                      <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">

                      <div className="carousel-item active">
                        <img src={books} className="d-block w-100" alt="Responsive" />
                        <div className="carousel-caption d-none d-md-block">
                          <h2>Your one-stop destination for books</h2>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <img src={youwant} className="d-block w-100" alt="Responsive" />
                        <div className="carousel-caption d-none d-md-block">
                          <h2> Kehte hain ki…agar kisi cheez ko dil se chaaho to BES!T usey tumse milane ki koshish mein lag jaati hai.”</h2>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <img src={tired} className="d-block w-100" alt="Responsive" />
                        <div className="carousel-caption d-none d-md-block">
                          <h2>We don't know who you are. We don't know what you want but we will look for it, we will find it and we will get it to you..</h2>
                        </div>
                      </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="card-body">
                <form className="registerform" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="Username" className="sr-only">UserName</label>
                    <input type="text" className="form-control" name="username" aria-describedby="emailHelp" placeholder="UserName" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Name" className="sr-only">Name</label>
                    <input type="text" className="form-control" name="fname" aria-describedby="emailHelp" placeholder="Name" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="PhoneNo" className="sr-only">Phone Number</label>
                    <input type="text" className="form-control" name="phoneno" aria-describedby="emailHelp" placeholder="Phone Number" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Password" className="sr-only">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="RenterPassword" className="sr-only">Reenter Password</label>
                    <input type="password" className="form-control" name="rpassword" placeholder="Confirm Password" />
                  </div>

                  <div className="container-button">
                    <button type="submit" className="btn btn-primary" id="register-submit">Submit</button>
                  </div>

                  <div className="row">
                    <span className="psw">Already have an account? <Link to="/" id="forgot1"> Login now</Link></span>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;