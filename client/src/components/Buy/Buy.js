import React, { Component } from 'react';
import HomeNav from '../HomeNav/HomeNav';
import axios from 'axios';
import { connect } from 'react-redux';
import Item from './Item';

class Buy extends Component {

  state = {
    categories: [],
    err: false,
    errmsg: null,
    items: [],
    cnt: []
  }

  componentDidMount() {
    axios.get('/admin/getcategories')
      .then(res => {
        this.setState({
          categories: res.data
        });
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    // 0 -> category 1 -> search box input
    let searchAll = false;
    if (e.target[1].value === '') {
      searchAll = true;
    }

    axios.post('/search', {
      searchText: e.target[1].value,
      searchAll,
      category: e.target[0].value,
      user: this.props.user
    })
      .then(res => {
        let temp = [];
        let items = res.data.sort((item1, item2) => {
          return (item1.timestamp < item2.timestamp) ? 1 : -1;
        });
        let k = items.length;
        for (let i = 0; i < k / 2; i++)
          temp.push(i);
        this.setState({
          items,
          cnt: temp
        });
      })
  }

  render() {
    let categories = this.state.categories.map(category => {
      return (
        <option key={category._id}>{category.name}</option>
      )
    });
    categories.unshift((
      <option key="0">Any</option>
    ));
    let items = this.state.cnt.map((idx, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-sm-6">
            <Item key={this.state.items[idx * 2]._id} item={this.state.items[idx * 2]} user={this.props.user} />
          </div>
          {((idx * 2 + 1) < this.state.items.length) ? (
            <div className="col-sm-6">
              <Item key={this.state.items[idx * 2 + 1]._id} item={this.state.items[idx * 2 + 1]} user={this.props.user} />
            </div>) : (' ')}
        </div>
      );
    });

    if (items.length === 0) {
      items = (
        <div className="container">
          <h4 style={{ fontSize: "100%" }}>
            No results found <img src="https://img.icons8.com/ultraviolet/40/000000/drama.png"></img>
          </h4>
          <p className="lead" style={{ fontSize: "10g0%", color: "red" }}>
            (Tip: search with empty query to get all items)
          </p>
        </div>
      );
    }
    
    return (
      <div>
        <HomeNav />
        <div className="container" style={{ padding: "10px" }}>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label className="cat">
                <img src="https://img.icons8.com/color/48/000000/categorize.png"></img>
                Category</label>
              <select className="form-control">
                {categories}
              </select>
            </div>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Find Text Books, Novels, Electronics and more" aria-label="search" aria-describedby="basic-addon2" />
              <button className="btn btn-default" type="submit" style={{ marginLeft: "15px", marginTop: "-2px" }}>
                <img src="https://img.icons8.com/cotton/50/000000/detective.png" />
              </button>
            </div>
          </form>

          <div style={{ marginBottom: "20px" }}>
            <h3 className="display-4" style={{ fontSize: "150%" }}>
              <label className="srch">
                <img src="https://img.icons8.com/dusk/64/000000/test-passed.png"></img>Search Results:</label>
            </h3>
          </div>
        </div>
        <div className="container-fluid" style={{ maxWidth: "1300px" }}>
          {items}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Buy);