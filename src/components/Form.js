import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component{
state = {
    formData : {
        field1 : '',
        field2 : ''
    }
}

submitForm = () =>{
    const formData = {
        category : 'Books',
        name : 'Mrinal',
        price : 20,
        desc : 'Great Book',
        ratings : '3 stars'

    }
/* 
    axios.post(`https://localhost:8080/items`, { formData })
    .then(res => {
      console.log(res);
      console.log(res.data);
    }) */
    
    

}

    render(){
        return(
            <form>
 
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Category</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Text/Reference Books</option>
      <option>Stationery</option>
      <option>Electronics</option>
      <option>Novels</option>
      <option>Miscellaneous</option>
    </select>
  </div>
  <div class="form-group">
    <label htmlFor="exampleFormControlInput1">Name Of Item</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="eg:Harry Potter Books"></input>
  </div>
  <div class="form-group">
    <label htmlFor="exampleFormControlInput1">Expected Price(Approx)</label>
    <input type="email" className="form-control" id="exampleFormControlInput1"></input>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Short Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Condition</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1 star</option>
      <option>2 stars</option>
      <option>3 stars</option>
      <option>4 stars</option>
      <option>5 stars</option>
    </select>
  </div>
  <button onClick={this.submitForm}> Submit </button>
</form>
        )
    }
}

export default Form;