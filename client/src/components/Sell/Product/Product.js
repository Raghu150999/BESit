import React from 'react';
import './Product.css';
import Dropdown from '../Dropdown.js'

const Product = (props) => {
    return(
        <div className="Product">
            <div className = "row">
                <div className = "col-sm">
                    <div className = "card">
                        <img  className ="card-img-top" src="https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2015%2F06%2F521811839-copy.jpg&w=800&c=sc&poi=face&q=85" alt="Card image cap">
                        </img>
                        <div className = "card-body">
                            <h2 className = "card-title">{props.item.name}<button type="button" className="btn btn-dark prod-btn">&#8377; {props.item.price}</button></h2>
                            <p className = "card-text desc">{props.item.desc}</p>
                            {<Dropdown update={props.update} id={props.id} current={props.item.status}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;