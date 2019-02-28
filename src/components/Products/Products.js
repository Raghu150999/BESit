import React from 'react';
import Product from '../Product/Product';
import Button from '../Button.js'

const Products = (props) =>{
    //console.log(props);


    const items = (
        props.items.map((item)=>{
            return <Product update={props.update} key={item.id} id={item.id} name={item.name} desc={item.desc} price={item.price} status={item.status} image={item.image} /> 
        })
    )
    return(
        <div>
        <Button />
        <h4>All Your Items:</h4>
            {items}
        </div>
    )
}

export default Products;