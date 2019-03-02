import React from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'

import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';

const Product = (props) => {
    const style = {
        backgroundColor : 'red',
        border : '1px solid black'
    }

    if(props.item.status == 'NOT SOLD'){
        style.backgroundColor = 'green'
    }
    else if(props.item.status == 'REMOVED'){
        style.backgroundColor = 'brown'
    }

    return(
        <div className="Product">
            <div class = "row">
                <div class = "col-sm">
                    <div class = "card">
                        <img class="card-img-top" src="https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2015%2F06%2F521811839-copy.jpg&w=800&c=sc&poi=face&q=85" alt="Card image cap">
                        </img>
                        <div class = "card-body">
                            
                            <h2 class = "card-title">{props.item.name}<button type="button" class="btn btn-dark prod-btn">&#8377; {props.item.price}</button></h2>
                            <p class = "card-text desc">{props.item.desc}</p>
                            {<Dropdown update={props.update} id={props.id} current = {props.item.status}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*
                            <p style={style}>{props.item.status}</p>
                            {<Dropdown update={props.update} id={props.id} />}
*/
export default Product;