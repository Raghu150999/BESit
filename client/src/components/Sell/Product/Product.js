import React, { Component } from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'
import axios from 'axios';
import Dispuser from './Dispuser.js';
import { connect } from 'react-redux';
import Edit from './../Edit';
import CommentList from './../../Comments/CommentList';


class Product extends Component {
  state = {
    open: false,
    Displayusers: [],
    usersList: '',
    comments: []
  }

  componentDidMount() {
    let usersList = this.props.item.interestedUsers.length > 0 ? (
      this.props.item.interestedUsers.map((Displayuser, index) => {
        return (
          <div key={index}>
            <Dispuser username={Displayuser.username} status={Displayuser.status} key={Displayuser.username} shareStatus={this.shareStatus} id={this.props.item._id} />
          </div>
        )
      })
    ) : (
        <div>
          <br />
          <h4 className="card-title">Sorry! No users to display!</h4>
        </div>
      );
    axios.get('/comment/getcomments', {
      params: {
        id: this.props.item._id
      }
    })
      .then(res => {
        let comments = res.data;
        this.setState({
          comments
        })
      });
    this.setState({
      usersList
    });
  }

  handleDeleteComment = (id) => {
    let comments = this.state.comments.filter(comment => {
      return (comment._id != id);
    });
    this.setState({
      comments
    });
    axios.post('/comment/deletecomment', {
      id
    });
  }

  handlePost = (e) => {
    e.preventDefault();
    // Add a new comment
    let comment = {
      text: e.target[0].value,
      owner: this.props.item.owner,
      username: this.props.user.username,
      itemName: this.props.item.name,
      itemID: this.props.item._id,
      timestamp: new Date()
    }
    e.target[0].value = '';
    let comments = this.state.comments;
    axios.post('/comment/addcomment', comment)
      .then(res => {
        comments.unshift(res.data);
        this.setState({
          comments
        });
      });
  }

  shareStatus = (status, username) => {
    axios.post('/api/shareStatus', {
      item: this.props.item,
      username: username,
      status: status
    });
    let item = this.props.item;
    let notification = {
      sourceUsername: item.owner,
      targetUsername: username,
      type: 'SHARE CONTACT',
      productID: item._id,
      productName: item.name,
      seenStatus: false,
      timeStamp: new Date(),
      payload: {
        status
      }
    };
    axios.post('/notify/shareContact', notification);
  }

  calcTime(timestamp) {
    let x = new Date(timestamp);
    let y = new Date();
    let diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    let val;
    if (diff < 3600) {
      val = parseInt(diff / 60);
      if (val != 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      val = parseInt(diff / 3600);
      if (val != 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      val = parseInt(diff / 86400);
      if (val != 1)
        return val + ' days ago';
      else
        return val + ' day ago';
    }
  }

  updateStatus = (status, id) => {
    axios.post('/api/updateitemstatus', {
      status,
      id,
      owner: this.props.user.username
    })
    let item = this.props.item;
    let notifications = [];
    for (let i = 0; i < item.interestedUsers.length; i++) {
      let notification = {
        targetUsername: item.interestedUsers[i].username,
        sourceUsername: item.owner,
        type: 'STATUS UPDATE',
        productID: item._id,
        productName: item.name,
        seenStatus: false,
        timeStamp: new Date(),
        payload: {
          status
        }
      };
      notifications.push(notification);
    }
    axios.post('/notify/interestedUsers', notifications)
      .then(res => {
      })
  }

  render() {

    let item = this.props.item;
    const api_uri = process.env.REACT_APP_API_URI_LOCAL;
    if (!item.desc) {
      item.desc = 'No description provided';
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
        <div className="carousel-item" key={i + ""}>
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
          window.location = '/sell';
        })
    }

    const getInterestedUsers = (e) => {
      this.setState({
        open: true
      });
    }


    return (
      <div className="product">
        <div className="col-sm-auto">
          <div className="card box-shadow--8dp">

            <div id={"images" + item._id} className="carousel slide" data-ride="carousel">
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

            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <div className="container desc-list">
                <dl className="row">
                  <dt className="col-sm-4">Price:</dt>
                  <dd className="col-sm-8">{String.fromCharCode(8377) + " " + item.price}</dd>
                  <dt className="col-sm-4">Desc:</dt>
                  <dd className="col-sm-8">{item.desc}</dd>
                </dl>

                {<Dropdown update={this.updateStatus} id={this.props.id} current={this.props.item.status} />}

                <div className="bttns">
                  <dl className="row">
                    <dt className="col-sm-0">
                      <button type="button" className="btn btn-default" onClick={handleDelete}>
                        <img src="https://img.icons8.com/material-outlined/24/000000/waste.png" />
                      </button></dt>

                    <dt className="col-sm-0">
                      <Edit key={this.props.id} item={this.props.item} /></dt>

                    <div className="card-text int-card-text time"><small className="text-muted">{this.calcTime(this.props.item.timestamp)}</small></div>
                    <dt className="col-sm-3">
                      <button type="button" className="btn btn-default" onClick={getInterestedUsers} data-toggle="modal" data-target={"#exampleModal" + this.props.item._id}>
                        <img src="https://img.icons8.com/ios-glyphs/24/000000/visible.png" />
                      </button>
                      </dt>
                      
                      <dt>
                      <button type="button" className="btn btn-default" onClick={() => { }} data-toggle="modal" data-target={"#commentsModal" + this.props.item._id}>
                        <img src="https://img.icons8.com/metro/24/000000/comments.png" />
                      </button></dt>
                      </dl>

                  {/* Interested Users Modal */}
                  <div className="modal interested-users-modal fade" id={"exampleModal" + this.props.item._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog interestDialog" role="document">
                      <div className="modal-content" style={{ width: "150%" }}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Interested Buyers</h5>
                          <button type="button" className="close interest" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="cross-btn">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body interestBody">
                          {
                            this.state.open ? (
                              this.state.usersList
                            ) : ('')
                          }
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments Modal */}
                  <div className="modal interested-users-modal fade" id={"commentsModal" + this.props.item._id} tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog interestDialog" role="document">
                      <div className="modal-content" style={{ width: "150%" }}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="commentModalLabel">Comments</h5>
                          <button type="button" className="close interest" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="cross-btn">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body interestBody">
                          <CommentList handlePost={this.handlePost} comments={this.state.comments} handleDeleteComment={this.handleDeleteComment} username={this.props.user.username} />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
