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
                <h2>{props.item.name}</h2>
                <p>{props.item.desc}</p>
                <p>{props.item.price}</p>
                <p style={style}>{props.item.status}</p>
                {<Dropdown update={props.update} id={props.id} />}
        </div>
    )
}

export default Product;