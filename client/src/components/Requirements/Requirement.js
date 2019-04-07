import React, { Component } from 'react';
import axios from 'axios';

class Requirement extends Component {
  state =
    {
      requirements: []
    };

  calcTime(timestamp) {
    var x = new Date(timestamp);
    var y = new Date();
    var diff = (y.getTime() / 1000) - (x.getTime() / 1000);
    if (diff < 3600) {
      var val = parseInt(diff / 60);
      if (val != 1)
        return val + ' minutes ago';
      else
        return val + ' minute ago';
    }
    if (diff < 86400) {
      var val = parseInt(diff / 3600);
      if (val != 1)
        return val + ' hours ago';
      else
        return val + ' hour ago';
    }
    else {
      var val = parseInt(diff / 86400);
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
    var x = this.state.requirements;
    //x.reverse();
    var y = []
    for (var i = 0; i < x.length / 2; i++)
      y.push(i);
    var t = this.state.requirements.length > 0 ?
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
export default Requirement;