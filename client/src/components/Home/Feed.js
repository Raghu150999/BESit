import React, { Component } from 'react';
import axios from 'axios';
import './Home.css'
import plan from './cart.png';
import product from './product.png';

class Feed extends Component {
  state =
    {
      feedItem: [],
      requirement: [],
      product: []
    };

  calcTime(timestamp) {
    let x = new Date(timestamp);
    let y = new Date();
    let diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    let val;
    if (diff < 3600) {
      val = parseInt(diff / 60);
      if (val !== 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      val = parseInt(diff / 3600);
      if (val !== 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      val = parseInt(diff / 86400);
      if (val !== 1)
        return val + ' days ago';
      else
        return val + ' day ago';
    }
  }

  componentDidMount() {
    axios.get('/api/getreq').then(res => {
      this.setState(
        {
          requirement: res.data
        });

      let temp = this.state.requirement;
      for (let i = 0; i < this.state.requirement.length; i++)
        temp[i].type = 'requirement';

      this.setState(
        {
          requirement: temp
        });
    });
    axios.get('/api/getprods').then(res => {
      this.setState(
        {
          product: res.data
        });

      let temp = this.state.product;
      for (let i = 0; i < this.state.product.length; i++)
        temp[i].type = 'product';

      this.setState(
        {
          product: temp
        });
    });

  }


  render() {
    {
      let y = [];
      y = this.state.product;

      let z = [];
      z = this.state.requirement;

      let w = y.concat(z);

      w.sort(function (a1, b1) {
        let x1 = new Date(a1.timestamp).getTime();
        let y1 = new Date(b1.timestamp).getTime();
        return y1 - x1;
      });

      var ret = w.length > 0 ?
        (w.map((feedItem, index) => {
          if (feedItem.type === 'requirement') {
            return (
              <div className="container home-container" key={index}>
                <div className="row">
                  <div className="card home-card">
                    <img className="req-img" src={plan} />
                    <div className="card-title  home-card-title">
                      <strong><div className="feed-username">{feedItem.username}</div></strong> requires <strong>{feedItem.title}</strong>
                    </div>
                    <div className="card-text feed-card-text time feed-time"><small className="text-muted">{this.calcTime(feedItem.timestamp)}</small></div><br />
                    <div className="desc-req-container">
                      <div className="card-text home-req-desc-card-text">
                        {feedItem.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          else {
            return (
              <div className="container home-container" key={index}>
                <div className="row">
                  <div className="card home-card">
                    <img className="req-img" src={product} />
                    <div className="card-title  home-card-title">
                      <strong><div className="feed-username">{feedItem.owner}</div></strong> is selling <strong>{feedItem.name}</strong>
                    </div>
                    <div className="card-text feed-card-text time feed-time"><small className="text-muted">{this.calcTime(feedItem.timestamp)}</small></div>
                    <div className="desc-prod-container">
                      <p className="card-text home-price-card-text"><strong>
                        {String.fromCharCode(8377) + ' ' + feedItem.price}</strong>
                      </p>
                      <p className="card-text home-prod-desc-card-text">
                        {feedItem.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })) : ('');
    }
    return ret;
  };
}

export default Feed;