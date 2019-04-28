import React, { Component } from 'react';
import axios from 'axios';
import CommentListReq from './../Comments/CommentListReq';
import { connect } from 'react-redux';

class Requirement extends Component {
  state =
    {
      requirements: []
    };

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

  componentDidMount() {
    axios.get('/api/getreq').then(res => {
      //console.log(res.data[0]);
      this.setState(
        {
          requirements: res.data
        });
    });
  }

  render() {
    let x = this.state.requirements;
    let y = [];
    for (let i = 0; i < x.length / 2; i++)
      y.push(i);
    let t = this.state.requirements.length > 0 ?
      (y.map((requirement, index) => {
        return (
          <div className="container req-container" key={index}>
            <div className="row">
              <div className="col-sm-6">
                <div className="card req-card">
                  <div className="card-body req-card-body">
                    <div key={index}>
                      <div className="card-title req-card-title"><strong>{x[index * 2].title}</strong></div>
                      <div className="card-text req-card-text username">{x[index * 2].username}</div>
                      <div className="card-text req-card-text desc">{x[index * 2].desc}</div>
                      <div className="card-text req-card-text time"><small className="text-muted">{this.calcTime(x[index * 2].timestamp)}</small></div>

                      <button type="button" className="btn btn-default comment-btn" data-toggle="modal" data-target={"#commentsModal" + x[index * 2]._id}>
                        <img src="https://img.icons8.com/metro/24/000000/comments.png" />
                      </button>

                      {/* Comments Modal */}
                      <div className="modal interested-users-modal fade" id={"commentsModal" + x[index * 2]._id} tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                        <div className="modal-dialog interestDialog" role="document">
                          <div className="modal-content" style={{ width: "150%" }}>
                            <div className="modal-header">
                              <h5 className="modal-title" id="commentModalLabel">Comments</h5>
                              <button type="button" className="close interest" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="cross-btn">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body interestBody">
                              {this.props.user ? (<CommentListReq username={this.props.user.username} id={x[index * 2]._id} requirement={x[index * 2]}/>) : ('')}
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
              {index * 2 + 1 < x.length &&
                <div className="col-sm-6">
                  <div className="card req-card">
                    <div className="card-body req-card-body">
                      <div key={index}>
                        <div className="card-title req-card-title"><strong>{x[index * 2 + 1].title}</strong></div>
                        <div className="card-text req-card-text username">{x[index * 2 + 1].username}</div>
                        <div className="card-text req-card-text desc">{x[index * 2 + 1].desc}</div>
                        <div className="card-text req-card-text time"><small className="text-muted">{this.calcTime(x[index * 2 + 1].timestamp)}</small></div>

                        <button type="button" className="btn btn-default comment-btn" data-toggle="modal" data-target={"#commentsModal" + x[index * 2 + 1]._id}>
                          <img src="https://img.icons8.com/metro/24/000000/comments.png" />
                        </button>

                        {/* Comments Modal */}
                        <div className="modal interested-users-modal fade" id={"commentsModal" + x[index * 2 + 1]._id} tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                          <div className="modal-dialog interestDialog" role="document">
                            <div className="modal-content" style={{ width: "150%" }}>
                              <div className="modal-header">
                                <h5 className="modal-title" id="commentModalLabel">Comments</h5>
                                <button type="button" className="close interest" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true" className="cross-btn">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body interestBody">
                              {this.props.user ? (<CommentListReq id={x[index * 2 + 1]._id} username={this.props.user.username} requirement={x[index * 2 + 1]}/>) : ('')}
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
              }
            </div>
          </div>
        )
      })) : ('');
    return t;
  };
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  };
};


export default connect(mapStateToProps)(Requirement);