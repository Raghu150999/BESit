import React from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'

import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';

const Product = (props) => {

    const style = {
        backgroundColor : 'red',
        border : '1px solid black'
    }

    if(props.status == 'NOT SOLD'){
        style.backgroundColor = 'green'
    }

    else if(props.status == 'REMOVED'){
        style.backgroundColor = 'brown'
    }
    
    return(
        <div className="Product">
                <img src={props.image}/>
                <h2>{props.name}</h2>  
                <p>{props.desc}</p>  
                <p>{props.price}</p>  
                <p style={style}>{props.status}</p> 
                {<Dropdown update={props.update} id={props.id} />}
                {/* <Dropdown2 /> */}
        </div>

    )
}

export default Product;