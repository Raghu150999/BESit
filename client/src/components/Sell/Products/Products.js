import React, { Component } from 'react';
import Product from '../Product/Product';
import Button from '../Button'
import { connect } from 'react-redux';
import axios from 'axios';

class Products extends Component {

    state = {
        items: [],
        itemsAvailable: false
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/getitems', {
            params: {
                username: 'Raghu'
            }
        })
        .then(res => {
            this.setState({
                items: res.data
            });
        });
    }

    updateStatus = (status, id) => {
        console.log(status, id)
        // const items = [...this.state.items];
        // const index = items.findIndex((item) => {
        //     return item.id == id
        // });
        // items[index].status = status
        // this.setState({
        //     items
        // });
    }

    inputChangeHandler = (e) => {
        console.log(e.target);
        // this.setState({
        //     value: e.target.value
        // });
    }


    render() {

        let displayItems = this.state.items ? (
            this.state.items.map((item) => {
                return (
                    <Product update={this.updateStatus} key={item._id} item={item} id={item._id} />
                )
            })
        ) : (
            <h1>No items Available</h1>
        );
        
        return (
            <div>
                <Button />
                <h4>All Your Items:</h4>
                {displayItems}
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

export default connect(mapStateToProps)(Products);