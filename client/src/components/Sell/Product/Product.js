import React, { Component } from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import Dispuser from './Dispuser.js';
import { connect } from 'react-redux';

class Product extends Component {
  state={
  open:false,
  Displayusers:[]
  }

  shareStatus = (status,username) =>{
    axios.post('/api/shareStatus', {
      item: this.props.item,
      username: username,
      status: status
    }).then(res=>{
    });
  }
  render(){
   let item = this.props.item;
  const api_uri = process.env.REACT_APP_API_URI_LOCAL;
  // generating elements for ol
  let varOl = [];

  // hard-coding first image for giving className="active"
  varOl.push((
    <li data-target={"#images" + item._id} data-slide-to="0" className="active" key="0"></li>
  ));

  for(let i = 1; i < item.fileNames.length; i++) {
    varOl.push((
      <li data-target={"#images" + item._id} data-slide-to={i+""} key={i+""}></li>
    ));
  }

  // generating carousel elements
  let carouselElements = [];
  if (item.fileNames.length > 0) {
    carouselElements.push((
      <div className="carousel-item active" key="0">
        <img src={api_uri + "/image/" + item.fileNames[0]} className="card-img-top" alt="Responsive" />
      </div>
    ));
  } else { 
    // Default image if no image is available.
    carouselElements.push((
      <div className="carousel-item active" key="0">
        <img src="https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2015%2F06%2F521811839-copy.jpg&w=800&c=sc&poi=face&q=85" className="card-img-top" alt="Responsive" />
      </div>
    ));
  }

  for (let i = 1; i < item.fileNames.length; i++) {
    carouselElements.push((
      <div className="carousel-item" key={i+""}>
        <img src={api_uri + "/image/" + item.fileNames[i]} className="card-img-top" alt="Responsive" />
      </div>
    ));
  }

  const handleDelete = (e) => {
    let confirmation = window.confirm('This action will permanently delete this item. Do you want to continue?');
    if (!confirmation) 
      return;
    axios.post('/removeitem', this.props.item)
      .then(res => {
        console.log(res.data);
        window.location = '/sell';
      })
  }

  const getInterestedUsers =(e)=>{
    axios.get('/api/getInterestedUsers',{
      params: {
        id: item._id
      }
    }).then(res => {
      this.setState({
        Displayusers:res.data
      }); 
      this.setState({
        open:true
      });
    });
  }

  const onCloseModal = (e) => {
    this.setState({
      open:false
    });
  };

  let usersList = this.state.Displayusers.length>0?(
    this.state.Displayusers.map((Displayuser) =>{
          return(
           <Dispuser username={Displayuser.username} status={Displayuser.status} key={Displayuser.username} shareStatus={this.shareStatus} />
          )
        })
    ) : (
      <div>
      <br/>
      <h4 className="card-title">Sorry! No users to display!</h4>
      </div>
    );

    return (
    <div className="Product">
      <div className="row">
        <div className="col-sm">
          <div className="prod-card">
              <div id={"images" + item._id} className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                  {varOl}
                </ol>

                <div className="carousel-inner">
                  {carouselElements}
                </div>

              <a className="carousel-control-prev" href={"#images" + item._id} role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>

              <a className="carousel-control-next" href={"#images" + item._id} role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="card-body">
              <h2 className="card-title">{this.props.item.name}<button type="button" className="btn btn-dark prod-btn">&#8377; {this.props.item.price}</button></h2>
              <p className="card-text desc">{this.props.item.desc}</p>
              {<Dropdown update={this.props.update} id={this.props.id} current={this.props.item.status} />}
              
              <div className="row">
                <div className="col-12-md">
                  <button type="button" className="btn btn-dark prod-btn" onClick={handleDelete}>Delete</button>
                  <br/><br/>
                </div>
              </div>

              <div className="row">
                 <div className="col-12-md"> 
                  <button type="button" className="btn btn-dark prod-btn" onClick={getInterestedUsers} >Interested Users</button>
                    <Modal open={this.state.open} onClose={onCloseModal} center>
                    {usersList  }
                    </Modal>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
  );
  }
}
const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
}


export default connect(mapStateToProps)(Product);