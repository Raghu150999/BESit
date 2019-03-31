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
    items: []
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
        // @debug
        this.setState({
          items: res.data
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

    let items = this.state.items.map(item => {
      return (
        <Item key={item._id} item={item} user={this.props.user}/>
      );
    });

    if (items.length === 0) {
      items = (
        <div className="container">
          <h6 className="display-4">
            No results found :( 
          </h6>
          <p className="lead">
            (Tip: search with empty query to search all items)
          </p>
        </div>
      );
    }

    return (
      <div>
        <HomeNav />
        <h1>
          Coming Soon!
        </h1>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control">
              {categories}
            </select>
          </div>

          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search for items" aria-label="search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Search</button>
            </div>
          </div>
        </form>
        <div className="container">
          <h1 className="display-3">
            Search Results: 
          </h1>
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