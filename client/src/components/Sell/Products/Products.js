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
        console.log(this.props);
        axios.get('/api/getitems', {
            params: {
                username: 'Raghu'
            }
        })
        .then(res => {
            console.log(this.props);
            this.setState({
                items: res.data
            });
        });
    }

    updateStatus = (status, id) => {
        console.log(status, id)
        axios.post('/api/updateitemstatus', {
            status,
            id,
            owner: this.props.user.username
        })
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
                <div className = "container">
                    <h2 style = {{marginTop: '15px'}}>All Your Items:</h2>
                </div>
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