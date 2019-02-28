import React from 'react';

const Hello = (props) => {
    console.log(props)
    return(
        <h1>Hello this  is {props.name} and he is {props.age} years old </h1> 
    )
}


export default Hello;